import { ObjectType } from './ObjectTypeEnum';
import { EventType } from './EventTypeEnum';
import { IMessage } from './Message';

export interface IWsResnponse {
    objectType: ObjectType;
    eventType: EventType;
    body: IMessage;
}
