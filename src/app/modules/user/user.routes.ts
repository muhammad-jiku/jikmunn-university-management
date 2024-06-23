import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { UserControllers } from './user.controllers';
import { UserValidation } from './user.validation';

const router = express.Router();

router.post(
  '/create',
  validateRequest(UserValidation.createUserZodSchema),
  UserControllers.createUser,
);

export const UserRoutes = router;
