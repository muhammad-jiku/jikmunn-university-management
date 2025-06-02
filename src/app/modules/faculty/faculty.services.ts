import httpStatus from 'http-status';
import mongoose, { SortOrder } from 'mongoose';
import ApiError from '../../../errors/ApiError';
import { paginationHelpers } from '../../../helpers/paginationHelpers';
import { IGenericResponse } from '../../../interfaces/common';
import { IPaginationOptions } from '../../../interfaces/pagination';
import { RedisClient } from '../../../shared/redis';
import { User } from '../users/users.model';
import {
  EVENT_FACULTY_UPDATED,
  facultySearchableFields,
} from './faculty.constants';
import { IFaculty, IFacultyFilters } from './faculty.interfaces';
import { Faculty } from './faculty.model';

const getAllFaculties = async (
  filters: IFacultyFilters,
  paginationOptions: IPaginationOptions,
): Promise<IGenericResponse<IFaculty[]>> => {
  // Extract searchTerm to implement search query
  const { searchTerm, ...filtersData } = filters;
  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(paginationOptions);

  const andConditions = [];
  // Search needs $or for searching in specified fields
  if (searchTerm) {
    andConditions.push({
      $or: facultySearchableFields.map(field => ({
        [field]: {
          $regex: searchTerm,
          $options: 'i',
        },
      })),
    });
  }

  // Filters needs $and to fullfill all the conditions
  if (Object.keys(filtersData).length) {
    andConditions.push({
      $and: Object.entries(filtersData).map(([field, value]) => ({
        [field]: value,
      })),
    });
  }

  // Dynamic  Sort needs  field to  do sorting
  const sortConditions: { [key: string]: SortOrder } = {};
  if (sortBy && sortOrder) {
    sortConditions[sortBy] = sortOrder;
  }
  const whereConditions =
    andConditions.length > 0 ? { $and: andConditions } : {};

  const result = await Faculty.find(whereConditions)
    .populate('academicFaculty')
    .populate('academicDept')
    .sort(sortConditions)
    .skip(skip)
    .limit(limit);

  const total = await Faculty.countDocuments(whereConditions);

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

const getFaculty = async (id: string): Promise<IFaculty | null> => {
  const result = await Faculty.findOne({ id })
    .populate('academicFaculty')
    .populate('academicDept');

  return result;
};

const updateFaculty = async (
  id: string,
  payload: Partial<IFaculty>,
): Promise<IFaculty | null> => {
  // Check if the faculty exists
  const existingFaculty = await Faculty.findOne({ id });
  if (!existingFaculty) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Faculty information not found!');
  }

  const { name, ...facultyData } = payload;

  // Prepare conditions for checking unique fields
  const uniqueConditions = [];
  if (facultyData.id) {
    uniqueConditions.push({ id: facultyData.id });
  }
  if (facultyData.email) {
    uniqueConditions.push({ email: facultyData.email });
  }
  if (facultyData.contactNo) {
    uniqueConditions.push({ contactNo: facultyData.contactNo });
  }

  // Check for uniqueness of fields
  if (uniqueConditions.length > 0) {
    const isDuplicate = await Faculty.findOne({ $or: uniqueConditions });
    if (isDuplicate) {
      throw new ApiError(
        httpStatus.BAD_REQUEST,
        'Please check the data, it seems like value of the fields that you provided are already exists!',
      );
    }
  }

  // Prepare update data
  const updatedFacultyData: Partial<IFaculty> = { ...facultyData };

  if (name && Object.keys(name).length > 0) {
    Object.keys(name).forEach(key => {
      const nameKey = `name.${key}` as keyof Partial<IFaculty>;
      (updatedFacultyData as any)[nameKey] = name[key as keyof typeof name];
    });
  }

  // Update and return the faculty document
  const result = await Faculty.findOneAndUpdate({ id }, updatedFacultyData, {
    new: true,
  })
    .populate('academicFaculty')
    .populate('academicDept');

  if (result) {
    await RedisClient.publish(EVENT_FACULTY_UPDATED, JSON.stringify(result));
  }

  return result;
};

const deleteFaculty = async (id: string): Promise<IFaculty | null> => {
  // check if the faculty is exist
  const isExist = await Faculty.findOne({ id });

  if (!isExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Faculty not found !');
  }

  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    // delete faculty first
    const faculty = await Faculty.findOneAndDelete({ id }, { session });
    if (!faculty) {
      throw new ApiError(404, 'Failed to delete faculty');
    }

    //delete user
    await User.deleteOne({ id });
    await session.commitTransaction();
    await session.endSession();

    return faculty;
  } catch (error) {
    await session.abortTransaction();
    throw error;
  }
};

export const FacultyServices = {
  getAllFaculties,
  getFaculty,
  updateFaculty,
  deleteFaculty,
};
