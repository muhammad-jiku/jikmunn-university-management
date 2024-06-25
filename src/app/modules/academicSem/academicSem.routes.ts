import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { AcademicSemesterControllers } from './academicSem.controllers';
import { AcademicSemesterValidations } from './academicSem.validations';

const router = express.Router();

router.post(
  '/create',
  validateRequest(AcademicSemesterValidations.createAcademicSemesterZodSchema),
  AcademicSemesterControllers.createSemester,
);

router.get('/:id', AcademicSemesterControllers.getSingleSemester);

router.patch(
  '/:id',
  validateRequest(AcademicSemesterValidations.updateAcademicSemesterZodSchema),
  AcademicSemesterControllers.updateSemester,
);

router.delete('/:id', AcademicSemesterControllers.deleteSemester);

router.get('/', AcademicSemesterControllers.getAllSemesters);

export const AcademicSemesterRoutes = router;
