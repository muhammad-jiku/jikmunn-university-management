import { RedisClient } from '../../../shared/redis';
import {
  EVENT_ACADEMIC_DEPT_CREATED,
  EVENT_ACADEMIC_DEPT_DELETED,
  EVENT_ACADEMIC_DEPT_UPDATED,
} from './academicDept.constants';
import {
  IAcademicDeptCreatedEvent,
  IAcademicDeptDeletedEvent,
  IAcademicDeptUpdatedEvent,
} from './academicDept.interfaces';
import { AcademicDeptServices } from './academicDept.services';

const initAcademicDeptEvents = () => {
  RedisClient.subscribe(EVENT_ACADEMIC_DEPT_CREATED, async (e: string) => {
    const data: IAcademicDeptCreatedEvent = JSON.parse(e);

    await AcademicDeptServices.insertIntoDBFromEvent(data);
  });

  RedisClient.subscribe(EVENT_ACADEMIC_DEPT_UPDATED, async (e: string) => {
    const data: IAcademicDeptUpdatedEvent = JSON.parse(e);

    await AcademicDeptServices.updateOneInDBFromEvent(data);
  });

  RedisClient.subscribe(EVENT_ACADEMIC_DEPT_DELETED, async (e: string) => {
    const data: IAcademicDeptDeletedEvent = JSON.parse(e);

    await AcademicDeptServices.deleteOneFromDBFromEvent(data.id);
  });
};

export default initAcademicDeptEvents;
