import { z } from 'zod';
import { bloodGroup, gender } from './students.constants';

const updateStudentZodSchema = z.object({
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
      academicSem: z.string().optional(),
      academicDept: z.string().optional(),
      academicFaculty: z.string().optional(),
      guardian: z
        .object({
          fatherName: z.string().optional(),
          fatherOccupation: z.string().optional(),
          fatherContactNo: z.string().optional(),
          motherName: z.string().optional(),
          motherOccupation: z.string().optional(),
          motherContactNo: z.string().optional(),
          address: z.string().optional(),
        })
        .strict()
        .optional(),
      localGuardian: z
        .object({
          name: z.string().optional(),
          occupation: z.string().optional(),
          contactNo: z.string().optional(),
          address: z.string().optional(),
        })
        .strict()
        .optional(),
      profileImage: z.string().optional(),
    })
    .strict(),
});

export const StudentValidaions = {
  updateStudentZodSchema,
};
