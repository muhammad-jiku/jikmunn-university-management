import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { ManagementDepartmentControllers } from './managementDept.controllers';
import { ManagementDepartmentValidations } from './managementDept.validations';

const router = express.Router();

router.post(
  '/create-department',
  validateRequest(
    ManagementDepartmentValidations.createManagementDepartmentZodSchema,
  ),
  ManagementDepartmentControllers.createDepartment,
);

router.get('/:id', ManagementDepartmentControllers.getSingleDepartment);

router.patch(
  '/:id',
  validateRequest(
    ManagementDepartmentValidations.updateManagementDepartmentZodSchema,
  ),
  ManagementDepartmentControllers.updateDepartment,
);

router.delete('/:id', ManagementDepartmentControllers.deleteDepartment);

router.get('/', ManagementDepartmentControllers.getAllDepartments);

export const ManagementDepartmentRoutes = router;
