import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { AcademicDepartmentControllers } from './academicDept.controllers';
import { AcademicDepartmentValidations } from './academicDept.validations';

const router = express.Router();

router.post(
  '/create',
  validateRequest(
    AcademicDepartmentValidations.createAcademicDepartmentZodSchema,
  ),
  AcademicDepartmentControllers.createDepartment,
);

router.get('/:id', AcademicDepartmentControllers.getSingleDepartment);

router.patch(
  '/:id',
  validateRequest(
    AcademicDepartmentValidations.updateAcademicDepartmentZodSchema,
  ),
  AcademicDepartmentControllers.updateDepartment,
);

router.delete('/:id', AcademicDepartmentControllers.deleteDepartment);

router.get('/', AcademicDepartmentControllers.getAllDepartments);

export const AcademicDepartmentRoutes = router;
