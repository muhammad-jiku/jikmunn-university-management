import { SortOrder } from 'mongoose';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { IGenericResponse } from '../../../interfaces/common';
import { IPaginationOptions } from '../../../interfaces/pagination';
import { academicDeptSearchableFields } from './academicDept.constants';
import { IAcademicDept, IAcademicDeptFilters } from './academicDept.interfaces';
import { AcademicDept } from './academicDept.model';

const createAcademicDept = async (
  payload: IAcademicDept,
): Promise<IAcademicDept> => {
  const result = await AcademicDept.create(payload);

  return result;
};

const getAllAcademicDepts = async (
  filters: IAcademicDeptFilters,
  paginationOptions: IPaginationOptions,
): Promise<IGenericResponse<IAcademicDept[]>> => {
  const { searchTerm, ...filtersData } = filters;

  const andConditions = [];

  if (searchTerm) {
    andConditions.push({
      $or: academicDeptSearchableFields.map(field => ({
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

const getSingleAcademicDept = async (
  id: string,
): Promise<IAcademicDept | null> => {
  const result = await AcademicDept.findById(id);

  return result;
};

const updateAcademicDept = async (
  id: string,
  payload: Partial<IAcademicDept>,
): Promise<IAcademicDept | null> => {
  const result = await AcademicDept.findOneAndUpdate({ _id: id }, payload, {
    new: true,
  });

  return result;
};

const deleteAcademicDept = async (
  id: string,
): Promise<IAcademicDept | null> => {
  const result = await AcademicDept.findByIdAndDelete(id);

  return result;
};

export const AcademicDeptServices = {
  createAcademicDept,
  getAllAcademicDepts,
  getSingleAcademicDept,
  updateAcademicDept,
  deleteAcademicDept,
};
