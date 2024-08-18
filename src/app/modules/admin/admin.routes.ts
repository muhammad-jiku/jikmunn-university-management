import express from 'express';
import { USER_ROLES } from '../../../enums/users';
import { auth } from '../../middlewares/auth';
import { validateRequest } from '../../middlewares/validateRequest';
import { AdminControllers } from './admin.controllers';
import { AdminValidations } from './admin.validations';

const router = express.Router();

router
  .route('/:id')
  .get(
    auth(USER_ROLES.SUPER_ADMIN, USER_ROLES.ADMIN),
    AdminControllers.getAdmin,
  )
  .patch(
    validateRequest(AdminValidations.updateAdminZodSchema),
    auth(USER_ROLES.SUPER_ADMIN, USER_ROLES.ADMIN),
    AdminControllers.updateAdmin,
  )
  .delete(auth(USER_ROLES.SUPER_ADMIN), AdminControllers.deleteAdmin);

router
  .route('/')
  .get(
    auth(USER_ROLES.SUPER_ADMIN, USER_ROLES.ADMIN),
    AdminControllers.getAllAdmins,
  );

export const AdminRoutes = router;
