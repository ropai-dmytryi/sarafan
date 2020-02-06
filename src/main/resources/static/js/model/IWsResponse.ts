import { ObjectType } from './ObjectTypeEnum';
import { EventType } from './EventTypeEnum';

export interface IWsResnponse {
    objectType: ObjectType;
    eventType: EventType;
    body: any;
}
