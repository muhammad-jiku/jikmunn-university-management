import express from 'express';
import { USER_ROLES } from '../../../enums/users';
import { auth } from '../../middlewares/auth';
import { validateRequest } from '../../middlewares/validateRequest';
import { AcademicDeptControllers } from './academicDept.controllers';
import { AcademicDeptValidations } from './academicDept.validations';

const router = express.Router();

router
  .route('/create')
  .post(
    validateRequest(AcademicDeptValidations.createAcademicDeptZodSchema),
    auth(USER_ROLES.SUPER_ADMIN, USER_ROLES.ADMIN),
    AcademicDeptControllers.insertIntoDB,
  );

router
  .route('/:id')
  .get(AcademicDeptControllers.getByIdFromDB)
  .patch(
    validateRequest(AcademicDeptValidations.updateAcademicDeptZodSchema),
    auth(USER_ROLES.SUPER_ADMIN, USER_ROLES.ADMIN),
    AcademicDeptControllers.updateOneInDB,
  )
  .delete(
    auth(USER_ROLES.SUPER_ADMIN),
    AcademicDeptControllers.deleteOneFromDB,
  );

router.route('/').get(
  // auth(
  //    USER_ROLES.SUPER_ADMIN,
  //    USER_ROLES.ADMIN,
  //    USER_ROLES.FACULTY,
  //    USER_ROLES.STUDENT
  // ),
  AcademicDeptControllers.getAllFromDB,
);

export const AcademicDeptRoutes = router;
