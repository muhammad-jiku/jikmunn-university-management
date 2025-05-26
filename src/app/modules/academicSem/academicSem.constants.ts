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

export const academicSemSearchableFields = ['title', 'code', 'year'];

export const academicSemFilterableFields = [
  'searchTerm',
  'title',
  'code',
  'year',
  'syncId',
];

export const EVENT_ACADEMIC_SEM_CREATED = 'academic-sem.created';
export const EVENT_ACADEMIC_SEM_UPDATED = 'academic-sem.updated';
export const EVENT_ACADEMIC_SEM_DELETED = 'academic-sem.deleted';
