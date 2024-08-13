import { model, Schema } from 'mongoose';
import {
  IManagementDept,
  IManagementDeptModel,
} from './managementDept.interfaces';

const managementDeptSchema = new Schema<IManagementDept>(
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

export const ManagementDept: IManagementDeptModel = model<
  IManagementDept,
  IManagementDeptModel
>('ManagementDept', managementDeptSchema);
