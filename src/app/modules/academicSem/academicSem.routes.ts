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

export const AcademicSemesterRoutes = router;
