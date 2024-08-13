import express from 'express';
import { validateRequest } from '../../middlewares/validateRequest';
import { StudentControllers } from './students.controllers';
import { StudentValidaions } from './students.validations';

const router = express.Router();

router
  .route('/:id')
  .get(StudentControllers.getSingleStudent)
  .patch(
    validateRequest(StudentValidaions.updateStudentZodSchema),
    StudentControllers.updateStudent,
  )
  .delete(StudentControllers.deleteStudent);

router.route('/').get(StudentControllers.getAllStudents);

export const StudentRoutes = router;
