"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var redux_1 = require("redux");
var react_router_redux_1 = require("react-router-redux");
var userReducer_1 = require("./userReducer");
var redux_form_1 = require("redux-form");
var rootReducer = redux_1.combineReducers({
    routing: react_router_redux_1.routerReducer,
    userReducer: userReducer_1.default,
    form: redux_form_1.reducer,
});
exports.default = rootReducer;
//# sourceMappingURL=rootReducer.js.map