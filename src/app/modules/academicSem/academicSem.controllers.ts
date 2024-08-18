import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { paginationFields } from '../../../constants/pagination';
import { catchAsync } from '../../../shared/catchAsync';
import { pick } from '../../../shared/pick';
import { sendResponse } from '../../../shared/sendResponse';
import { academicSemFilterableFields } from './academicSem.constants';
import { IAcademicSem } from './academicSem.interfaces';
import { AcademicSemServices } from './academicSem.services';

const createAcademicSem = catchAsync(async (req: Request, res: Response) => {
  const { ...academicSemData } = req.body;
  const result = await AcademicSemServices.createAcademicSem(academicSemData);

  sendResponse<IAcademicSem>(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'Academic Semester created successfully!',
    data: result,
  });
});

const getAllAcademicSems = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, academicSemFilterableFields);
  const paginationOptions = pick(req.query, paginationFields);

  const result = await AcademicSemServices.getAllAcademicSems(
    filters,
    paginationOptions,
  );

  sendResponse<IAcademicSem[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'All academic semesters data retrieved successfully!',
    meta: result.meta,
    data: result.data,
  });
});

const getAcademicSem = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const result = await AcademicSemServices.getAcademicSem(id);

  sendResponse<IAcademicSem>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic semester data retrieved successfully!',
    data: result,
  });
});

const updateAcademicSem = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const updatedData = req.body;

  const result = await AcademicSemServices.updateAcademicSem(id, updatedData);

  sendResponse<IAcademicSem>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic semester data updated successfully!',
    data: result,
  });
});

const deleteAcademicSem = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;

  const result = await AcademicSemServices.deleteAcademicSem(id);

  sendResponse<IAcademicSem>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic semester data deleted successfully!',
    data: result,
  });
});

export const AcademicSemControllers = {
  createAcademicSem,
  getAllAcademicSems,
  getAcademicSem,
  updateAcademicSem,
  deleteAcademicSem,
};
