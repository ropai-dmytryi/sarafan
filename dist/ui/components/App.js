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
var Feed_1 = require("./Feed");
var App = /** @class */ (function (_super) {
    __extends(App, _super);
    function App() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    App.prototype.render = function () {
        var result = frontendData.profile ? (React.createElement("div", { className: "App" },
            React.createElement(Feed_1.default, { user: frontendData.profile }))) : (React.createElement("div", { className: "App" },
            React.createElement("a", { href: "/login" }, "Login")));
        return (result);
    };
    return App;
}(React.Component));
exports.default = App;
//# sourceMappingURL=App.js.map