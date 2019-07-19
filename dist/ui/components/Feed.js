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
var MessageActions = require("store/actions/messageActions");
var Form_1 = require("./Form");
var MessageList_1 = require("./MessageList");
var WebSocket_1 = require("util/WebSocket");
var core_1 = require("@material-ui/core");
var styles_1 = require("@material-ui/core/styles");
var ExitToApp_1 = require("@material-ui/icons/ExitToApp");
var Feed = /** @class */ (function (_super) {
    __extends(Feed, _super);
    function Feed() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Feed.prototype.componentDidMount = function () {
        WebSocket_1.connectToWs();
        this.props.addHeader();
    };
    Feed.prototype.render = function () {
        var _a = this.props, addMessage = _a.addMessage, updateMessage = _a.updateMessage, updatedMessage = _a.updatedMessage, user = _a.user;
        return (React.createElement("div", null,
            React.createElement(ToolBarComp, { user: user }),
            React.createElement(core_1.Container, { style: { marginTop: 40 } },
                React.createElement(Form_1.default, { onSubmit: updatedMessage.text ? updateMessage : addMessage, initialValues: updatedMessage })),
            React.createElement(MessageList_1.default, null)));
    };
    return Feed;
}(React.Component));
var ToolBarComp = function (props) {
    var classes = useStyles({});
    var user = props.user;
    return (React.createElement("div", { className: classes.root },
        React.createElement(core_1.AppBar, { position: "static", color: "default" },
            React.createElement(core_1.Toolbar, null,
                React.createElement(core_1.Typography, { variant: "h6", className: classes.title }, "Sarafan"),
                React.createElement("span", null, user.name),
                React.createElement(core_1.IconButton, { href: "/logout" },
                    React.createElement(ExitToApp_1.default, null))))));
};
var useStyles = styles_1.makeStyles(function (theme) {
    return styles_1.createStyles({
        root: {
            flexGrow: 1,
        },
        title: {
            flexGrow: 1,
        },
    });
});
var mapStateToProps = function (state) { return ({
    updatedMessage: state.userReducer.updatedMessage,
}); };
var mapDispatchToProps = function (dispatch) { return redux_1.bindActionCreators({
    addMessage: MessageActions.addMessage,
    updateMessage: MessageActions.updateMessage,
    switchToAddAction: MessageActions.switchToAddAction,
    addHeader: MessageActions.addHeader,
}, dispatch); };
exports.default = react_redux_1.connect(mapStateToProps, mapDispatchToProps)(Feed);
//# sourceMappingURL=Feed.js.map