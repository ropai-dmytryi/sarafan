"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var ReactDOM = require("react-dom");
var App_1 = require("ui/components/App");
var history_1 = require("history");
var redux_1 = require("redux");
var redux_thunk_1 = require("redux-thunk");
var react_router_1 = require("react-router");
var react_router_dom_1 = require("react-router-dom");
var react_router_redux_1 = require("react-router-redux");
var rootReducer_1 = require("store/reducer/rootReducer");
var react_redux_1 = require("react-redux");
var history = history_1.createBrowserHistory();
var store = redux_1.applyMiddleware(redux_thunk_1.default, react_router_redux_1.routerMiddleware(history))(redux_1.createStore)(rootReducer_1.default);
ReactDOM.render(React.createElement(react_redux_1.Provider, { store: store },
    React.createElement(react_router_1.Router, { history: history },
        React.createElement(react_router_dom_1.Route, { path: "/", component: App_1.default }))), document.getElementById('root'));
//# sourceMappingURL=main.js.map