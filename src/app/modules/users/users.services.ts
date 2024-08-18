import httpStatus from 'http-status';
import mongoose from 'mongoose';
import config from '../../../config';
import ApiError from '../../../errors/ApiError';
import { IAcademicSem } from '../academicSem/academicSem.interfaces';
import { AcademicSem } from '../academicSem/academicSem.model';
import { IAdmin } from '../admin/admin.interfaces';
import { Admin } from '../admin/admin.model';
import { IFaculty } from '../faculty/faculty.interfaces';
import { Faculty } from '../faculty/faculty.model';
import { IStudent } from '../students/students.interfaces';
import { Student } from '../students/students.model';
import { IUser } from './users.interfaces';
import { User } from './users.model';
import {
  generateAdminId,
  generateFacultyId,
  generateStudentId,
} from './users.utils';

const createStudent = async (
  student: IStudent,
  user: IUser,
): Promise<IUser | null> => {
  // user password
  if (!user.password) {
    user.password = config.default.student_pass as string;
  }

  // user role
  user.role = 'student';

  const academicSemester = await AcademicSem.findById(student.academicSem);

  let newUserAllData = null;
  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    // generate id
    const id = await generateStudentId(academicSemester as IAcademicSem);
    user.id = id;
    student.id = id;

    const newStudent = await Student.create([student], { session });
    if (!newStudent.length) {
      throw new ApiError(
        httpStatus.BAD_REQUEST,
        'Failed to create student profile!',
      );
    }

    // set student id
    user.student = newStudent[0]._id;

    const newUser = await User.create([user], { session });
    if (!newUser.length) {
      throw new ApiError(
        httpStatus.BAD_REQUEST,
        'Failed to create user profile!',
      );
    }
    newUserAllData = newUser[0];

    await session.commitTransaction();
    await session.endSession();
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();
    throw error;
  }

  if (newUserAllData) {
    newUserAllData = await User.findOne({ id: newUserAllData.id }).populate({
      path: 'student',
      populate: [
        { path: 'academicSem' },
        { path: 'academicDept' },
        { path: 'academicFaculty' },
      ],
    });
  }

  return newUserAllData;
};

const createFaculty = async (
  faculty: IFaculty,
  user: IUser,
): Promise<IUser | null> => {
  // user password
  if (!user.password) {
    user.password = config.default.faculty_pass as string;
  }

  // user role
  user.role = 'faculty';

  let newUserAllData = null;
  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    // generate id
    const id = await generateFacultyId();
    user.id = id;
    faculty.id = id;

    const newFaculty = await Faculty.create([faculty], { session });
    if (!newFaculty.length) {
      throw new ApiError(
        httpStatus.BAD_REQUEST,
        'Failed to create faculty profile!',
      );
    }

    // set faculty id
    user.faculty = newFaculty[0]._id;

    const newUser = await User.create([user], { session });
    if (!newUser.length) {
      throw new ApiError(
        httpStatus.BAD_REQUEST,
        'Failed to create user profile!',
      );
    }
    newUserAllData = newUser[0];

    await session.commitTransaction();
    await session.endSession();
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();
    throw error;
  }

  if (newUserAllData) {
    newUserAllData = await User.findOne({ id: newUserAllData.id }).populate({
      path: 'faculty',
      populate: [{ path: 'academicDept' }, { path: 'academicFaculty' }],
    });
  }

  return newUserAllData;
};

const createAdmin = async (
  admin: IAdmin,
  user: IUser,
): Promise<IUser | null> => {
  // user password
  if (!user.password) {
    user.password = config.default.admin_pass as string;
  }

  // user role
  user.role = 'admin';

  let newUserAllData = null;
  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    // generate id
    const id = await generateAdminId();
    user.id = id;
    admin.id = id;

    const newAdmin = await Admin.create([admin], { session });
    if (!newAdmin.length) {
      throw new ApiError(
        httpStatus.BAD_REQUEST,
        'Failed to create admin profile!',
      );
    }

    // set admin id
    user.admin = newAdmin[0]._id;

    const newUser = await User.create([user], { session });
    if (!newUser.length) {
      throw new ApiError(
        httpStatus.BAD_REQUEST,
        'Failed to create user profile!',
      );
    }
    newUserAllData = newUser[0];

    await session.commitTransaction();
    await session.endSession();
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();
    throw error;
  }

  if (newUserAllData) {
    newUserAllData = await User.findOne({ id: newUserAllData.id }).populate({
      path: 'admin',
      populate: [{ path: 'managementDept' }],
    });
  }

  return newUserAllData;
};

export const UserServices = {
  createStudent,
  createFaculty,
  createAdmin,
};
