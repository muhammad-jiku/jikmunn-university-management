import { Model, Types } from 'mongoose';
import { IAdmin } from '../admin/admin.interfaces';
import { IFaculty } from '../faculty/faculty.interfaces';
import { IStudent } from '../students/students.interfaces';

export interface IUser {
  id: string;
  role: string;
  password: string;
  student?: Types.ObjectId | IStudent;
  faculty?: Types.ObjectId | IFaculty;
  admin?: Types.ObjectId | IAdmin;
}

export type IUserModel = Model<IUser, Record<string, unknown>>;
