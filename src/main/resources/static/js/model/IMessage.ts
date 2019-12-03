import { IUser } from './IUser';
import { IComment } from './IComment';

export interface IMessage {
    id: number;
    text: string;
    creationDate?: Date;

    author: IUser;
    comments: IComment[];

    link?: string;
    linkTitle?: string;
    linkDescription?: string;
    linkCover?: string;
}
