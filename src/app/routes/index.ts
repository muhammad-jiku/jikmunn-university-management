import express from 'express';
import { AcademicDeptRoutes } from '../modules/academicDept/academicDept.routes';
import { AcademicFacultyRoutes } from '../modules/academicFaculty/academicFaculty.routes';
import { AcademicSemRoutes } from '../modules/academicSem/academicSem.routes';
import { AdminRoutes } from '../modules/admin/admin.routes';
import { FacultyRoutes } from '../modules/faculty/faculty.routes';
import { ManagementDeptRoutes } from '../modules/managementDept/managementDept.routes';
import { StudentRoutes } from '../modules/students/students.routes';
import { UserRoutes } from '../modules/users/users.routes';

const router = express.Router();

const moduleRoutes = [
  {
    path: '/users',
    route: UserRoutes,
  },
  {
    path: '/students',
    route: StudentRoutes,
  },
  {
    path: '/faculties',
    route: FacultyRoutes,
  },
  {
    path: '/admins',
    route: AdminRoutes,
  },
  {
    path: '/management-departments',
    route: ManagementDeptRoutes,
  },
  {
    path: '/academic-semesters',
    route: AcademicSemRoutes,
  },
  {
    path: '/academic-faculties',
    route: AcademicFacultyRoutes,
  },
  {
    path: '/academic-departments',
    route: AcademicDeptRoutes,
  },
];

moduleRoutes.forEach(route => router.use(route.path, route.route));
export default router;
