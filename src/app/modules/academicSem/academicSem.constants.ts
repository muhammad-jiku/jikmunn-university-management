import {
  IAcademicSemCodes,
  IAcademicSemMonths,
  IAcademicSemTitles,
} from './academicSem.interfaces';

export const academicSemTitles: IAcademicSemTitles[] = [
  'Autumn',
  'Summer',
  'Fall',
];

export const academicSemCodes: IAcademicSemCodes[] = ['01', '02', '03'];

export const academicSemMonths: IAcademicSemMonths[] = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

export const academicSemTitleCodeMapper: {
  [key: string]: string;
} = {
  Autumn: '01',
  Summer: '02',
  Fall: '03',
};

export const academicSemSearchableFields: string[] = ['title', 'code', 'year'];

export const academicSemFilterableFields: string[] = [
  'searchTerm',
  'title',
  'code',
  'year',
];
