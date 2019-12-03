import { ObjectType } from './ObjectTypeEnum';
import { EventType } from './EventTypeEnum';
import { IMessage } from './IMessage';
import { IComment } from './IComment';

export interface IWsResnponse {
    objectType: ObjectType;
    eventType: EventType;
    body: any;
}
