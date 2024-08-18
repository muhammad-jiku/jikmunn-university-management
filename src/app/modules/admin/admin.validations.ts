import { z } from 'zod';
import { bloodGroup, gender } from './admin.constants';

const updateAdminZodSchema = z.object({
  body: z
    .object({
      name: z
        .object({
          firstName: z.string().optional(),
          middleName: z.string().optional(),
          lastName: z.string().optional(),
        })
        .strict()
        .optional(),
      gender: z.enum([...gender] as [string, ...string[]]).optional(),
      dateOfBirth: z.string().optional(),
      email: z.string().email().optional(),
      contactNo: z.string().optional(),
      emergencyContactNo: z.string().optional(),
      bloodGroup: z.enum([...bloodGroup] as [string, ...string[]]).optional(),
      presentAddress: z.string().optional(),
      permanentAddress: z.string().optional(),
      managementDept: z.string().optional(),
      designation: z.string().optional(),
      profileImage: z.string().optional(),
    })
    .strict(),
});

export const AdminValidations = {
  updateAdminZodSchema,
};
