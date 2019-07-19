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
var core_1 = require("@material-ui/core");
var Delete_1 = require("@material-ui/icons/Delete");
var React = require("react");
var Message = /** @class */ (function (_super) {
    __extends(Message, _super);
    function Message() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Message.prototype.render = function () {
        var _a = this.props, message = _a.message, deleteMessage = _a.deleteMessage, setUpdatedMessage = _a.setUpdatedMessage;
        return (React.createElement(core_1.Card, null,
            React.createElement(core_1.CardContent, null,
                React.createElement(core_1.Typography, { variant: "h5", component: "h2" }, message.text)),
            React.createElement(core_1.CardActions, null,
                React.createElement(core_1.Button, { onClick: function () { return setUpdatedMessage(message); } }, "Update"),
                React.createElement(core_1.IconButton, { onClick: function () { return deleteMessage(message.id); } },
                    React.createElement(Delete_1.default, null)))));
    };
    return Message;
}(React.Component));
exports.default = Message;
//# sourceMappingURL=Message.js.map