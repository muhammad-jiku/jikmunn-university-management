import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { StudentControllers } from './student.controllers';
import { StudentValidaions } from './student.validations';

const router = express.Router();

router.get('/:id', StudentControllers.getSingleStudent);
router.get('/', StudentControllers.getAllStudents);

router.delete('/:id', StudentControllers.deleteStudent);

router.patch(
  '/:id',
  validateRequest(StudentValidaions.updateStudentZodSchema),
  StudentControllers.updateStudent,
);

export const StudentRoutes = router;
