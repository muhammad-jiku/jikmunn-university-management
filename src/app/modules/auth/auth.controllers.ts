import { Request, Response } from 'express';
import httpStatus from 'http-status';
import config from '../../../config';
import { catchAsync } from '../../../shared/catchAsync';
import { sendResponse } from '../../../shared/sendResponse';
import { ILoginUserResponse, IRefreshTokenResponse } from './auth.interfaces';
import { AuthServices } from './auth.services';

const loginUser = catchAsync(async (req: Request, res: Response) => {
  const { ...logInData } = await req.body;
  const result = await AuthServices.loginUser(logInData);
  const { refreshToken, ...othersData } = result;

  // set refresh token into the cookie
  const cookieOptions = {
    secure: config.env === 'production' ? true : false,
    httpOnly: true,
  };

  res.cookie('refreshToken', refreshToken, cookieOptions);

  sendResponse<ILoginUserResponse>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Login successful',
    data: othersData,
  });
});

const refreshTokenHandler = catchAsync(async (req: Request, res: Response) => {
  const { refreshToken } = req.cookies;
  const result = await AuthServices.refreshToken(refreshToken);

  // set refresh token into the cookie
  const cookieOptions = {
    secure: config.env === 'production' ? true : false,
    httpOnly: true,
  };

  res.cookie('refreshToken', refreshToken, cookieOptions);

  sendResponse<IRefreshTokenResponse>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User refesh token updated successfully',
    data: result,
  });
});

const changePassword = catchAsync(async (req: Request, res: Response) => {
  const user = req.user;
  const { ...passwordsData } = await req.body;

  await AuthServices.changePassword(user, passwordsData);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Password changed successfully!',
  });
});

const forgotPass = catchAsync(async (req: Request, res: Response) => {
  await AuthServices.forgotPass(req.body);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Check your email!',
  });
});

const resetPassword = catchAsync(async (req: Request, res: Response) => {
  const token = req.headers.authorization || '';
  await AuthServices.resetPassword(req.body, token);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Account recovered!',
  });
});

export const AuthControllers = {
  loginUser,
  refreshTokenHandler,
  changePassword,
  forgotPass,
  resetPassword,
};
