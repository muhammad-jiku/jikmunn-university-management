import { Model, Types } from 'mongoose';
import { IAcademicDept } from '../academicDept/academicDept.interfaces';
import { IAcademicFaculty } from '../academicFaculty/academicFaculty.interfaces';
import { IAcademicSem } from '../academicSem/academicSem.interfaces';

export interface UserName {
  firstName: string;
  middleName: string;
  lastName: string;
}

export interface Guardian {
  fatherName: string;
  fatherOccupation: string;
  fatherContactNo: string;
  motherName: string;
  motherOccupation: string;
  motherContactNo: string;
  address: string;
}

export interface LocalGuardian {
  name: string;
  occupation: string;
  contactNo: string;
  address: string;
}

export interface IStudent {
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
  guardian: Guardian; // embedded object
  localGuardian: LocalGuardian; // embedded object
  academicFaculty: Types.ObjectId | IAcademicFaculty; // reference _id
  academicDept: Types.ObjectId | IAcademicDept; // reference _id
  academicSem: Types.ObjectId | IAcademicSem; // reference _id
  profileImage?: string;
}

export type IStudentModel = Model<IStudent, Record<string, unknown>>;

export interface IStudentFilters {
  searchTerm?: string;
  id?: string;
  bloodGroup?: string;
  email?: string;
  contactNo?: string;
  emergencyContactNo?: string;
}
