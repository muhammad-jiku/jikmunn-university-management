import httpStatus from 'http-status';
import { model, Schema } from 'mongoose';
import ApiError from '../../../errors/ApiError';
import {
  academicSemCodes,
  academicSemMonths,
  academicSemTitles,
} from './academicSem.constants';
import { IAcademicSem, IAcademicSemModel } from './academicSem.interfaces';

const academicSemSchema = new Schema<IAcademicSem, IAcademicSemModel>(
  {
    title: {
      type: String,
      required: true,
      enum: academicSemTitles,
    },
    year: {
      type: Number,
      required: true,
    },
    code: {
      type: String,
      required: true,
      enum: academicSemCodes,
    },
    startMonth: {
      type: String,
      required: true,
      enum: academicSemMonths,
    },
    endMonth: {
      type: String,
      required: true,
      enum: academicSemMonths,
    },
    syncId: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  },
);

academicSemSchema.pre('save', async function (next) {
  const isExist = await AcademicSem.findOne({
    title: this.title,
    year: this.year,
  });
  console.log(isExist);
  if (isExist) {
    throw new ApiError(
      httpStatus.CONFLICT,
      'Academic semester is already exist!',
    );
  }
  next();
});

// export const AcademicSem: IAcademicSemModel = model<IAcademicSem>(
//   'AcademicSem',
//   academicSemSchema,
// );
export const AcademicSem = model<IAcademicSem, IAcademicSemModel>(
  'AcademicSem',
  academicSemSchema,
);
