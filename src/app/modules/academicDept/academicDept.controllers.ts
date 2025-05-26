import { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';
import { paginationFields } from '../../../constants/pagination';
import { catchAsync } from '../../../shared/catchAsync';
import { pick } from '../../../shared/pick';
import { sendResponse } from '../../../shared/sendResponse';
import { academicDeptFilterableFields } from './academicDept.constants';
import { IAcademicDept } from './academicDept.interfaces';
import { AcademicDeptServices } from './academicDept.services';

const insertIntoDB = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { ...academicDeptData } = req.body;

      const result = await AcademicDeptServices.insertIntoDB(academicDeptData);

      sendResponse<IAcademicDept>(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Academic Dept created successfully!',
        data: result,
      });
    } catch (error) {
      return next(error);
    }
  },
);

const getAllFromDB = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const filters = pick(req.query, academicDeptFilterableFields);
      const paginationOptions = pick(req.query, paginationFields);

      const result = await AcademicDeptServices.getAllFromDB(
        filters,
        paginationOptions,
      );

      sendResponse<IAcademicDept[]>(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Academic Depts fetched successfully!',
        meta: result.meta,
        data: result.data,
      });
    } catch (error) {
      return next(error);
    }
  },
);

const getByIdFromDB = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const result = await AcademicDeptServices.getByIdFromDB(id);

      sendResponse<IAcademicDept>(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Academic Dept fetched successfully!',
        data: result,
      });
    } catch (error) {
      return next(error);
    }
  },
);

const updateOneInDB = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const result = await AcademicDeptServices.updateOneInDB(id, req.body);

      sendResponse<IAcademicDept>(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Academic Dept updated successfully!',
        data: result,
      });
    } catch (error) {
      return next(error);
    }
  },
);

const deleteOneFromDB = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const result = await AcademicDeptServices.deleteOneFromDB(id);

      sendResponse<IAcademicDept>(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Academic Dept deleted successfully!',
        data: result,
      });
    } catch (error) {
      return next(error);
    }
  },
);

export const AcademicDeptControllers = {
  insertIntoDB,
  getAllFromDB,
  getByIdFromDB,
  updateOneInDB,
  deleteOneFromDB,
};
