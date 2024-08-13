import express from 'express';
import { validateRequest } from '../../middlewares/validateRequest';
import { AcademicSemControllers } from './academicSem.controllers';
import { AcademicSemValidations } from './academicSem.validations';

const router = express.Router();

router
  .route('/create')
  .post(
    validateRequest(AcademicSemValidations.createAcademicSemZodSchema),
    AcademicSemControllers.createSem,
  );

router
  .route('/:id')
  .get(AcademicSemControllers.getSingleSem)
  .patch(
    validateRequest(AcademicSemValidations.updateAcademicSemZodSchema),
    AcademicSemControllers.updateSingleSem,
  )
  .delete(AcademicSemControllers.deleteSingleSem);

router.route('/').get(AcademicSemControllers.getAllSems);

export const AcademicSemRoutes = router;
