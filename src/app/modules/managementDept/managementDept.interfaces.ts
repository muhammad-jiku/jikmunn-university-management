import { Model } from 'mongoose';

export interface IManagementDept {
  title: string;
}

export type IManagementDeptModel = Model<
  IManagementDept,
  Record<string, unknown>
>;

export interface IManagementDeptFilters {
  searchTerm?: string;
}
