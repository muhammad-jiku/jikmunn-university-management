import { z } from 'zod';
import {
  academicSemCodes,
  academicSemMonths,
  academicSemTitles,
} from './academicSem.constants';

const createAcademicSemZodSchema = z.object({
  body: z.object({
    title: z.enum([...academicSemTitles] as [string, ...string[]], {
      required_error: 'Titles must be provided',
    }),
    year: z.string({
      required_error: 'Year must be provided',
    }),
    code: z.enum([...academicSemCodes] as [string, ...string[]], {
      required_error: 'Code must be provided',
    }),
    startMonth: z.enum([...academicSemMonths] as [string, ...string[]], {
      required_error: 'Start month must be provided',
    }),
    endMonth: z.enum([...academicSemMonths] as [string, ...string[]], {
      required_error: 'End month must be provided',
    }),
  }),
});

const updateAcademicSemZodSchema = z
  .object({
    body: z.object({
      title: z
        .enum([...academicSemTitles] as [string, ...string[]], {
          required_error: 'Titles must be provided',
        })
        .optional(),
      year: z
        .string({
          required_error: 'Year must be provided',
        })
        .optional(),
      code: z
        .enum([...academicSemCodes] as [string, ...string[]], {
          required_error: 'Code must be provided',
        })
        .optional(),
      startMonth: z
        .enum([...academicSemMonths] as [string, ...string[]], {
          required_error: 'Start month must be provided',
        })
        .optional(),
      endMonth: z
        .enum([...academicSemMonths] as [string, ...string[]], {
          required_error: 'End month must be provided',
        })
        .optional(),
    }),
  })
  .refine(
    data =>
      (data.body.title && data.body.code) ||
      !data.body.title ||
      !data.body.code,
    { message: 'Either both title and code should be provided or neither' },
  );

export const AcademicSemValidations = {
  createAcademicSemZodSchema,
  updateAcademicSemZodSchema,
};
