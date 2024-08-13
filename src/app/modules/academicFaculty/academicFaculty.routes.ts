import express from 'express';
import { validateRequest } from '../../middlewares/validateRequest';
import { AcademicFacultyControllers } from './academicFaculty.controllers';
import { AcademicFacultyValidations } from './academicFaculty.validations';

const router = express.Router();

router
  .route('/create')
  .post(
    validateRequest(AcademicFacultyValidations.createAcademicFacultyZodSchema),
    AcademicFacultyControllers.createFaculty,
  );

router
  .route('/:id')
  .get(AcademicFacultyControllers.getSingleFaculty)
  .patch(
    validateRequest(AcademicFacultyValidations.updateAcademicFacultyZodSchema),
    AcademicFacultyControllers.updateSingleFaculty,
  )
  .delete(AcademicFacultyControllers.deleteSingleFaculty);

router.route('/').get(AcademicFacultyControllers.getAllFaculties);

export const AcademicFacultyRoutes = router;
