"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
var constants_1 = require("store/constants/constants");
var ObjectTypeEnum_1 = require("model/ObjectTypeEnum");
var EventTypeEnum_1 = require("model/EventTypeEnum");
var initialState = {
    messages: [],
    updatedMessage: {
        id: 0,
        text: '',
    },
    user: {},
};
var userReducer = function (state, action) {
    if (state === void 0) { state = initialState; }
    switch (action.type) {
        case constants_1.GET_ALL_MESSAGES:
            return __assign({}, state, { messages: action.messages });
        case constants_1.ADD_MESSAGE:
            return __assign({}, state, { messages: addToMessages(state.messages, action.message) });
        case constants_1.UPDATE_MESSAGE:
            return __assign({}, state, { messages: updateMessage(state.messages, action.message), updatedMessage: { id: 0, text: '' } });
        case constants_1.DELETE_MESSAGE:
            return __assign({}, state, { messages: removeMessage(state.messages, action.id) });
        case constants_1.HANDLE_WS_RESPONSE:
            return __assign({}, state, { messages: handleWsRenponse(state.messages, action.response) });
        case constants_1.SET_UPDATE_MESSAGE:
            return __assign({}, state, { updatedMessage: action.message });
        case constants_1.SWITCH_TO_ADD_ACTION:
            return __assign({}, state, { updatedMessage: { id: 0, text: '' } });
        default:
            return state;
    }
};
var addToMessages = function (messageArray, newMessage) {
    var index = messageArray.findIndex(function (message) { return message.id === newMessage.id; });
    if (index === -1) {
        messageArray.push(newMessage);
    }
    return messageArray.slice();
};
var updateMessage = function (messageArray, updatedMessage) {
    var removeIndex = messageArray.findIndex(function (message) { return message.id === updatedMessage.id; });
    messageArray[removeIndex] = updatedMessage;
    return messageArray.slice();
};
var removeMessage = function (messageArray, id) {
    var removeIndex = messageArray.findIndex(function (message) { return message.id === id; });
    if (removeIndex !== -1) {
        messageArray.splice(removeIndex, 1);
    }
    return messageArray.slice();
};
var handleWsRenponse = function (messageArray, response) {
    if (response.objectType === ObjectTypeEnum_1.ObjectType.MESSAGE) {
        var eventType = response.eventType;
        var message = response.body;
        switch (eventType) {
            case EventTypeEnum_1.EventType.CREATE:
                return addToMessages(messageArray, message);
            case EventTypeEnum_1.EventType.UPDATE:
                return updateMessage(messageArray, message);
            case EventTypeEnum_1.EventType.REMOVE:
                return removeMessage(messageArray, message.id);
            default:
                console.error('Event not found');
        }
    }
    else {
        console.error('Unexpected object type');
        return messageArray;
    }
};
exports.default = userReducer;
//# sourceMappingURL=userReducer.js.map