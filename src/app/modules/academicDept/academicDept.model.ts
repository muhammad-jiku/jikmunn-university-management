import { model, Schema } from 'mongoose';
import { IAcademicDept, IAcademicDeptModel } from './academicDept.interfaces';

const academicDeptSchema = new Schema<IAcademicDept>(
  {
    title: {
      type: String,
      required: true,
      unique: true,
    },
    academicFaculty: {
      type: Schema.Types.ObjectId,
      ref: 'AcademicFaculty',
      required: true,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
  },
);

export const AcademicDept: IAcademicDeptModel = model<
  IAcademicDept,
  IAcademicDeptModel
>('AcademicDept', academicDeptSchema);
