import { IUser } from 'model/IUser';
import { Dispatch } from 'redux';
import { CHANGE_SUBSCRIPTION, GET_USER } from 'store/actions/actions';

const PROFILE_URL = '/profile';
const CHANGE_SUBSCRIPTION_URL = 'change-subscription';

export const getUserById = (userId: number) => async (dispatch: Dispatch) => {
    const response: Response = await fetch(PROFILE_URL + '/' + userId);
    const user: IUser = await response.json();

    dispatch({ type: GET_USER, payload: user });

    return user;
};

export const changeSubscription = (userId: number) => async (dispatch: Dispatch) => {
    const response: Response = await fetch(PROFILE_URL + '/' + CHANGE_SUBSCRIPTION_URL + '/' + userId, {
        method: 'POST',
    });
    const user: IUser = await response.json();

    dispatch({ type: CHANGE_SUBSCRIPTION, subscription: user });

    return user;
};
