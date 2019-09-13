export interface IMessage {
    id: number;
    text: string;
    creationDate?: Date;

    link?: string;
    linkTitle?: string;
    linkDescription?: string;
    linkCover?: string;
}
