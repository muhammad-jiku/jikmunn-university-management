import httpStatus from 'http-status';
import { SortOrder } from 'mongoose';
import ApiError from '../../../errors/ApiError';
import { paginationHelpers } from '../../../helpers/paginationHelpers';
import { IGenericResponse } from '../../../interfaces/common';
import { IPaginationOptions } from '../../../interfaces/pagination';
import {
  academicSemSearchableFields,
  academicSemTitleCodeMapper,
} from './academicSem.constants';
import {
  IAcademicSem,
  IAcademicSemCreatedEvent,
  IAcademicSemFilters,
  IAcademicSemUpdatedEvent,
} from './academicSem.interfaces';
import { AcademicSem } from './academicSem.model';

const insertIntoDB = async (payload: IAcademicSem): Promise<IAcademicSem> => {
  if (academicSemTitleCodeMapper[payload.title] !== payload.code) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Invalid Semester Code');
  }
  const result = await AcademicSem.create(payload);
  return result;
};

const getAllFromDB = async (
  filters: IAcademicSemFilters,
  paginationOptions: IPaginationOptions,
): Promise<IGenericResponse<IAcademicSem[]>> => {
  // Extract searchTerm to implement search query
  const { searchTerm, ...filtersData } = filters;
  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(paginationOptions);

  const andConditions = [];
  // Search needs $or for searching in specified fields
  if (searchTerm) {
    andConditions.push({
      $or: academicSemSearchableFields.map(field => ({
        [field]: {
          $regex: searchTerm,
          $options: 'i',
        },
      })),
    });
  }

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

  const result = await AcademicSem.find(whereConditions)
    .sort(sortConditions)
    .skip(skip)
    .limit(limit);

  const total = await AcademicSem.countDocuments();

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

const getByIdFromDB = async (id: string): Promise<IAcademicSem | null> => {
  const result = await AcademicSem.findById(id);
  return result;
};

const updateOneInDB = async (
  id: string,
  payload: Partial<IAcademicSem>,
): Promise<IAcademicSem | null> => {
  if (
    payload.title &&
    payload.code &&
    academicSemTitleCodeMapper[payload.title] !== payload.code
  ) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Invalid Semester Code');
  }

  const result = await AcademicSem.findOneAndUpdate({ _id: id }, payload, {
    new: true,
  });
  return result;
};

const deleteOneFromDB = async (id: string): Promise<IAcademicSem | null> => {
  const result = await AcademicSem.findByIdAndDelete(id);
  return result;
};

const insertIntoDBFromEvent = async (
  e: IAcademicSemCreatedEvent,
): Promise<void> => {
  await AcademicSem.create({
    title: e.title,
    year: e.year,
    code: e.code,
    startMonth: e.startMonth,
    endMonth: e.endMonth,
    syncId: e.id,
  });
};

const updateOneInDBFromEvent = async (
  e: IAcademicSemUpdatedEvent,
): Promise<void> => {
  await AcademicSem.findOneAndUpdate(
    { syncId: e.id },
    {
      $set: {
        title: e.title,
        year: e.year,
        code: e.code,
        startMonth: e.startMonth,
        endMonth: e.endMonth,
      },
    },
  );
};

const deleteOneFromDBFromEvent = async (
  // e: IAcademicSemDeletedEvent,
  syncId: string,
): Promise<void> => {
  await AcademicSem.findOneAndDelete({
    // syncId: e.id,
    syncId,
  });
};

export const AcademicSemServices = {
  insertIntoDB,
  getAllFromDB,
  getByIdFromDB,
  updateOneInDB,
  deleteOneFromDB,
  insertIntoDBFromEvent,
  updateOneInDBFromEvent,
  deleteOneFromDBFromEvent,
};
