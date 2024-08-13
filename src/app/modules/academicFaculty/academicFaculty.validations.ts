import { z } from 'zod';

const createAcademicFacultyZodSchema = z.object({
  body: z.object({
    title: z.string({
      required_error: 'Academic faculty title must be provided',
    }),
  }),
});

const updateAcademicFacultyZodSchema = z.object({
  body: z.object({
    title: z.string({
      required_error: 'Academic faculty title must be provided!',
    }),
  }),
});

export const AcademicFacultyValidations = {
  createAcademicFacultyZodSchema,
  updateAcademicFacultyZodSchema,
};
