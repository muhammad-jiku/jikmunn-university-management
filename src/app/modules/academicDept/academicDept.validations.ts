import { z } from 'zod';

const createAcademicDeptZodSchema = z.object({
  body: z.object({
    title: z.string({
      required_error: 'Academic department title must be provided',
    }),
    academicFaculty: z.string({
      required_error: 'Academic faculty must be provided',
    }),
  }),
});

const updateAcademicDeptZodSchema = z.object({
  body: z.object({
    title: z
      .string({
        required_error: 'Academic department title must be provided',
      })
      .optional(),
    academicFaculty: z
      .string({
        required_error: 'Academic faculty must be provided',
      })
      .optional(),
  }),
});

export const AcademicDeptValidations = {
  createAcademicDeptZodSchema,
  updateAcademicDeptZodSchema,
};
