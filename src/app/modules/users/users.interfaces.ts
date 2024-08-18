import { Model, Types } from 'mongoose';
import { IAdmin } from '../admin/admin.interfaces';
import { IFaculty } from '../faculty/faculty.interfaces';
import { IStudent } from '../students/students.interfaces';

export interface IUser {
  id: string;
  role: string;
  password: string;
  needsPasswordChange: boolean;
  student?: Types.ObjectId | IStudent;
  faculty?: Types.ObjectId | IFaculty;
  admin?: Types.ObjectId | IAdmin;
}

// // interfaces for instance methods
// export interface IUserMethods {
//   isUserExist(id: string): Promise<Partial<IUser> | null>;
//   isPasswordMatch(
//     givenPassword: string,
//     savedPassword: string,
//   ): Promise<boolean>;
// }

// // types of user model for user instance methods
// export type IUserModel = Model<IUser, Record<string, unknown>, IUserMethods>;

// types of user model for statics methods
export type IUserModel = {
  isUserExist(
    id: string,
  ): Promise<Pick<IUser, 'id' | 'role' | 'password' | 'needsPasswordChange'>>;
  isPasswordMatch(
    givenPassword: string,
    savedPassword: string,
  ): Promise<boolean>;
} & Model<IUser>;
