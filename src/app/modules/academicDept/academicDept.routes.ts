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
    AcademicDeptControllers.createAcademicDept,
  );

router
  .route('/:id')
  .get(AcademicDeptControllers.getAcademicDept)
  .patch(
    validateRequest(AcademicDeptValidations.updateAcademicDeptZodSchema),
    auth(USER_ROLES.SUPER_ADMIN, USER_ROLES.ADMIN),
    AcademicDeptControllers.updateAcademicDept,
  )
  .delete(
    auth(USER_ROLES.SUPER_ADMIN),
    AcademicDeptControllers.deleteAcademicDept,
  );

router.route('/').get(AcademicDeptControllers.getAllAcademicDepts);

export const AcademicDeptRoutes = router;
