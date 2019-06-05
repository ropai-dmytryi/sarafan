import {GET_ALL_MESSAGES_URL} from '../constants/urlConstant';
import {IMessage} from '../../model/Message';
import {
    GET_ALL_MESSAGES,
    ADD_MESSAGE,
    DELETE_MESSAGE,
    SET_UPDATE_MESSAGE,
    UPDATE_MESSAGE,
    SWITCH_TO_ADD_ACTION,
} from '../constants/constants';
import { Dispatch } from 'redux';
import { sendMessage, addHandler } from 'util/WebSocket';

export const getAllMessages = () => (dispatch: Dispatch) => {
    fetch(GET_ALL_MESSAGES_URL)
        .then((response) => response.json())
        .then((data) => dispatch(success(data)))
        .catch((error) => console.log(error));

    const success = (messages: IMessage[]) => ({
        type: GET_ALL_MESSAGES,
        messages,
    });
};

export const addMessage = (message: IMessage) => (dispatch: Dispatch) => {
    sendMessage(message);
};

export const addHeader = () => (dispatch: Dispatch) => {
    addHandler((data: IMessage) => dispatch(success(data)));
    const success = (message: IMessage) => ({
        type: ADD_MESSAGE,
        message,
    });
};

export const updateMessage = (message: IMessage) => (dispatch: Dispatch) => {
    const {id, text} = message;
    fetch(GET_ALL_MESSAGES_URL + '/' + id, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({text}),
    }).then((response) => response.json())
        .then((data) => dispatch(success(data)))
        .catch((errorMessage) => console.log(errorMessage));

    const success = (message: any) => ({
        type: UPDATE_MESSAGE,
        message,
    });
};

export const deleteMessage = (id: number) => (dispatch: Dispatch) => {
    fetch(GET_ALL_MESSAGES_URL + '/' + id, {
        method: 'DELETE',
    }).then(() => dispatch({type: DELETE_MESSAGE, id}))
        .catch((errorMessage: string) => console.log(errorMessage));
};

export const setUpdateMessage = (message: IMessage) => (dispatch: Dispatch) => {
    dispatch({type: SET_UPDATE_MESSAGE, message});
};

export const switchToAddAction = () => (dispatch: Dispatch) => {
    dispatch({type: SWITCH_TO_ADD_ACTION});
};
