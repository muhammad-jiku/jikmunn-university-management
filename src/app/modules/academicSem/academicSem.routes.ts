import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { AcademicSemesterControllers } from './academicSem.controllers';
import { AcademicSemesterValidation } from './academicSem.validation';

const router = express.Router();

router.post(
  '/create',
  validateRequest(AcademicSemesterValidation.createAcademicSemesterZodSchema),
  AcademicSemesterControllers.createSemester,
);

router.get('/:id', AcademicSemesterControllers.getSingleSemester);

router.patch(
  '/:id',
  validateRequest(AcademicSemesterValidation.updateAcademicSemesterZodSchema),
  AcademicSemesterControllers.updateSemester,
);

router.delete('/:id', AcademicSemesterControllers.deleteSemester);

router.get('/', AcademicSemesterControllers.getAllSemesters);

export const AcademicSemesterRoutes = router;
