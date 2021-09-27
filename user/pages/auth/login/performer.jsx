"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("../index.less");
const react_1 = require("react");
const react_redux_1 = require("react-redux");
const performer_login_form_1 = __importDefault(require("@components/auth/login/performer-login-form"));
const head_1 = __importDefault(require("next/head"));
const actions_1 = require("@redux/auth/actions");
const layout_1 = require("@components/common/layout");
class Login extends react_1.PureComponent {
    constructor() {
        super(...arguments);
        this.rememberMe = false;
        this.submit = (data) => {
            const { performerlogin: dispatchPerformerlogin } = this.props;
            dispatchPerformerlogin(Object.assign(Object.assign({}, data), { remember: this.rememberMe }));
        };
    }
    componentWillUnmount() {
        const { resetLoginData: resetLogin } = this.props;
        resetLogin();
    }
    render() {
        const { requesting, error, success, ui } = this.props;
        return (<>
        <head_1.default>
          <title>
            {(ui === null || ui === void 0 ? void 0 : ui.singularTextModel) || 'Performer'}
            {' '}
            Sign in
          </title>
        </head_1.default>
        <div className="register-page" style={{}}>
          <div className="form-register-container">
            <performer_login_form_1.default requesting={requesting} submit={this.submit.bind(this)} error={error} onRemember={(value) => { this.rememberMe = value; }} success={success}/>
          </div>
          <layout_1.FormRegisterPlaceHolder ui={ui}/>
        </div>
      </>);
    }
}
Login.layout = 'auth';
Login.authenticate = false;
const mapStates = (state) => (Object.assign(Object.assign({}, state.auth.userLogin), { ui: state.ui }));
const mapDispatch = { performerlogin: actions_1.performerlogin, resetLoginData: actions_1.resetLoginData };
exports.default = react_redux_1.connect(mapStates, mapDispatch)(Login);
