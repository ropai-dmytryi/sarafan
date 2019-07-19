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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) if (e.indexOf(p[i]) < 0)
            t[p[i]] = s[p[i]];
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var redux_form_1 = require("redux-form");
var core_1 = require("@material-ui/core");
var Form = function (props) {
    var handleSubmit = props.handleSubmit, initialValues = props.initialValues;
    var action = initialValues.text ? 'Update' : 'Add';
    return (React.createElement("form", { onSubmit: handleSubmit },
        React.createElement(core_1.Grid, { container: true, spacing: 2 },
            React.createElement(core_1.Grid, { item: true, xs: 10 },
                React.createElement(redux_form_1.Field, { name: "text", component: renderField })),
            React.createElement(core_1.Grid, { item: true, xs: 2 },
                React.createElement(core_1.Button, { type: "submit", variant: "contained" }, action)))));
};
var renderField = function (_a) {
    var input = _a.input, custom = __rest(_a, ["input"]);
    return (React.createElement(core_1.TextField, __assign({ label: "New message", placeholder: "Write something", fullWidth: true }, input, custom, { InputLabelProps: {
            shrink: true,
        } })));
};
var clearForm = function (result, dispatch) { return dispatch(redux_form_1.reset('mainForm')); };
exports.default = redux_form_1.reduxForm({
    form: 'mainForm',
    onSubmitSuccess: clearForm,
    enableReinitialize: true,
})(Form);
//# sourceMappingURL=Form.js.map