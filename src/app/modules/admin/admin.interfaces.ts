import { Model, Types } from 'mongoose';
import { IManagementDept } from '../managementDept/managementDept.interfaces';

export interface UserName {
  firstName: string;
  middleName: string;
  lastName: string;
}

export interface IAdmin {
  id: string;
  name: UserName; //embedded object
  gender: 'male' | 'female';
  dateOfBirth: string;
  email: string;
  contactNo: string;
  emergencyContactNo: string;
  bloodGroup?: 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-';
  presentAddress: string;
  permanentAddress: string;
  managementDept: Types.ObjectId | IManagementDept; // reference _id
  designation: string;
  profileImage?: string;
}

export type IAdminModel = Model<IAdmin, Record<string, unknown>>;

export interface IAdminFilters {
  searchTerm?: string;
  id?: string;
  bloodGroup?: string;
  email?: string;
  contactNo?: string;
  emergencyContactNo?: string;
}
