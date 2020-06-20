import { IUser } from 'model/IUser';

const PROFILE_URL = '/profile';

export const getUserById = async (userId: number): Promise<IUser> =>  {
    const response: Response = await fetch(PROFILE_URL + '?id=' + userId);
    const user = await response.json();
    return user;
};
