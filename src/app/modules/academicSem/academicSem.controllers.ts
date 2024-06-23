import { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { IAcademicSemester } from './academicSem.interface';
import { AcademicSemesterServices } from './academicSem.services';

const createSemester = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { ...academicSemesterData } = req.body;
    const result =
      await AcademicSemesterServices.createSemester(academicSemesterData);

    sendResponse<IAcademicSemester>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Academic semester created successfully!',
      data: result,
    });
    next();
  },
);

export const AcademicSemesterControllers = {
  createSemester,
};