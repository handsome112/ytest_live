"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importStar(require("react"));
const studio_login_form_1 = __importDefault(require("@components/studio/studio-login-form"));
const head_1 = __importDefault(require("next/head"));
require("../auth/index.less");
const actions_1 = require("src/redux/auth/actions");
const layout_1 = require("@components/common/layout");
const react_redux_1 = require("react-redux");
const antd_1 = require("antd");
const lib_1 = require("src/lib");
class StudioLoginPage extends react_1.PureComponent {
    constructor(props) {
        super(props);
        this.rememberMe = false;
        this.state = {};
    }
    componentDidUpdate(prevProps) {
        const { success, error } = this.props;
        if (success && success !== prevProps.success) {
            antd_1.message.success('Logged successfully');
        }
        if (error && prevProps.error !== error) {
            antd_1.message.error(lib_1.getResponseError(error));
        }
    }
    componentWillUnmount() {
        const { resetLoginData: resetLogin } = this.props;
        resetLogin();
    }
    submit(data) {
        const { studioLogin: handleLogin } = this.props;
        handleLogin(Object.assign(Object.assign({}, data), { remember: this.rememberMe }));
    }
    render() {
        const { requesting, error, success, ui } = this.props;
        return (<>
        <head_1.default>
          <title>Studio Sign in</title>
        </head_1.default>
        <div className="register-page">
          <div className="form-register-container">
            <studio_login_form_1.default requesting={requesting} submit={this.submit.bind(this)} onRemember={(value) => { this.rememberMe = value; }} error={error} success={success}/>
          </div>
          <layout_1.FormRegisterPlaceHolder ui={ui}/>
        </div>
      </>);
    }
}
StudioLoginPage.layout = 'auth';
StudioLoginPage.authenticate = false;
const mapStates = (state) => (Object.assign(Object.assign({}, state.auth.userLogin), { ui: state.ui }));
const mapDispatch = { studioLogin: actions_1.studioLogin, resetLoginData: actions_1.resetLoginData };
exports.default = react_redux_1.connect(mapStates, mapDispatch)(StudioLoginPage);
