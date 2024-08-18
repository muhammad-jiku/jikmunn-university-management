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
import { IAcademicSem, IAcademicSemFilters } from './academicSem.interfaces';
import { AcademicSem } from './academicSem.model';

const createAcademicSem = async (
  payload: IAcademicSem,
): Promise<IAcademicSem> => {
  if (academicSemTitleCodeMapper[payload.title] !== payload.code) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Invalid semester code');
  }
  const result = await AcademicSem.create(payload);

  return result;
};

const getAllAcademicSems = async (
  filters: IAcademicSemFilters,
  paginationOptions: IPaginationOptions,
): Promise<IGenericResponse<IAcademicSem[]>> => {
  const { searchTerm, ...filtersData } = filters;

  const andConditions = [];

  if (searchTerm) {
    andConditions.push({
      $or: academicSemSearchableFields.map(field => ({
        [field]: { $regex: searchTerm, $options: 'i' },
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

  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(paginationOptions);

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

  const total = await AcademicSem.countDocuments(whereConditions);

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

const getAcademicSem = async (id: string): Promise<IAcademicSem | null> => {
  const result = await AcademicSem.findById(id);

  return result;
};

const updateAcademicSem = async (
  id: string,
  payload: Partial<IAcademicSem>,
): Promise<IAcademicSem | null> => {
  if (
    payload.title &&
    payload.code &&
    academicSemTitleCodeMapper[payload.title] !== payload.code
  ) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Invalid semester code');
  }
  const result = await AcademicSem.findOneAndUpdate({ _id: id }, payload, {
    new: true,
  });

  return result;
};

const deleteAcademicSem = async (id: string): Promise<IAcademicSem | null> => {
  const result = await AcademicSem.findByIdAndDelete(id);

  return result;
};

export const AcademicSemServices = {
  createAcademicSem,
  getAllAcademicSems,
  getAcademicSem,
  updateAcademicSem,
  deleteAcademicSem,
};
