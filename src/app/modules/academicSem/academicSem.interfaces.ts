import { Model } from 'mongoose';

export type IAcademicSemTitles = 'Autumn' | 'Summer' | 'Fall';

export type IAcademicSemCodes = '01' | '02' | '03';

export type IAcademicSemMonths =
  | 'January'
  | 'February'
  | 'March'
  | 'April'
  | 'May'
  | 'June'
  | 'July'
  | 'August'
  | 'September'
  | 'October'
  | 'November'
  | 'December';

export interface IAcademicSem {
  title: IAcademicSemTitles;
  year: string;
  code: IAcademicSemCodes;
  startMonth: IAcademicSemMonths;
  endMonth: IAcademicSemMonths;
}

export type IAcademicSemModel = Model<IAcademicSem, Record<string, unknown>>;

export interface IAcademicSemFilters {
  searchTerm?: string;
}
