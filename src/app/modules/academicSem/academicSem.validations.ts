import { z } from 'zod';
import {
  academicSemCodes,
  academicSemMonths,
  academicSemTitles,
} from './academicSem.constants';

const createAcademicSemZodSchema = z.object({
  body: z.object({
    title: z.enum([...academicSemTitles] as [string, ...string[]], {
      required_error: 'Title is required',
    }),
    year: z.string({
      required_error: 'Year is required ',
    }),
    code: z.enum([...academicSemCodes] as [string, ...string[]]),
    startMonth: z.enum([...academicSemMonths] as [string, ...string[]], {
      required_error: 'Start month is needed',
    }),
    endMonth: z.enum([...academicSemMonths] as [string, ...string[]], {
      required_error: 'End month is needed',
    }),
  }),
});

const updateAcademicSemZodSchema = z
  .object({
    body: z.object({
      title: z
        .enum([...academicSemTitles] as [string, ...string[]], {
          required_error: 'Title is required',
        })
        .optional(),
      year: z
        .string({
          required_error: 'Year is required ',
        })
        .optional(),
      code: z.enum([...academicSemCodes] as [string, ...string[]]).optional(),
      startMonth: z
        .enum([...academicSemMonths] as [string, ...string[]], {
          required_error: 'Start month is needed',
        })
        .optional(),
      endMonth: z
        .enum([...academicSemMonths] as [string, ...string[]], {
          required_error: 'End month is needed',
        })
        .optional(),
    }),
  })
  .refine(
    data =>
      (data.body.title && data.body.code) ||
      (!data.body.title && !data.body.code),
    {
      message: 'Either both title and code should be provided or neither',
    },
  );

export const AcademicSemValidations = {
  createAcademicSemZodSchema,
  updateAcademicSemZodSchema,
};
