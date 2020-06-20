import { IUser } from 'model/IUser';
import { Dispatch } from 'redux';
import { GET_USER } from 'store/actions/actions';

const PROFILE_URL = '/profile';

export const getUserById = (userId: number) => async (dispatch: Dispatch) => {
    const response: Response = await fetch(PROFILE_URL + '/' + userId);
    const user: IUser = await response.json();

    dispatch({ type: GET_USER, payload: user });

    return user;
};
