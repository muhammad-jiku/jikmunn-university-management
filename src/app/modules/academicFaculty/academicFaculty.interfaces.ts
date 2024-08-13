import { Model } from 'mongoose';

export interface IAcademicFaculty {
  title: string;
}

export type IAcademicFacultyModel = Model<
  IAcademicFaculty,
  Record<string, unknown>
>;

export interface IAcademicFacultyFilters {
  searchTerm?: string;
}
