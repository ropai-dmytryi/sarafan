import { MessageModel } from '../../model/Message';
import { GET_ALL_MESSAGES } from 'middleware/constants/constants';
import { ADD_MESSAGE, DELETE_MESSAGE } from './../constants/constants';

const initialState: {
  messages: MessageModel[];
} = {
  messages: [],
};

const userReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case GET_ALL_MESSAGES:
      return { ...state, messages: action.messages };
    case ADD_MESSAGE:
      return { ...state, messages: addToMessages(state.messages, action.message)};
    case DELETE_MESSAGE:
      return { ...state, messages: removeMesage(state.messages, action.id)};
    default:
      return state;
  }
};

const addToMessages = (messageArray: MessageModel[], newMessage: MessageModel) => {
  messageArray.push(newMessage);
  return [...messageArray];
}

const removeMesage = (messageArray: MessageModel[], id: number) => {
  const removeIndex = messageArray.findIndex(message => message.id === id);
  messageArray.splice(removeIndex, 1);
  console.log(messageArray)
  return [...messageArray];
}

export default userReducer;
