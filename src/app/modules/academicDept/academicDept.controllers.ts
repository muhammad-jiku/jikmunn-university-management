import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { paginationFields } from '../../../constants/pagination';
import { catchAsync } from '../../../shared/catchAsync';
import { pick } from '../../../shared/pick';
import { sendResponse } from '../../../shared/sendResponse';
import { academicDeptFilterableFields } from './academicDept.constants';
import { IAcademicDept } from './academicDept.interfaces';
import { AcademicDeptServices } from './academicDept.services';

const createAcademicDept = catchAsync(async (req: Request, res: Response) => {
  const { ...academicDeptData } = req.body;
  const result =
    await AcademicDeptServices.createAcademicDept(academicDeptData);

  sendResponse<IAcademicDept>(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'Academic Department created successfully!',
    data: result,
  });
});

const getAllAcademicDepts = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, academicDeptFilterableFields);
  const paginationOptions = pick(req.query, paginationFields);

  const result = await AcademicDeptServices.getAllAcademicDepts(
    filters,
    paginationOptions,
  );

  sendResponse<IAcademicDept[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'All academic Departments data retrieved successfully!',
    meta: result.meta,
    data: result.data,
  });
});

const getAcademicDept = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const result = await AcademicDeptServices.getAcademicDept(id);

  sendResponse<IAcademicDept>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic Department data retrieved successfully!',
    data: result,
  });
});

const updateAcademicDept = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const updatedData = req.body;

  const result = await AcademicDeptServices.updateAcademicDept(id, updatedData);

  sendResponse<IAcademicDept>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic Department data updated successfully!',
    data: result,
  });
});

const deleteAcademicDept = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;

  const result = await AcademicDeptServices.deleteAcademicDept(id);

  sendResponse<IAcademicDept>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic Department data deleted successfully!',
    data: result,
  });
});

export const AcademicDeptControllers = {
  createAcademicDept,
  getAllAcademicDepts,
  getAcademicDept,
  updateAcademicDept,
  deleteAcademicDept,
};
