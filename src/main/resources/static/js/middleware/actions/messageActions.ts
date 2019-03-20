import { GET_ALL_MESSAGES_URL } from '../constants/urlConstant';
import { MessageModel } from '../../model/Message';
import { GET_ALL_MESSAGES, ADD_MESSAGE, DELETE_MESSAGE } from './../constants/constants';

export const getAllMessages = () => (dispatch: any) => {
  fetch(GET_ALL_MESSAGES_URL)
    .then((responce) => responce.json())
    .then((data) => dispatch(success(data)))
    .catch((error) => console.log(error));

  const success = (messages: MessageModel[]) => ({
    type: GET_ALL_MESSAGES,
    messages,
  });
};

export const addMessage = (text: MessageModel) => (dispatch: any) => {
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

export const deleteMessage = (id: number) => (dispatch: any) => {
    fetch(GET_ALL_MESSAGES_URL + '/' + id, {
        method: 'DELETE',
    }).then(dispatch({ type: DELETE_MESSAGE, id }))
    .catch((errorMessage) => console.log(errorMessage));
}
