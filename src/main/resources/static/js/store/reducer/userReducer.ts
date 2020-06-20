import { IMessage } from 'model/IMessage';
import {
    GET_ALL_MESSAGES,
    ADD_MESSAGE,
    UPDATE_MESSAGE,
    DELETE_MESSAGE,
    HANDLE_WS_RESPONSE,
    ADD_COMMENT,
    UPDATE_MESSAGES,
} from 'store/actions/actions';
import { IWsResponse } from 'model/IWsResponse';
import { ObjectType } from 'model/ObjectTypeEnum';
import { EventType } from 'model/EventTypeEnum';
import { IUser } from 'model/IUser';
import { IComment } from 'model/IComment';

declare var frontendData: any;

const initialState: {
    messages: IMessage[];
    user: IUser;
    currentPage: number;
    totalPages: number;
} = {
    messages: [],
    user: frontendData.profile,
    currentPage: 0,
    totalPages: 0,
};

const userReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case GET_ALL_MESSAGES:
            return {...state, ...action.messagePage};
        case UPDATE_MESSAGES:
            const { messages, currentPage, totalPages } = action.messagePage;
            return {...state, messages: [...state.messages, ...messages], currentPage, totalPages};
        case ADD_MESSAGE:
            return {...state, messages: addToMessages(state.messages, action.message)};
        case UPDATE_MESSAGE:
            return {...state, messages: updateMessage(state.messages, action.message)};
        case DELETE_MESSAGE:
            return {...state, messages: removeMessage(state.messages, action.id)};
        case HANDLE_WS_RESPONSE:
            return {...state, messages: handleWsResponse(state.messages, action.response)};
        case ADD_COMMENT:
            return {...state, messages: addComment(state.messages, action.comment)};
        default:
            return state;
    }
};

const addToMessages = (messageArray: IMessage[], newMessage: IMessage) => {
    const index = messageArray.findIndex((message: IMessage) => message.id === newMessage.id);
    if (index === -1) {
        messageArray.unshift(newMessage);
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

const handleWsResponse = (messageArray: IMessage[], response: IWsResponse) => {
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
                throw new Error(`Unknown event ${ eventType }`);
        }
    } else if (response.objectType === ObjectType.COMMENT) {
        const eventType: EventType = response.eventType;
        const comment: IComment = response.body as IComment;
        if (eventType === EventType.CREATE) {
            return addComment(messageArray, comment);
        }
    } else {
        throw new Error('Unknown object type');
    }
};

export default userReducer;
