import { SortOrder } from 'mongoose';
import { paginationHelpers } from '../../../helpers/paginationHelpers';
import { IGenericResponse } from '../../../interfaces/common';
import { IPaginationOptions } from '../../../interfaces/pagination';
import { AcademicFaculty } from '../academicFaculty/academicFaculty.model';
import { academicDeptSearchableFields } from './academicDept.constants';
import {
  IAcademicDept,
  IAcademicDeptCreatedEvent,
  IAcademicDeptFilters,
  IAcademicDeptUpdatedEvent,
} from './academicDept.interfaces';
import { AcademicDept } from './academicDept.model';

const insertIntoDB = async (
  payload: IAcademicDept,
): Promise<IAcademicDept | null> => {
  const result = (await AcademicDept.create(payload)).populate(
    'academicFaculty',
  );
  return result;
};

const getAllFromDB = async (
  filters: IAcademicDeptFilters,
  paginationOptions: IPaginationOptions,
): Promise<IGenericResponse<IAcademicDept[]>> => {
  const { limit, page, skip, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(paginationOptions);

  // Extract searchTerm to implement search query
  const { searchTerm, ...filtersData } = filters;

  const andConditions = [];

  // Search needs $or for searching in specified fields
  if (searchTerm) {
    andConditions.push({
      $or: academicDeptSearchableFields.map(field => ({
        [field]: {
          $regex: searchTerm,
          $paginationOptions: 'i',
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

  // If there is no condition , put {} to give all data
  const whereConditions =
    andConditions.length > 0 ? { $and: andConditions } : {};

  const result = await AcademicDept.find(whereConditions)
    .populate('academicFaculty')
    .sort(sortConditions)
    .skip(skip)
    .limit(limit);

  const total = await AcademicDept.countDocuments(whereConditions);

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

const getByIdFromDB = async (id: string): Promise<IAcademicDept | null> => {
  const result = await AcademicDept.findById(id).populate('academicFaculty');

  return result;
};

const updateOneInDB = async (
  id: string,
  payload: Partial<IAcademicDept>,
): Promise<IAcademicDept | null> => {
  const result = await AcademicDept.findOneAndUpdate({ _id: id }, payload, {
    new: true,
  }).populate('academicFaculty');

  return result;
};

const deleteOneFromDB = async (id: string): Promise<IAcademicDept | null> => {
  const result = await AcademicDept.findByIdAndDelete(id);
  return result;
};

const insertIntoDBFromEvent = async (
  e: IAcademicDeptCreatedEvent,
): Promise<void> => {
  const academicFaculty = await AcademicFaculty.findOne({
    syncId: e.academicFacultyId,
  });
  const payload = {
    title: e.title,
    academicFaculty: academicFaculty?._id,
    syncId: e.id,
  };

  await AcademicDept.create(payload);
};

const updateOneInDBFromEvent = async (
  e: IAcademicDeptUpdatedEvent,
): Promise<void> => {
  const academicFaculty = await AcademicFaculty.findOne({
    syncId: e.academicFacultyId,
  });
  const payload = {
    title: e.title,
    academicFaculty: academicFaculty?._id,
  };

  await AcademicDept.findOneAndUpdate(
    { syncId: e.id },
    {
      $set: payload,
    },
  );
};

const deleteOneFromDBFromEvent = async (
  // e: IAcademicDeptDeletedEvent,
  syncId: string,
): Promise<void> => {
  await AcademicDept.findOneAndDelete({
    // syncId:e.id,
    syncId,
  });
};

export const AcademicDeptServices = {
  insertIntoDB,
  getAllFromDB,
  getByIdFromDB,
  updateOneInDB,
  deleteOneFromDB,
  insertIntoDBFromEvent,
  updateOneInDBFromEvent,
  deleteOneFromDBFromEvent,
};
