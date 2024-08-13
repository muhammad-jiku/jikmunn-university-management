import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { paginationFields } from '../../../constants/pagination';
import { catchAsync } from '../../../shared/catchAsync';
import { pick } from '../../../shared/pick';
import { sendResponse } from '../../../shared/sendResponse';
import { academicSemFilterableFields } from './academicSem.constants';
import { IAcademicSem } from './academicSem.interfaces';
import { AcademicSemServices } from './academicSem.services';

const createSem = catchAsync(async (req: Request, res: Response) => {
  const { ...academicSemData } = req.body;
  const result = await AcademicSemServices.createSem(academicSemData);

  sendResponse<IAcademicSem>(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'Academic Semester created successfully!',
    data: result,
  });
});

const getSingleSem = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const result = await AcademicSemServices.getSingleSem(id);

  sendResponse<IAcademicSem>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic semester data retrieved successfully!',
    data: result,
  });
});

const getAllSems = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, academicSemFilterableFields);
  const paginationOptions = pick(req.query, paginationFields);

  const result = await AcademicSemServices.getAllSems(
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

const updateSingleSem = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const updatedData = req.body;

  const result = await AcademicSemServices.updateSingleSem(id, updatedData);

  sendResponse<IAcademicSem>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic semester data updated successfully!',
    data: result,
  });
});

const deleteSingleSem = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;

  const result = await AcademicSemServices.deleteSingleSem(id);

  sendResponse<IAcademicSem>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic semester data deleted successfully!',
    data: result,
  });
});

export const AcademicSemControllers = {
  createSem,
  getAllSems,
  getSingleSem,
  updateSingleSem,
  deleteSingleSem,
};
