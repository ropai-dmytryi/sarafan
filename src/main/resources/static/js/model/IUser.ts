export interface IUser {
    id: number;
    name: string;
    userpic: string;
    email: string;
    gender: string;
    locale: string;
    lastVisit: Date;
    subscriptions: IUser[];
    subscribers: IUser[];
}
