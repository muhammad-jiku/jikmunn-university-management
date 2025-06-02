import { Model } from 'mongoose';

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

export type IAcademicSemTitles = 'Autumn' | 'Summer' | 'Fall';

export type IAcademicSemCodes = '01' | '02' | '03';

export type IAcademicSem = {
  title: IAcademicSemTitles;
  year: string;
  code: IAcademicSemCodes;
  startMonth: IAcademicSemMonths;
  endMonth: IAcademicSemMonths;
  syncId: string;
};

// export type IAcademicSemModel = Model<IAcademicSem>;
export type IAcademicSemModel = Model<IAcademicSem, Record<string, unknown>>;

export type IAcademicSemFilters = {
  searchTerm?: string;
};

export type IAcademicSemCreatedEvent = {
  id: string;
  title: string;
  year: string;
  code: string;
  startMonth: string;
  endMonth: string;
};

export type IAcademicSemUpdatedEvent = {
  id: string;
  title: string;
  year: string;
  code: string;
  startMonth: string;
  endMonth: string;
};

export type IAcademicSemDeletedEvent = {
  id: string;
};
