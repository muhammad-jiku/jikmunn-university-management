import { z } from 'zod';
import { bloodGroup, gender } from '../students/students.constants';

const createStudentZodSchema = z.object({
  body: z
    .object({
      password: z.string().optional(),
      student: z.object({
        name: z
          .object({
            firstName: z.string({
              required_error: 'First name is required',
            }),
            middleName: z.string().optional(),
            lastName: z.string({
              required_error: 'Last name is required',
            }),
          })
          .strict(),
        gender: z.enum([...gender] as [string, ...string[]], {
          required_error: 'Gender is required',
        }),
        dateOfBirth: z.string({
          required_error: 'Date of birth is required',
        }),
        email: z
          .string({
            required_error: 'Email is required',
          })
          .email(),
        contactNo: z.string({
          required_error: 'Contact number is required',
        }),
        emergencyContactNo: z.string({
          required_error: 'Emergency contact number is required',
        }),
        bloodGroup: z.enum([...bloodGroup] as [string, ...string[]]).optional(),
        presentAddress: z.string({
          required_error: 'Present address is required',
        }),
        permanentAddress: z.string({
          required_error: 'Permanent address is required',
        }),
        academicSem: z.string({
          required_error: 'Academic semester is required',
        }),
        academicDept: z.string({
          required_error: 'Academic department is required',
        }),
        academicFaculty: z.string({
          required_error: 'Academic faculty is required',
        }),
        guardian: z
          .object({
            fatherName: z.string({
              required_error: 'Father name is required',
            }),
            fatherOccupation: z.string({
              required_error: 'Father occupation is required',
            }),
            fatherContactNo: z.string({
              required_error: 'Father contact number is required',
            }),
            motherName: z.string({
              required_error: 'Mother name is required',
            }),
            motherOccupation: z.string({
              required_error: 'Mother occupation is required',
            }),
            motherContactNo: z.string({
              required_error: 'Mother contact number is required',
            }),
            address: z.string({
              required_error: 'Guardian address is required',
            }),
          })
          .strict(),
        localGuardian: z
          .object({
            name: z.string({
              required_error: 'Local guardian name is required',
            }),
            occupation: z.string({
              required_error: 'Local guardian occupation is required',
            }),
            contactNo: z.string({
              required_error: 'Local guardian contact number is required',
            }),
            address: z.string({
              required_error: 'Local guardian address is required',
            }),
          })
          .strict(),
        profileImage: z.string().optional(),
      }),
    })
    .strict(),
});

const createFacultyZodSchema = z.object({
  body: z
    .object({
      password: z.string().optional(),
      faculty: z.object({
        name: z
          .object({
            firstName: z.string({
              required_error: 'First name is required',
            }),
            middleName: z.string().optional(),
            lastName: z.string({
              required_error: 'Last name is required',
            }),
          })
          .strict(),
        gender: z.enum([...gender] as [string, ...string[]], {
          required_error: 'Gender is required',
        }),
        dateOfBirth: z.string({
          required_error: 'Date of birth is required',
        }),
        email: z
          .string({
            required_error: 'Email is required',
          })
          .email(),
        contactNo: z.string({
          required_error: 'Contact number is required',
        }),
        emergencyContactNo: z.string({
          required_error: 'Emergency contact number is required',
        }),
        bloodGroup: z.enum([...bloodGroup] as [string, ...string[]]).optional(),
        presentAddress: z.string({
          required_error: 'Present address is required',
        }),
        permanentAddress: z.string({
          required_error: 'Permanent address is required',
        }),
        academicFaculty: z.string({
          required_error: 'Academic faculty is required',
        }),
        academicDept: z.string({
          required_error: 'Academic department is required',
        }),
        designation: z.string({
          required_error: 'Designation is required',
        }),
        profileImage: z.string().optional(),
      }),
    })
    .strict(),
});

const createAdminZodSchema = z.object({
  body: z
    .object({
      password: z.string().optional(),
      admin: z.object({
        name: z
          .object({
            firstName: z.string({
              required_error: 'First name is required',
            }),
            middleName: z.string().optional(),
            lastName: z.string({
              required_error: 'Last name is required',
            }),
          })
          .strict(),
        gender: z.enum([...gender] as [string, ...string[]], {
          required_error: 'Gender is required',
        }),
        dateOfBirth: z.string({
          required_error: 'Date of birth is required',
        }),
        email: z
          .string({
            required_error: 'Email is required',
          })
          .email(),
        contactNo: z.string({
          required_error: 'Contact number is required',
        }),
        emergencyContactNo: z.string({
          required_error: 'Emergency contact number is required',
        }),
        bloodGroup: z.enum([...bloodGroup] as [string, ...string[]]).optional(),
        presentAddress: z.string({
          required_error: 'Present address is required',
        }),
        permanentAddress: z.string({
          required_error: 'Permanent address is required',
        }),
        managementDept: z.string({
          required_error: 'Department is required',
        }),
        designation: z.string({
          required_error: 'Designation is required',
        }),
        profileImage: z.string().optional(),
      }),
    })
    .strict(),
});

export const UserValidations = {
  createStudentZodSchema,
  createFacultyZodSchema,
  createAdminZodSchema,
};
