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

//create faculty

//create admin

export const UserRoutes = router;
