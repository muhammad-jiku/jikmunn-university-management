import { z } from 'zod';

const createManagementDeptZodSchema = z.object({
  body: z.object({
    title: z.string({
      required_error: 'Department title must be provided',
    }),
  }),
});

const updateManagementDeptZodSchema = z.object({
  body: z
    .object({
      title: z
        .string({
          required_error: 'Department title must be provided',
        })
        .optional(),
    })
    .strict(),
});

export const ManagementDeptValidations = {
  createManagementDeptZodSchema,
  updateManagementDeptZodSchema,
};
