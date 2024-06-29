import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { FacultyControllers } from './faculty.controllers';
import { FacultyValidations } from './faculty.validations';

const router = express.Router();

router.get('/:id', FacultyControllers.getSingleFaculty);
router.get('/', FacultyControllers.getAllFaculties);

router.patch(
  '/:id',
  validateRequest(FacultyValidations.updateFacultyZodSchema),
  FacultyControllers.updateFaculty,
);

router.delete('/:id', FacultyControllers.deleteFaculty);

export const FacultyRoutes = router;
