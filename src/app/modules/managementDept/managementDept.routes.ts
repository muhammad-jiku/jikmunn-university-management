import express from 'express';
import { validateRequest } from '../../middlewares/validateRequest';
import { ManagementDeptControllers } from './managementDept.controllers';
import { ManagementDeptValidations } from './managementDept.validations';

const router = express.Router();

router
  .route('/create')
  .post(
    validateRequest(ManagementDeptValidations.createManagementDeptZodSchema),
    ManagementDeptControllers.createManagementDept,
  );

router
  .route('/:id')
  .get(ManagementDeptControllers.getSingleManagementDept)
  .patch(
    validateRequest(ManagementDeptValidations.updateManagementDeptZodSchema),
    ManagementDeptControllers.updateManagementDept,
  )
  .delete(ManagementDeptControllers.deleteManagementDept);

router.route('/').get(ManagementDeptControllers.getAllManagementDepts);

export const ManagementDeptRoutes = router;
