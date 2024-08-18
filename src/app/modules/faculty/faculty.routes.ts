import express from 'express';
import { USER_ROLES } from '../../../enums/users';
import { auth } from '../../middlewares/auth';
import { validateRequest } from '../../middlewares/validateRequest';
import { FacultyControllers } from './faculty.controllers';
import { FacultyValidaions } from './faculty.validations';

const router = express.Router();

router
  .route('/:id')
  .get(
    auth(USER_ROLES.SUPER_ADMIN, USER_ROLES.ADMIN, USER_ROLES.FACULTY),
    FacultyControllers.getFaculty,
  )
  .patch(
    validateRequest(FacultyValidaions.updateFacultyZodSchema),
    auth(USER_ROLES.SUPER_ADMIN, USER_ROLES.ADMIN),
    FacultyControllers.updateFaculty,
  )
  .delete(auth(USER_ROLES.SUPER_ADMIN), FacultyControllers.deleteFaculty);

router
  .route('/')
  .get(
    auth(USER_ROLES.SUPER_ADMIN, USER_ROLES.ADMIN, USER_ROLES.FACULTY),
    FacultyControllers.getAllFaculties,
  );

export const FacultyRoutes = router;
