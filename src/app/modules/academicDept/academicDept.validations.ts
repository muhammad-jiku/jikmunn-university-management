import { z } from 'zod';

const createAcademicDeptZodSchema = z.object({
  body: z.object({
    title: z.string({
      required_error: 'Academic title is required',
    }),
    academicFaculty: z.string({
      required_error: 'Academic department is required',
    }),
  }),
});

const updateAcademicDeptZodSchema = z.object({
  body: z.object({
    title: z.string().optional(),
    academicFaculty: z.string().optional(),
  }),
});

export const AcademicDeptValidations = {
  createAcademicDeptZodSchema,
  updateAcademicDeptZodSchema,
};
