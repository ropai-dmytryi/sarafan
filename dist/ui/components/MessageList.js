"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var react_redux_1 = require("react-redux");
var redux_1 = require("redux");
var Message_1 = require("./Message");
var MessageActions = require("store/actions/messageActions");
var MessageList = /** @class */ (function (_super) {
    __extends(MessageList, _super);
    function MessageList() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    MessageList.prototype.componentDidMount = function () {
        this.props.getAllMessages();
    };
    MessageList.prototype.render = function () {
        var _a = this.props, messages = _a.messages, deleteMessage = _a.deleteMessage, setUpdatedMessage = _a.setUpdatedMessage;
        return (React.createElement("div", null, messages.map(function (message, index) { return (React.createElement(Message_1.default, { key: index, message: message, deleteMessage: deleteMessage, setUpdatedMessage: setUpdatedMessage })); })));
    };
    return MessageList;
}(React.Component));
var mapStateToProps = function (state) { return ({
    messages: state.userReducer.messages,
}); };
var mapDispatchToProps = function (dispatch) {
    return redux_1.bindActionCreators({
        getAllMessages: MessageActions.getAllMessages,
        deleteMessage: MessageActions.deleteMessage,
        setUpdatedMessage: MessageActions.setUpdateMessage,
    }, dispatch);
};
exports.default = react_redux_1.connect(mapStateToProps, mapDispatchToProps)(MessageList);
//# sourceMappingURL=MessageList.js.map