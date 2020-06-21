import { IUser } from 'model/IUser';
import { Dispatch } from 'redux';
import { CHANGE_SUBSCRIPTION, GET_USER, GET_USER_BY_NAME } from 'store/actions/actions';

const USER_URL = '/user';
const CHANGE_SUBSCRIPTION_URL = 'change-subscription';
const FILTER_URL = '/filter';

export const getUserById = (userId: number) => async (dispatch: Dispatch) => {
    const response: Response = await fetch(USER_URL + '/' + userId);
    const user: IUser = await response.json();

    dispatch({ type: GET_USER, payload: user });

    return user;
};

export const changeSubscription = (userId: number) => async (dispatch: Dispatch) => {
    const response: Response = await fetch(USER_URL + '/' + CHANGE_SUBSCRIPTION_URL + '/' + userId, {
        method: 'POST',
    });
    const user: IUser = await response.json();

    dispatch({ type: CHANGE_SUBSCRIPTION, subscription: user });

    return user;
};

export const getUserByName = (userName: string) => async (dispatch: Dispatch) => {
    const response: Response = await fetch(USER_URL + FILTER_URL + '?name=' + userName);
    const user: IUser = await response.json();

    dispatch({ type: GET_USER_BY_NAME, subscription: user });

    return user;
};
