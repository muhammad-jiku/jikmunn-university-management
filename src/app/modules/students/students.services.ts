import httpStatus from 'http-status';
import mongoose, { SortOrder } from 'mongoose';
import ApiError from '../../../errors/ApiError';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { IGenericResponse } from '../../../interfaces/common';
import { IPaginationOptions } from '../../../interfaces/pagination';
import { User } from '../users/users.model';
import { studentSearchableFields } from './students.constants';
import { IStudent, IStudentFilters } from './students.interfaces';
import { Student } from './students.model';

const getAllStudents = async (
  filters: IStudentFilters,
  paginationOptions: IPaginationOptions,
): Promise<IGenericResponse<IStudent[]>> => {
  // Extract searchTerm to implement search query
  const { searchTerm, ...filtersData } = filters;
  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(paginationOptions);

  const andConditions = [];
  // Search needs $or for searching in specified fields
  if (searchTerm) {
    andConditions.push({
      $or: studentSearchableFields.map(field => ({
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

  const result = await Student.find(whereConditions)
    .populate('academicSem')
    .populate('academicDept')
    .populate('academicFaculty')
    .sort(sortConditions)
    .skip(skip)
    .limit(limit);

  const total = await Student.countDocuments(whereConditions);

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

const getSingleStudent = async (id: string): Promise<IStudent | null> => {
  const result = await Student.findOne({ id })
    .populate('academicSem')
    .populate('academicDept')
    .populate('academicFaculty');

  return result;
};

const updateStudent = async (
  id: string,
  payload: Partial<IStudent>,
): Promise<IStudent | null> => {
  const isExist = await Student.findOne({ id });

  if (!isExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Student information not found!');
  }

  const { name, guardian, localGuardian, ...studentData } = payload;

  const updatedStudentData: Partial<IStudent> = { ...studentData };

  if (name && Object.keys(name).length > 0) {
    Object.keys(name).forEach(key => {
      const nameKey = `name.${key}` as keyof Partial<IStudent>; // `name.firstName`
      (updatedStudentData as any)[nameKey] = name[key as keyof typeof name];
    });
  }

  if (guardian && Object.keys(guardian).length > 0) {
    Object.keys(guardian).forEach(key => {
      const guardianKey = `guardian.${key}` as keyof Partial<IStudent>; // `guardian.firstguardian`
      (updatedStudentData as any)[guardianKey] =
        guardian[key as keyof typeof guardian];
    });
  }

  if (localGuardian && Object.keys(localGuardian).length > 0) {
    Object.keys(localGuardian).forEach(key => {
      const localGuradianKey =
        `localGuardian.${key}` as keyof Partial<IStudent>; // `localGuardian.fisrtName`
      (updatedStudentData as any)[localGuradianKey] =
        localGuardian[key as keyof typeof localGuardian];
    });
  }

  const result = await Student.findOneAndUpdate({ id }, updatedStudentData, {
    new: true,
  })
    .populate('academicFaculty')
    .populate('academicDept')
    .populate('academicSem');

  return result;
};

const deleteStudent = async (id: string): Promise<IStudent | null> => {
  // check if the student is exist
  const isExist = await Student.findOne({ id });

  if (!isExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Student not found !');
  }

  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    //delete student first
    const student = await Student.findOneAndDelete({ id }, { session });
    if (!student) {
      throw new ApiError(404, 'Failed to delete student');
    }

    //delete user
    await User.deleteOne({ id });
    await session.commitTransaction();
    await session.endSession();

    return student;
  } catch (error) {
    await session.abortTransaction();
    throw error;
  }
};

export const StudentServices = {
  getAllStudents,
  getSingleStudent,
  updateStudent,
  deleteStudent,
};
