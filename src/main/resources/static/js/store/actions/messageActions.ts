import { IMessage } from 'model/IMessage';
import { IWsResponse } from 'model/IWsResponse';
import {
    GET_ALL_MESSAGES,
    ADD_MESSAGE,
    DELETE_MESSAGE,
    UPDATE_MESSAGE,
    HANDLE_WS_RESPONSE,
    UPDATE_MESSAGES,
} from 'store/constants/constants';
import { Dispatch } from 'redux';
import { addHandler } from 'util/WebSocket';

export const GET_ALL_MESSAGES_URL = '/message';

export const getAllMessages = () => async (dispatch: Dispatch) => {
    const response: Response = await fetch(GET_ALL_MESSAGES_URL);
    const messagePage = await response.json();
    dispatch({ type: GET_ALL_MESSAGES, messagePage });
};

export const getMessagePerPage = (pageNumber: number) => async (dispatch: Dispatch) => {
    const response: Response = await fetch(GET_ALL_MESSAGES_URL + '?page=' + pageNumber);
    const messagePage = await response.json();
    dispatch({ type: UPDATE_MESSAGES, messagePage });
};

export const addMessage = ({ text }: IMessage) => async (dispatch: Dispatch) => {
    const response: Response = await fetch(GET_ALL_MESSAGES_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text }),
    });
    const message = await response.json();
    dispatch({ type: ADD_MESSAGE, message });
};

export const addHeader = () => (dispatch: Dispatch) => {
    addHandler((response: IWsResponse) => { dispatch({ type: HANDLE_WS_RESPONSE, response }); }); // handle websocket response from server
};

export const updateMessage = ({ id, text }: IMessage) => async (dispatch: Dispatch) => {
    const response: Response = await fetch(GET_ALL_MESSAGES_URL + '/' + id, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text }),
    });
    const message = await response.json();

    dispatch({ type: UPDATE_MESSAGE, message });
};

export const deleteMessage = (id: number) => async (dispatch: Dispatch) => {
    await fetch(GET_ALL_MESSAGES_URL + '/' + id, { method: 'DELETE' });
    dispatch({type: DELETE_MESSAGE, id});
};
