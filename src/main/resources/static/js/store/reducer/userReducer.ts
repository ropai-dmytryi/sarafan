import { IMessage } from 'model/Message';
import {
    GET_ALL_MESSAGES, SET_UPDATE_MESSAGE, SWITCH_TO_ADD_ACTION,
    ADD_MESSAGE, UPDATE_MESSAGE, DELETE_MESSAGE, HANDLE_WS_RESPONSE,
} from 'store/constants/constants';
import { IWsResnponse } from 'model/IWsResponse';
import { ObjectType } from 'model/ObjectTypeEnum';
import { EventType } from 'model/EventTypeEnum';
import { IUser } from 'model/IUser';

declare var frontendData: any;

const initialState: {
    messages: IMessage[];
    updatedMessage: IMessage;
    user: IUser;
} = {
    messages: [],
    updatedMessage: {
        id: 0,
        text: '',
    },
    user: frontendData.profile,
};

const userReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case GET_ALL_MESSAGES:
            return {...state, messages: action.messages};
        case ADD_MESSAGE:
            return {...state, messages: addToMessages(state.messages, action.message)};
        case UPDATE_MESSAGE:
            return {...state, messages: updateMessage(state.messages, action.message), updatedMessage: { id: 0, text: '' }};
        case DELETE_MESSAGE:
            return {...state, messages: removeMessage(state.messages, action.id)};
        case HANDLE_WS_RESPONSE:
            return {...state, messages: handleWsRenponse(state.messages, action.response)};
        case SET_UPDATE_MESSAGE:
            return {...state, updatedMessage: action.message};
        case SWITCH_TO_ADD_ACTION:
            return {...state, updatedMessage: {id: 0, text: ''}};
        default:
            return state;
    }
};

const addToMessages = (messageArray: IMessage[], newMessage: IMessage) => {
    console.log('aadd');
    console.log(newMessage);
    const index = messageArray.findIndex((message: IMessage) => message.id === newMessage.id);
    if (index === -1) {
        messageArray.push(newMessage);
    }
    return [...messageArray];
};

const updateMessage = (messageArray: IMessage[], updatedMessage: IMessage) => {
    const removeIndex = messageArray.findIndex((message: IMessage) => message.id === updatedMessage.id);
    messageArray[removeIndex] = updatedMessage;
    return [...messageArray];
};

const removeMessage = (messageArray: IMessage[], id: number) => {
    const removeIndex = messageArray.findIndex((message: IMessage) => message.id === id);
    if (removeIndex !== -1) {
        messageArray.splice(removeIndex, 1);
    }
    return [...messageArray];
};

const handleWsRenponse = (messageArray: IMessage[], response: IWsResnponse) => {
    if (response.objectType === ObjectType.MESSAGE) {
        const eventType: EventType = response.eventType;
        const message: IMessage = response.body;
        switch (eventType) {
            case EventType.CREATE:
                return addToMessages(messageArray, message);
            case EventType.UPDATE:
                return updateMessage(messageArray, message);
            case EventType.REMOVE:
                return removeMessage(messageArray, message.id);
            default:
                console.error('Event not found');
        }
    } else {
        console.error('Unexpected object type');
        return messageArray;
    }
};

export default userReducer;
