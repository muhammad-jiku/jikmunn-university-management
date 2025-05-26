import { Model, Types } from 'mongoose';
import { IAcademicFaculty } from '../academicFaculty/academicFaculty.interfaces';

export type IAcademicDept = {
  title: string;
  academicFaculty: Types.ObjectId | IAcademicFaculty;
  syncId: string;
};

export type IAcademicDeptModel = Model<IAcademicDept, Record<string, unknown>>;

export type IAcademicDeptFilters = {
  searchTerm?: string;
  academicFaculty?: Types.ObjectId;
};

export type IAcademicDeptCreatedEvent = {
  id: string;
  title: string;
  academicFacultyId: string;
};

export type IAcademicDeptUpdatedEvent = {
  id: string;
  title: string;
  academicFacultyId: string;
};

export type IAcademicDeptDeletedEvent = {
  id: string;
};
