import express from 'express';
import { validateRequest } from '../../middlewares/validateRequest';
import { AcademicDeptControllers } from './academicDept.controllers';
import { AcademicDeptValidations } from './academicDept.validations';

const router = express.Router();

router
  .route('/create')
  .post(
    validateRequest(AcademicDeptValidations.createAcademicDeptZodSchema),
    AcademicDeptControllers.createAcademicDept,
  );

router
  .route('/:id')
  .get(AcademicDeptControllers.getSingleAcademicDept)
  .patch(
    validateRequest(AcademicDeptValidations.updateAcademicDeptZodSchema),
    AcademicDeptControllers.updateAcademicDept,
  )
  .delete(AcademicDeptControllers.deleteAcademicDept);

router.route('/').get(AcademicDeptControllers.getAllAcademicDepts);

export const AcademicDeptRoutes = router;
