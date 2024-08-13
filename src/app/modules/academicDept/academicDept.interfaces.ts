import { Model, Types } from 'mongoose';
import { IAcademicFaculty } from '../academicFaculty/academicFaculty.interfaces';

export interface IAcademicDept {
  title: string;
  academicFaculty: Types.ObjectId | IAcademicFaculty;
}

export type IAcademicDeptModel = Model<IAcademicDept, Record<string, unknown>>;

export interface IAcademicDeptFilters {
  searchTerm?: string;
}
