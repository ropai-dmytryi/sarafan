import { ObjectType } from './ObjectTypeEnum';
import { EventType } from './EventTypeEnum';

export interface IWsResponse {
    objectType: ObjectType;
    eventType: EventType;
    body: any;
}
