import { IMessage } from './IMessage';
import { IUser } from './IUser';

export interface IComment {
    id: number;
    text: string;
    message: IMessage;
    author: IUser;
}
