import { Request, RequestHandler, Response } from 'express';
// import { RequestHandler } from 'express-serve-static-core';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { IUser } from './user.interfaces';
import { UserServices } from './user.services';

const createUser: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const { user } = req.body;
    const result = await UserServices.createUser(user);

    sendResponse<IUser>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'user created successfully!',
      data: result,
    });
  },
);

export const UserControllers = {
  createUser,
};
