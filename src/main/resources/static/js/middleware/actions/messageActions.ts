import { GET_ALL_MESSAGES_URL } from '../constants/urlConstant';
import { IMessage } from '../../model/Message';
import { GET_ALL_MESSAGES, ADD_MESSAGE, DELETE_MESSAGE, SET_UPDATE_MESSAGE, UPDATE_MESSAGE, SWITCH_TO_ADD_ACTION } from './../constants/constants';

export const getAllMessages = () => (dispatch: any) => {
  fetch(GET_ALL_MESSAGES_URL)
    .then((responce) => responce.json())
    .then((data) => dispatch(success(data)))
    .catch((error) => console.log(error));

  const success = (messages: IMessage[]) => ({
    type: GET_ALL_MESSAGES,
    messages,
  });
};

export const addMessage = (message: IMessage) => (dispatch: any) => {
  const text = message.text;
  fetch(GET_ALL_MESSAGES_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ text }),
  }).then((responce) => responce.json())
    .then((data) => dispatch(success(data)))
    .catch((errorMessage) => console.log(errorMessage));

  const success = (message: any) => ({
    type: ADD_MESSAGE,
    message,
  });
};

export const updateMessage = (message: IMessage) => (dispatch: any) => {
  const { id, text } = message;
  fetch(GET_ALL_MESSAGES_URL + '/' + id, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ text }),
  }).then((responce) => responce.json())
    .then((data) => dispatch(success(data)))
    .catch((errorMessage) => console.log(errorMessage));

  const success = (message: any) => ({
    type: UPDATE_MESSAGE,
    message,
  });
};

export const deleteMessage = (id: number) => (dispatch: any) => {
    fetch(GET_ALL_MESSAGES_URL + '/' + id, {
        method: 'DELETE',
    }).then(dispatch({ type: DELETE_MESSAGE, id }))
    .catch((errorMessage) => console.log(errorMessage));
};

export const setUpdateMessage = (message: IMessage) => (dispatch: any) => {
  dispatch({ type: SET_UPDATE_MESSAGE, message });
};

export const switchToAddAction = () => (dispatch: any) => {
  dispatch({ type: SWITCH_TO_ADD_ACTION })
};
