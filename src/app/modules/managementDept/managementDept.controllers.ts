import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { paginationFields } from '../../../constants/pagination';
import { catchAsync } from '../../../shared/catchAsync';
import { pick } from '../../../shared/pick';
import { sendResponse } from '../../../shared/sendResponse';
import { managementDeptFilterableFields } from './managementDept.constants';
import { IManagementDept } from './managementDept.interfaces';
import { ManagementDeptServices } from './managementDept.services';

const createManagementDept = catchAsync(async (req: Request, res: Response) => {
  const { ...managementDeptData } = req.body;
  const result =
    await ManagementDeptServices.createManagementDept(managementDeptData);

  sendResponse<IManagementDept>(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'Department created successfully!',
    data: result,
  });
});

const getAllManagementDepts = catchAsync(
  async (req: Request, res: Response) => {
    const filters = pick(req.query, managementDeptFilterableFields);
    const paginationOptions = pick(req.query, paginationFields);

    const result = await ManagementDeptServices.getAllManagementDepts(
      filters,
      paginationOptions,
    );

    sendResponse<IManagementDept[]>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'All departments data retrieved successfully!',
      meta: result.meta,
      data: result.data,
    });
  },
);

const getManagementDept = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const result = await ManagementDeptServices.getManagementDept(id);

  sendResponse<IManagementDept>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Department data retrieved successfully!',
    data: result,
  });
});

const updateManagementDept = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const updatedData = req.body;

  const result = await ManagementDeptServices.updateManagementDept(
    id,
    updatedData,
  );

  sendResponse<IManagementDept>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Department data updated successfully!',
    data: result,
  });
});

const deleteManagementDept = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;

  const result = await ManagementDeptServices.deleteManagementDept(id);

  sendResponse<IManagementDept>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Department data deleted successfully!',
    data: result,
  });
});

export const ManagementDeptControllers = {
  createManagementDept,
  getAllManagementDepts,
  getManagementDept,
  updateManagementDept,
  deleteManagementDept,
};
