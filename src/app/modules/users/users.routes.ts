import express from 'express';
import { validateRequest } from '../../middlewares/validateRequest';
import { UserControllers } from './users.controllers';
import { UserValidations } from './users.validations';

const router = express.Router();

router
  .route('/create-student')
  .post(
    validateRequest(UserValidations.createStudentZodSchema),
    UserControllers.createStudent,
  );

router
  .route('/create-faculty')
  .post(
    validateRequest(UserValidations.createFacultyZodSchema),
    UserControllers.createFaculty,
  );

router
  .route('/create-admin')
  .post(
    validateRequest(UserValidations.createAdminZodSchema),
    UserControllers.createAdmin,
  );

export const UserRoutes = router;
