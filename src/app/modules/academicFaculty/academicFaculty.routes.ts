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
    validateRequest(AcademicFacultyValidations.createFacultyZodSchema),
    auth(USER_ROLES.SUPER_ADMIN, USER_ROLES.ADMIN),
    AcademicFacultyControllers.insertIntoDB,
  );

router
  .route('/:id')
  .get(
    auth(USER_ROLES.SUPER_ADMIN, USER_ROLES.ADMIN, USER_ROLES.FACULTY),
    AcademicFacultyControllers.getByIdFromDB,
  )
  .patch(
    validateRequest(AcademicFacultyValidations.updatefacultyZodSchema),
    auth(USER_ROLES.SUPER_ADMIN, USER_ROLES.ADMIN, USER_ROLES.FACULTY),
    AcademicFacultyControllers.updateOneInDB,
  )
  .delete(
    auth(USER_ROLES.SUPER_ADMIN),
    AcademicFacultyControllers.deleteOneFromDB,
  );

router.route('/').get(
  // auth(
  //   USER_ROLES.SUPER_ADMIN,
  //   USER_ROLES.ADMIN,
  //   USER_ROLES.FACULTY
  // ),
  AcademicFacultyControllers.getAllFromDB,
);

export const AcademicFacultyRoutes = router;
