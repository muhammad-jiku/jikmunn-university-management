import express from 'express';
import { validateRequest } from '../../middlewares/validateRequest';
import { AuthControllers } from './auth.controllers';
import { AuthValidations } from './auth.validations';

const router = express.Router();

router
  .route('/login')
  .post(
    validateRequest(AuthValidations.loginUserZodSchema),
    AuthControllers.loginUser,
  );

router
  .route('/refresh-token')
  .post(
    validateRequest(AuthValidations.refreshTokenHandlerZodSchema),
    AuthControllers.refreshTokenHandler,
  );

export const AuthRoutes = router;
