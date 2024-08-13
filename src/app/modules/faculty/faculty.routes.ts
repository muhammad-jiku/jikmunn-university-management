import express from 'express';
import { validateRequest } from '../../middlewares/validateRequest';
import { FacultyControllers } from './faculty.controllers';
import { FacultydentValidaions } from './faculty.validations';

const router = express.Router();

router
  .route('/:id')
  .get(FacultyControllers.getSingleFaculty)
  .patch(
    validateRequest(FacultydentValidaions.updateFacultyZodSchema),
    FacultyControllers.updateFaculty,
  )
  .delete(FacultyControllers.deleteFaculty);

router.route('/').get(FacultyControllers.getAllFaculties);

export const FacultyRoutes = router;
