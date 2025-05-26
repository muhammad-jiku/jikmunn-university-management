import { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';
import { paginationFields } from '../../../constants/pagination';
import { catchAsync } from '../../../shared/catchAsync';
import { pick } from '../../../shared/pick';
import { sendResponse } from '../../../shared/sendResponse';
import { academicSemFilterableFields } from './academicSem.constants';
import { IAcademicSem } from './academicSem.interfaces';
import { AcademicSemServices } from './academicSem.services';

const insertIntoDB = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { ...academicSemesterData } = req.body;
      const result =
        await AcademicSemServices.insertIntoDB(academicSemesterData);

      sendResponse<IAcademicSem>(res, {
        statusCode: httpStatus.CREATED,
        success: true,
        message: 'Academic Semester created successfully!',
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
      const filters = pick(req.query, academicSemFilterableFields);
      const paginationOptions = pick(req.query, paginationFields);

      const result = await AcademicSemServices.getAllFromDB(
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
    } catch (error) {
      return next(error);
    }
  },
);

const getByIdFromDB = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;

      const result = await AcademicSemServices.getByIdFromDB(id);

      sendResponse<IAcademicSem>(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Academic semester data retrieved successfully!',
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

      const updatedData = req.body;

      const result = await AcademicSemServices.updateOneInDB(id, updatedData);

      sendResponse<IAcademicSem>(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Academic semester data updated successfully!',
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

      const result = await AcademicSemServices.deleteOneFromDB(id);

      sendResponse<IAcademicSem>(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Academic semester data deleted successfully!',
        data: result,
      });
    } catch (error) {
      return next(error);
    }
  },
);

export const AcademicSemControllers = {
  insertIntoDB,
  getAllFromDB,
  getByIdFromDB,
  updateOneInDB,
  deleteOneFromDB,
};
