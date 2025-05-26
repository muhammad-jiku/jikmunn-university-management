import initAcademicDeptEvents from '../modules/academicDept/academicDept.events';
import initAcademicFacultyEvents from '../modules/academicFaculty/academicFaculty.events';
import initAcademicSemEvents from '../modules/academicSem/academicSem.events';

const subscribeToEvents = () => {
  initAcademicSemEvents();
  initAcademicDeptEvents();
  initAcademicFacultyEvents();
};

export default subscribeToEvents;
