import { IMessage } from 'model/IMessage';
import {
    GET_ALL_MESSAGES, SET_UPDATE_MESSAGE, SWITCH_TO_ADD_ACTION,
    ADD_MESSAGE, UPDATE_MESSAGE, DELETE_MESSAGE, HANDLE_WS_RESPONSE, ADD_COMMENT,
} from 'store/constants/constants';
import { IWsResnponse } from 'model/IWsResponse';
import { ObjectType } from 'model/ObjectTypeEnum';
import { EventType } from 'model/EventTypeEnum';
import { IUser } from 'model/IUser';
import { IComment } from 'model/IComment';

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
        author: undefined,
        comments: [],
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
        case ADD_COMMENT:
            return {...state, messages: addComment(state.messages, action.comment)};
        default:
            return state;
    }
};

const addToMessages = (messageArray: IMessage[], newMessage: IMessage) => {
    const index = messageArray.findIndex((message: IMessage) => message.id === newMessage.id);
    if (index === -1) {
        messageArray.push(newMessage);
    }
    return [...messageArray];
};

const updateMessage = (messageArray: IMessage[], updatedMessage: IMessage) => {
    const index = messageArray.findIndex((message: IMessage) => message.id === updatedMessage.id);
    messageArray[index] = updatedMessage;
    return [...messageArray];
};

const removeMessage = (messageArray: IMessage[], id: number) => {
    const removeIndex = messageArray.findIndex((message: IMessage) => message.id === id);
    if (removeIndex !== -1) {
        messageArray.splice(removeIndex, 1);
    }
    return [...messageArray];
};

const addComment = (messageArray: IMessage[], newComment: IComment) => {
    const index = messageArray.findIndex((message: IMessage) => message.id === newComment.message.id);
    if (index !== -1) {
        const comments: IComment[] = messageArray[index].comments;
        if (comments) {
            const commentIndex = comments.findIndex((comment: IComment) => comment.id === newComment.id);
            if (commentIndex === -1) {
                messageArray[index].comments.push(newComment);
            }
        } else {
            messageArray[index].comments = [newComment];
        }
    }
    return [...messageArray];
};

const handleWsRenponse = (messageArray: IMessage[], response: IWsResnponse) => {
    if (response.objectType === ObjectType.MESSAGE) {
        const eventType: EventType = response.eventType;
        const message: IMessage = response.body as IMessage;
        switch (eventType) {
            case EventType.CREATE:
                return addToMessages(messageArray, message);
            case EventType.UPDATE:
                return updateMessage(messageArray, message);
            case EventType.REMOVE:
                return removeMessage(messageArray, message.id);
            default:
                throw new Error('Unknow event');
        }
    } else if (response.objectType === ObjectType.COMMENT) {
        const eventType: EventType = response.eventType;
        const comment: IComment = response.body as IComment;
        if (eventType === EventType.CREATE) {
            return addComment(messageArray, comment);
        }
    } else {
        throw new Error('Unknow object type');
    }
};

export default userReducer;
