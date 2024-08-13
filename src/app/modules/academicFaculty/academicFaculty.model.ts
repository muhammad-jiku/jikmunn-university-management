import { model, Schema } from 'mongoose';
import {
  IAcademicFaculty,
  IAcademicFacultyModel,
} from './academicFaculty.interfaces';

const academicFacultySchema = new Schema<IAcademicFaculty>(
  {
    title: {
      type: String,
      required: true,
      unique: true,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
  },
);

export const AcademicFaculty: IAcademicFacultyModel = model<
  IAcademicFaculty,
  IAcademicFacultyModel
>('AcademicFaculty', academicFacultySchema);
