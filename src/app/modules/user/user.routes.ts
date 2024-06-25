import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { UserControllers } from './user.controllers';
import { UserValidations } from './user.validations';

const router = express.Router();

router.post(
  '/create',
  validateRequest(UserValidations.createUserZodSchema),
  UserControllers.createUser,
);

export const UserRoutes = router;
