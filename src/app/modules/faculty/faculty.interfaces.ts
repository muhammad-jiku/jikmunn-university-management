import { Model, Types } from 'mongoose';
import { IAcademicDept } from '../academicDept/academicDept.interfaces';
import { IAcademicFaculty } from '../academicFaculty/academicFaculty.interfaces';

export interface UserName {
  firstName: string;
  middleName: string;
  lastName: string;
}

export interface IFaculty {
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
  academicFaculty: Types.ObjectId | IAcademicFaculty; // reference _id
  academicDept: Types.ObjectId | IAcademicDept; // reference _id
  designation: string;
  profileImage?: string;
}

export type IFacultyModel = Model<IFaculty, Record<string, unknown>>;

export interface IFacultyFilters {
  searchTerm?: string;
  id?: string;
  email?: string;
  contactNo?: string;
  emergencyContactNo?: string;
  gender?: 'male' | 'female';
  bloodGroup?: 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-';
  academicFaculty?: string;
  academicDept?: string;
  designation?: string;
}
