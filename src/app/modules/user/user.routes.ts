import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { UserControllers } from './user.controllers';
import { UserValidations } from './user.validations';

const router = express.Router();

router.post(
  '/create-student',
  validateRequest(UserValidations.createUserZodSchema),
  UserControllers.createStudent,
);

router.post(
  '/create-faculty',
  validateRequest(UserValidations.createFacultyZodSchema),
  UserControllers.createFaculty,
);

//create admin

export const UserRoutes = router;
