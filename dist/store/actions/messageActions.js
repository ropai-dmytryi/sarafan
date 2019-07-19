"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var urlConstant_1 = require("store/constants/urlConstant");
var constants_1 = require("store/constants/constants");
var WebSocket_1 = require("util/WebSocket");
exports.getAllMessages = function () { return function (dispatch) {
    fetch(urlConstant_1.GET_ALL_MESSAGES_URL)
        .then(function (response) { return response.json(); })
        .then(function (data) { return dispatch(success(data)); })
        .catch(function (error) { return console.log(error); });
    var success = function (messages) { return ({
        type: constants_1.GET_ALL_MESSAGES,
        messages: messages,
    }); };
}; };
exports.addMessage = function (message) { return function (dispatch) {
    var text = message.text;
    fetch(urlConstant_1.GET_ALL_MESSAGES_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text: text }),
    }).then(function (response) { return response.json(); })
        .then(function (data) { return dispatch(success(data)); })
        .catch(function (errorMessage) { return console.log(errorMessage); });
    var success = function (message) { return ({
        type: constants_1.ADD_MESSAGE,
        message: message,
    }); };
}; };
exports.addHeader = function () { return function (dispatch) {
    WebSocket_1.addHandler(function (data) { dispatch(success(data)); }); // handle websocket response from server
    var success = function (response) { return ({
        type: constants_1.HANDLE_WS_RESPONSE,
        response: response,
    }); };
}; };
exports.updateMessage = function (message) { return function (dispatch) {
    var id = message.id, text = message.text;
    fetch(urlConstant_1.GET_ALL_MESSAGES_URL + '/' + id, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text: text }),
    }).then(function (response) { return response.json(); })
        .then(function (data) { return dispatch(success(data)); })
        .catch(function (errorMessage) { return console.log(errorMessage); });
    var success = function (message) { return ({
        type: constants_1.UPDATE_MESSAGE,
        message: message,
    }); };
}; };
exports.deleteMessage = function (id) { return function (dispatch) {
    fetch(urlConstant_1.GET_ALL_MESSAGES_URL + '/' + id, {
        method: 'DELETE',
    }).then(function () { return dispatch({ type: constants_1.DELETE_MESSAGE, id: id }); })
        .catch(function (errorMessage) { return console.log(errorMessage); });
}; };
exports.setUpdateMessage = function (message) { return function (dispatch) {
    dispatch({ type: constants_1.SET_UPDATE_MESSAGE, message: message });
}; };
exports.switchToAddAction = function () { return function (dispatch) {
    dispatch({ type: constants_1.SWITCH_TO_ADD_ACTION });
}; };
//# sourceMappingURL=messageActions.js.map