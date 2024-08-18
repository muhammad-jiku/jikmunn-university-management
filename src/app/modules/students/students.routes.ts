import express from 'express';
import { USER_ROLES } from '../../../enums/users';
import { auth } from '../../middlewares/auth';
import { validateRequest } from '../../middlewares/validateRequest';
import { StudentControllers } from './students.controllers';
import { StudentValidaions } from './students.validations';

const router = express.Router();

router
  .route('/:id')
  .get(
    auth(
      USER_ROLES.SUPER_ADMIN,
      USER_ROLES.ADMIN,
      USER_ROLES.FACULTY,
      USER_ROLES.STUDENT,
    ),
    StudentControllers.getStudent,
  )
  .patch(
    validateRequest(StudentValidaions.updateStudentZodSchema),
    auth(USER_ROLES.SUPER_ADMIN, USER_ROLES.ADMIN),
    StudentControllers.updateStudent,
  )
  .delete(auth(USER_ROLES.SUPER_ADMIN), StudentControllers.deleteStudent);

router
  .route('/')
  .get(
    auth(
      USER_ROLES.SUPER_ADMIN,
      USER_ROLES.ADMIN,
      USER_ROLES.FACULTY,
      USER_ROLES.STUDENT,
    ),
    StudentControllers.getAllStudents,
  );

export const StudentRoutes = router;
