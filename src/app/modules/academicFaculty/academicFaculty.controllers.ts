import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { paginationFields } from '../../../constants/pagination';
import { catchAsync } from '../../../shared/catchAsync';
import { pick } from '../../../shared/pick';
import { sendResponse } from '../../../shared/sendResponse';
import { academicFacultyFilterableFields } from './academicFaculty.constants';
import { IAcademicFaculty } from './academicFaculty.interfaces';
import { AcademicFacultyServices } from './academicFaculty.services';

const createAcademicFaculty = catchAsync(
  async (req: Request, res: Response) => {
    const { ...academicFacultyData } = req.body;
    const result =
      await AcademicFacultyServices.createAcademicFaculty(academicFacultyData);

    sendResponse<IAcademicFaculty>(res, {
      statusCode: httpStatus.CREATED,
      success: true,
      message: 'Academic Faculty created successfully!',
      data: result,
    });
  },
);

const getAllAcademicFaculties = catchAsync(
  async (req: Request, res: Response) => {
    const filters = pick(req.query, academicFacultyFilterableFields);
    const paginationOptions = pick(req.query, paginationFields);

    const result = await AcademicFacultyServices.getAllAcademicFaculties(
      filters,
      paginationOptions,
    );

    sendResponse<IAcademicFaculty[]>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'All academic Faculty data retrieved successfully!',
      meta: result.meta,
      data: result.data,
    });
  },
);

const getAcademicFaculty = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const result = await AcademicFacultyServices.getAcademicFaculty(id);

  sendResponse<IAcademicFaculty>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic Faculty data retrieved successfully!',
    data: result,
  });
});

const updateAcademicFaculty = catchAsync(
  async (req: Request, res: Response) => {
    const id = req.params.id;
    const updatedData = req.body;

    const result = await AcademicFacultyServices.updateAcademicFaculty(
      id,
      updatedData,
    );

    sendResponse<IAcademicFaculty>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Academic faculty data updated successfully!',
      data: result,
    });
  },
);

const deleteAcademicFaculty = catchAsync(
  async (req: Request, res: Response) => {
    const id = req.params.id;

    const result = await AcademicFacultyServices.deleteAcademicFaculty(id);

    sendResponse<IAcademicFaculty>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Academic faculty data deleted successfully!',
      data: result,
    });
  },
);

export const AcademicFacultyControllers = {
  createAcademicFaculty,
  getAllAcademicFaculties,
  getAcademicFaculty,
  updateAcademicFaculty,
  deleteAcademicFaculty,
};
