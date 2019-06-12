import * as SockJS from 'sockjs-client';
import { Stomp, CompatClient } from '@stomp/stompjs';
import { IMessage } from 'model/Message';

let stompClient: CompatClient = null;
const handlers: any = [];
const ENDPOINT_URL = '/gs-websocket';
const SUBSCRIBE_URL = '/topic/activity';
const CHANGE_MESSAGE_URL = '/app/changeMessage';

export const connectToWs = () => {
    const socket = new SockJS(ENDPOINT_URL);
    stompClient = Stomp.over(socket);
    stompClient.connect({}, (frame: any) => {
        stompClient.subscribe(SUBSCRIBE_URL, (message) => {
            handlers.forEach((handler: any) => handler(JSON.parse(message.body)));
        });
    });
};

export const addHandler = (handler: any) => {
    handlers.push(handler);
};

export const disconnect = () => {
    if (stompClient !== null) {
        stompClient.disconnect();
    }
    console.log('Disconnected');
};

export const sendMessage = (message: IMessage) => {
    stompClient.send(CHANGE_MESSAGE_URL, {}, JSON.stringify(message));
};
