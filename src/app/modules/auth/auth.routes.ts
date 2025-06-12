import express from 'express';
import { USER_ROLES } from '../../../enums/users';
import { auth } from '../../middlewares/auth';
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

router
  .route('/change-password')
  .post(
    auth(USER_ROLES.ADMIN, USER_ROLES.FACULTY, USER_ROLES.STUDENT),
    validateRequest(AuthValidations.changePasswordZodSchema),
    AuthControllers.changePassword,
  );

router.route('/forgot-password').post(AuthControllers.forgotPass);

router.route('/reset-password').post(AuthControllers.resetPassword);

export const AuthRoutes = router;
