import { GET_ALL_MESSAGES_URL } from 'store/constants/urlConstant';
import { IMessage } from 'model/IMessage';
import { IWsResnponse } from 'model/IWsResponse';
import {
    GET_ALL_MESSAGES,
    ADD_MESSAGE,
    DELETE_MESSAGE,
    UPDATE_MESSAGE,
    HANDLE_WS_RESPONSE,
} from 'store/constants/constants';
import { Dispatch } from 'redux';
import { addHandler } from 'util/WebSocket';


export const getAllMessages = () => async (dispatch: Dispatch) => {
    const response: Response = await fetch(GET_ALL_MESSAGES_URL);
    const messages = await response.json();
    dispatch({ type: GET_ALL_MESSAGES, messages });
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
    addHandler((response: IWsResnponse) => { dispatch({ type: HANDLE_WS_RESPONSE, response }); }); // handle websocket response from server
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
