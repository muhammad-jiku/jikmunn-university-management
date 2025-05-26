import { RedisClient } from '../../../shared/redis';
import {
  EVENT_ACADEMIC_SEM_CREATED,
  EVENT_ACADEMIC_SEM_DELETED,
  EVENT_ACADEMIC_SEM_UPDATED,
} from './academicSem.constants';
import { IAcademicSemCreatedEvent } from './academicSem.interfaces';
import { AcademicSemServices } from './academicSem.services';

const initAcademicSemEvents = () => {
  RedisClient.subscribe(EVENT_ACADEMIC_SEM_CREATED, async (e: string) => {
    const data: IAcademicSemCreatedEvent = JSON.parse(e);

    await AcademicSemServices.insertIntoDBFromEvent(data);
    console.log(data);
  });

  RedisClient.subscribe(EVENT_ACADEMIC_SEM_UPDATED, async (e: string) => {
    const data = JSON.parse(e);
    await AcademicSemServices.updateOneInDBFromEvent(data);
    //console.log("Updated data: ", data);
  });

  RedisClient.subscribe(EVENT_ACADEMIC_SEM_DELETED, async (e: string) => {
    const data = JSON.parse(e);

    await AcademicSemServices.deleteOneFromDBFromEvent(data.id);
  });
};

export default initAcademicSemEvents;
