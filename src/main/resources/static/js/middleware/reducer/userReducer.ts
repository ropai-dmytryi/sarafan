import {IMessage} from '../../model/Message';
import {
    GET_ALL_MESSAGES, SET_UPDATE_MESSAGE, SWITCH_TO_ADD_ACTION,
    ADD_MESSAGE, UPDATE_MESSAGE, DELETE_MESSAGE,
} from 'middleware/constants/constants';

const initialState: {
    messages: IMessage[];
    updatedMessage: IMessage;
    user: any;
} = {
    messages: [],
    updatedMessage: {
        id: 0,
        text: '',
    },
    user: {},
};

const userReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case GET_ALL_MESSAGES:
            return {...state, messages: action.messages};
        case ADD_MESSAGE:
            return {...state, messages: addToMessages(state.messages, action.message)};
        case UPDATE_MESSAGE:
            return {...state, messages: updateMessage(state.messages, action.message)};
        case DELETE_MESSAGE:
            return {...state, messages: removeMessage(state.messages, action.id)};
        case SET_UPDATE_MESSAGE:
            return {...state, updatedMessage: action.message};
        case SWITCH_TO_ADD_ACTION:
            return {...state, updateMessage: {id: 0, text: ''}};
        default:
            return state;
    }
};

const addToMessages = (messageArray: IMessage[], newMessage: IMessage) => {
    messageArray.push(newMessage);
    return [...messageArray];
};

const updateMessage = (messageArray: IMessage[], updatedMessage: IMessage) => {
    const removeIndex = messageArray.findIndex((message: IMessage) => message.id === updatedMessage.id);
    messageArray[removeIndex] = updatedMessage;
    return [...messageArray];
};

const removeMessage = (messageArray: IMessage[], id: number) => {
    const removeIndex = messageArray.findIndex((message: IMessage) => message.id === id);
    messageArray.splice(removeIndex, 1);
    return [...messageArray];
};

export default userReducer;
