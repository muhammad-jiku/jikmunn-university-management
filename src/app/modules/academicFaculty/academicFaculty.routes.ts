import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { AcademicFacultyControllers } from './academicFaculty.controllers';
import { AcademicFacultyValidations } from './academicFaculty.validations';

const router = express.Router();

router.post(
  '/create',
  validateRequest(AcademicFacultyValidations.createFacultyZodSchema),
  AcademicFacultyControllers.createFaculty,
);

router.get('/:id', AcademicFacultyControllers.getSingleFaculty);

router.patch(
  '/:id',
  validateRequest(AcademicFacultyValidations.updatefacultyZodSchema),
  AcademicFacultyControllers.updateFaculty,
);

router.delete('/:id', AcademicFacultyControllers.deleteFaculty);

router.get('/', AcademicFacultyControllers.getAllFaculties);

export const AcademicFacultyRoutes = router;
