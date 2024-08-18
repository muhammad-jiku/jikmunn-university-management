import express from 'express';
import { USER_ROLES } from '../../../enums/users';
import { auth } from '../../middlewares/auth';
import { validateRequest } from '../../middlewares/validateRequest';
import { UserControllers } from './users.controllers';
import { UserValidations } from './users.validations';

const router = express.Router();

router
  .route('/create-student')
  .post(
    validateRequest(UserValidations.createStudentZodSchema),
    auth(USER_ROLES.SUPER_ADMIN, USER_ROLES.ADMIN),
    UserControllers.createStudent,
  );

router
  .route('/create-faculty')
  .post(
    validateRequest(UserValidations.createFacultyZodSchema),
    auth(USER_ROLES.SUPER_ADMIN, USER_ROLES.ADMIN),
    UserControllers.createFaculty,
  );

router
  .route('/create-admin')
  .post(
    validateRequest(UserValidations.createAdminZodSchema),
    auth(USER_ROLES.SUPER_ADMIN, USER_ROLES.ADMIN),
    UserControllers.createAdmin,
  );

export const UserRoutes = router;
