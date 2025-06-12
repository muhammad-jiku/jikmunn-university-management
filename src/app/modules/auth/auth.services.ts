import bcrypt from 'bcrypt';
import httpStatus from 'http-status';
import { JwtPayload, Secret } from 'jsonwebtoken';
import config from '../../../config';
import { USER_ROLES } from '../../../enums/users';
import ApiError from '../../../errors/ApiError';
import { jwtHelpers } from '../../../helpers/jwtHelpers';
import { Admin } from '../admin/admin.model';
import { Faculty } from '../faculty/faculty.model';
import { Student } from '../students/students.model';
import { User } from '../users/users.model';
import {
  IChangePassword,
  ILoginUser,
  ILoginUserResponse,
  IRefreshTokenResponse,
} from './auth.interfaces';
import { sendEmail } from './auth.utils';

const loginUser = async (payload: ILoginUser): Promise<ILoginUserResponse> => {
  const { id, password } = payload;

  // // Formula:I: using of instance methods by creating a User's instance
  // const user = new User();
  // const isUserExist = await user.isUserExist(id);
  // if (!isUserExist) {
  //   throw new ApiError(httpStatus.NOT_FOUND, 'User does not exist!');
  // }

  // if (
  //   isUserExist.password &&
  //   !(user.isPasswordMatch(password, isUserExist?.password as string))
  // ) {
  //   throw new ApiError(httpStatus.UNAUTHORIZED, 'Password mismatched!');
  // }

  // Formula:II: using of statics methods by importing the User model
  const isUserExist = await User.isUserExist(id);
  if (!isUserExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User does not exist');
  }

  if (
    isUserExist.password &&
    !(await User.isPasswordMatch(password, isUserExist?.password as string))
  ) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Password is incorrect!');
  }

  const { id: userId, role, needsPasswordChange } = isUserExist;

  // creating access and refresh tokens
  const accessToken = jwtHelpers.createToken(
    { userId, role },
    config.jwt.secret as Secret,
    config.jwt.expires_in as string,
  );

  const refreshToken = jwtHelpers.createToken(
    { userId, role },
    config.jwt.refresh_secret as Secret,
    config.jwt.refresh_expires_in as string,
  );

  return {
    accessToken,
    refreshToken,
    needsPasswordChange,
  };
};

const refreshToken = async (token: string): Promise<IRefreshTokenResponse> => {
  // verify token
  // invalid token - synchronous
  let verifiedToken = null;
  try {
    verifiedToken = jwtHelpers.verifyToken(
      token,
      config.jwt.refresh_secret as Secret,
    );
  } catch (err) {
    throw new ApiError(httpStatus.FORBIDDEN, 'Invalid refresh token!');
  }

  const { userId, role } = verifiedToken;

  // checking deleted user's refresh token
  const isUserExist = await User.isUserExist(userId);
  if (!isUserExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User does not exist!');
  }

  // generate new token
  const newAccessToken = jwtHelpers.createToken(
    {
      userId,
      role,
    },
    config.jwt.secret as Secret,
    config.jwt.expires_in as string,
  );

  return {
    accessToken: newAccessToken,
  };
};

const changePassword = async (
  user: JwtPayload | null,
  payload: IChangePassword,
): Promise<void> => {
  const { oldPassword, newPassword } = payload;

  // checking is user exist
  // Formula:I:
  // const isUserExist = await User.isUserExist(user?.userId);

  // Alternative way: Formula: II:
  const isUserExist = await User.findOne({ id: user?.userId }).select(
    '+password',
  );

  if (!isUserExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User does not exist!');
  }

  // checking old password
  if (
    isUserExist.password &&
    !(await User.isPasswordMatch(oldPassword, isUserExist.password))
  ) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Old Password is incorrect');
  }

  // checking new password
  if (
    isUserExist.password &&
    (await User.isPasswordMatch(newPassword, isUserExist.password))
  ) {
    throw new ApiError(
      httpStatus.UNAUTHORIZED,
      'This password already exists, please try new one!',
    );
  }

  // // part of the Formula: I:(
  // // hash password before saving
  // const newHashedPassword = await bcrypt.hash(
  //   newPassword,
  //   Number(config.bcrypt_salt_rounds),
  // );

  // const query = { id: user?.userId };
  // const updatedData = {
  //   password: newHashedPassword,
  //   needsPasswordChange: false,
  //   passwordChangedAt: new Date(),
  // };

  // // data update
  // await User.findOneAndUpdate(query, updatedData, { new: true });)

  // part of the Formula: II:
  // data update
  isUserExist.password = newPassword;
  isUserExist.needsPasswordChange = false;

  // updating using save()
  isUserExist.save();
};

const forgotPass = async (payload: { id: string }) => {
  const user = await User.findOne({ id: payload.id }, { id: 1, role: 1 });

  if (!user) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'User does not exist!');
  }

  let profile = null;
  if (user.role === USER_ROLES.ADMIN) {
    profile = await Admin.findOne({ id: user.id });
  } else if (user.role === USER_ROLES.FACULTY) {
    profile = await Faculty.findOne({ id: user.id });
  } else if (user.role === USER_ROLES.STUDENT) {
    profile = await Student.findOne({ id: user.id });
  }

  if (!profile) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Pofile not found!');
  }

  if (!profile.email) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Email not found!');
  }

  const passResetToken = await jwtHelpers.createResetToken(
    { id: user.id },
    config.jwt.secret as string,
    '50m',
  );

  const resetLink: string = config.reset_link + `token=${passResetToken}`;

  console.log('profile: ', profile);
  await sendEmail(
    profile.email,
    `
      <div>
        <p>Hi, ${profile.name.firstName}</p>
        <p>Your password reset link: <a href=${resetLink}>Click Here</a></p>
        <p>Thank you</p>
      </div>
  `,
  );

  // return {
  //   message: "Check your email!"
  // }
};

const resetPassword = async (
  payload: { id: string; newPassword: string },
  token: string,
) => {
  const { id, newPassword } = payload;
  const user = await User.findOne({ id }, { id: 1 });

  if (!user) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'User not found!');
  }

  const isVarified = await jwtHelpers.verifyToken(
    token,
    config.jwt.secret as string,
  );

  const password = await bcrypt.hash(
    newPassword,
    Number(config.bcrypt_salt_rounds),
  );

  await User.updateOne({ id }, { password });
};

export const AuthServices = {
  loginUser,
  refreshToken,
  changePassword,
  forgotPass,
  resetPassword,
};
