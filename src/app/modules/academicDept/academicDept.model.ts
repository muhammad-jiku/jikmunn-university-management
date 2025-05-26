import { model, Schema } from 'mongoose';
import { IAcademicDept, IAcademicDeptModel } from './academicDept.interfaces';

const academicDeptSchema = new Schema<IAcademicDept, IAcademicDeptModel>(
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
    syncId: {
      type: String,
      required: true,
      unique: true,
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  },
);

export const AcademicDept = model<IAcademicDept, IAcademicDeptModel>(
  'AcademicDept',
  academicDeptSchema,
);
