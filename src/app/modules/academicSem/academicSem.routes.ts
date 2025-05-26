import express from 'express';
import { USER_ROLES } from '../../../enums/users';
import { auth } from '../../middlewares/auth';
import { validateRequest } from '../../middlewares/validateRequest';
import { AcademicSemControllers } from './academicSem.controllers';
import { AcademicSemValidations } from './academicSem.validations';

const router = express.Router();

router
  .route('/create')
  .post(
    validateRequest(AcademicSemValidations.createAcademicSemZodSchema),
    auth(USER_ROLES.SUPER_ADMIN, USER_ROLES.ADMIN),
    AcademicSemControllers.insertIntoDB,
  );

router
  .route('/:id')
  .get(
    auth(
      USER_ROLES.SUPER_ADMIN,
      USER_ROLES.ADMIN,
      USER_ROLES.FACULTY,
      USER_ROLES.STUDENT,
    ),
    AcademicSemControllers.getByIdFromDB,
  )
  .patch(
    validateRequest(AcademicSemValidations.updateAcademicSemZodSchema),
    auth(USER_ROLES.SUPER_ADMIN, USER_ROLES.ADMIN),
    AcademicSemControllers.updateOneInDB,
  )
  .delete(
    auth(USER_ROLES.SUPER_ADMIN, USER_ROLES.ADMIN),
    AcademicSemControllers.deleteOneFromDB,
  );

router.route('/').get(
  // auth(
  //    USER_ROLES.SUPER_ADMIN,
  //    USER_ROLES.ADMIN,
  //    USER_ROLES.FACULTY,
  //    USER_ROLES.STUDENT
  // ),
  AcademicSemControllers.getAllFromDB,
);

export const AcademicSemRoutes = router;
