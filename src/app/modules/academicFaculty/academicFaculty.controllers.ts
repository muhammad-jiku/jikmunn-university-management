import { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';
import { paginationFields } from '../../../constants/pagination';
import { catchAsync } from '../../../shared/catchAsync';
import { pick } from '../../../shared/pick';
import { sendResponse } from '../../../shared/sendResponse';
import { academicFacultyFilterableFields } from './academicFaculty.constants';
import { IAcademicFaculty } from './academicFaculty.interfaces';
import { AcademicFacultyServices } from './academicFaculty.services';

const insertIntoDB = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { ...academicFacultyData } = req.body;

      const result =
        await AcademicFacultyServices.insertIntoDB(academicFacultyData);

      sendResponse<IAcademicFaculty>(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Academic faculty created successfully!',
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
      const filters = pick(req.query, academicFacultyFilterableFields);
      const paginationOptions = pick(req.query, paginationFields);

      const result = await AcademicFacultyServices.getAllFromDB(
        filters,
        paginationOptions,
      );

      sendResponse<IAcademicFaculty[]>(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Academic faculties fetched successfully!',
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

      const result = await AcademicFacultyServices.getByIdFromDB(id);

      sendResponse<IAcademicFaculty>(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Academic faculty fetched successfully!',
        data: result,
      });
    } catch (error) {
      return next(error);
    }
  },
);

const updateOneInDB = catchAsync(
  catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const updatedData = await req.body;

      const result = await AcademicFacultyServices.updateOneInDB(
        id,
        updatedData,
      );

      sendResponse<IAcademicFaculty>(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Academic faculty updated successfully!',
        data: result,
      });
    } catch (error) {
      return next(error);
    }
  }),
);

const deleteOneFromDB = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;

      const result = await AcademicFacultyServices.deleteOneFromDB(id);

      sendResponse<IAcademicFaculty>(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Academic faculty deleted successfully!',
        data: result,
      });
    } catch (error) {
      return next(error);
    }
  },
);

export const AcademicFacultyControllers = {
  insertIntoDB,
  getAllFromDB,
  getByIdFromDB,
  updateOneInDB,
  deleteOneFromDB,
};
