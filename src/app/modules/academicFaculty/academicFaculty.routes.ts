import express from 'express';
import { USER_ROLES } from '../../../enums/users';
import { auth } from '../../middlewares/auth';
import { validateRequest } from '../../middlewares/validateRequest';
import { AcademicFacultyControllers } from './academicFaculty.controllers';
import { AcademicFacultyValidations } from './academicFaculty.validations';

const router = express.Router();

router
  .route('/create')
  .post(
    validateRequest(AcademicFacultyValidations.createAcademicFacultyZodSchema),
    auth(USER_ROLES.SUPER_ADMIN, USER_ROLES.ADMIN),
    AcademicFacultyControllers.createAcademicFaculty,
  );

router
  .route('/:id')
  .get(
    auth(USER_ROLES.SUPER_ADMIN, USER_ROLES.ADMIN, USER_ROLES.FACULTY),
    AcademicFacultyControllers.getAcademicFaculty,
  )
  .patch(
    validateRequest(AcademicFacultyValidations.updateAcademicFacultyZodSchema),
    auth(USER_ROLES.SUPER_ADMIN, USER_ROLES.ADMIN, USER_ROLES.FACULTY),
    AcademicFacultyControllers.updateAcademicFaculty,
  )
  .delete(
    auth(USER_ROLES.SUPER_ADMIN),
    AcademicFacultyControllers.deleteAcademicFaculty,
  );

router.route('/').get(AcademicFacultyControllers.getAllAcademicFaculties);

export const AcademicFacultyRoutes = router;
