import express from 'express';
import { USER_ROLES } from '../../../enums/users';
import { auth } from '../../middlewares/auth';
import { validateRequest } from '../../middlewares/validateRequest';
import { ManagementDeptControllers } from './managementDept.controllers';
import { ManagementDeptValidations } from './managementDept.validations';

const router = express.Router();

router
  .route('/create')
  .post(
    validateRequest(ManagementDeptValidations.createManagementDeptZodSchema),
    auth(USER_ROLES.SUPER_ADMIN, USER_ROLES.ADMIN),
    ManagementDeptControllers.createManagementDept,
  );

router
  .route('/:id')
  .get(
    auth(
      USER_ROLES.SUPER_ADMIN,
      USER_ROLES.ADMIN,
      USER_ROLES.FACULTY,
      USER_ROLES.STUDENT,
    ),
    ManagementDeptControllers.getManagementDept,
  )
  .patch(
    validateRequest(ManagementDeptValidations.updateManagementDeptZodSchema),
    auth(USER_ROLES.SUPER_ADMIN, USER_ROLES.ADMIN),
    ManagementDeptControllers.updateManagementDept,
  )
  .delete(
    auth(USER_ROLES.SUPER_ADMIN),
    ManagementDeptControllers.deleteManagementDept,
  );

router
  .route('/')
  .get(
    auth(
      USER_ROLES.SUPER_ADMIN,
      USER_ROLES.ADMIN,
      USER_ROLES.FACULTY,
      USER_ROLES.STUDENT,
    ),
    ManagementDeptControllers.getAllManagementDepts,
  );

export const ManagementDeptRoutes = router;
