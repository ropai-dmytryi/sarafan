"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var SockJS = require("sockjs-client");
var stompjs_1 = require("@stomp/stompjs");
var stompClient = null;
var handlers = [];
var ENDPOINT_URL = '/gs-websocket';
var SUBSCRIBE_URL = '/topic/activity';
var CHANGE_MESSAGE_URL = '/app/changeMessage';
exports.connectToWs = function () {
    var socket = new SockJS(ENDPOINT_URL);
    stompClient = stompjs_1.Stomp.over(socket);
    stompClient.connect({}, function (frame) {
        stompClient.subscribe(SUBSCRIBE_URL, function (message) {
            handlers.forEach(function (handler) { return handler(JSON.parse(message.body)); });
        });
    });
};
exports.addHandler = function (handler) {
    handlers.push(handler);
};
exports.disconnect = function () {
    if (stompClient !== null) {
        stompClient.disconnect();
    }
    console.log('Disconnected');
};
exports.sendMessage = function (message) {
    stompClient.send(CHANGE_MESSAGE_URL, {}, JSON.stringify(message));
};
//# sourceMappingURL=WebSocket.js.map