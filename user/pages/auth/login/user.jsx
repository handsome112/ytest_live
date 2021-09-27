"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
const react_redux_1 = require("react-redux");
const user_login_form_1 = __importDefault(require("@components/auth/login/user-login-form"));
const head_1 = __importDefault(require("next/head"));
const actions_1 = require("@redux/auth/actions");
const layout_1 = require("@components/common/layout");
require("../index.less");
class Login extends react_1.PureComponent {
    constructor() {
        super(...arguments);
        this.rememberMe = false;
        this.submit = (data) => {
            const { login: dispatchLogin } = this.props;
            dispatchLogin(Object.assign(Object.assign({}, data), { remember: this.rememberMe }));
        };
    }
    componentWillUnmount() {
        const { resetLoginData: dispatchReset } = this.props;
        dispatchReset();
    }
    render() {
        const { requesting, error, success, ui } = this.props;
        return (<>
        <head_1.default>
          <title>User Sign In</title>
        </head_1.default>
        <div className="register-page">
          <div className="form-register-container">
            <user_login_form_1.default singularTextModel={(ui === null || ui === void 0 ? void 0 : ui.singularTextModel) || 'Performer'} requesting={requesting} submit={this.submit.bind(this)} onRemember={(value) => { this.rememberMe = value; }} error={error} success={success}/>
          </div>
          <layout_1.FormRegisterPlaceHolder ui={ui}/>
        </div>
      </>);
    }
}
Login.layout = 'auth';
Login.authenticate = false;
const mapStates = (state) => (Object.assign(Object.assign({}, state.auth.userLogin), { ui: state.ui }));
const mapDispatch = { login: actions_1.login, resetLoginData: actions_1.resetLoginData };
exports.default = react_redux_1.connect(mapStates, mapDispatch)(Login);
