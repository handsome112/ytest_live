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
const antd_1 = require("antd");
const react_1 = __importStar(require("react"));
const head_1 = __importDefault(require("next/head"));
const router_1 = __importDefault(require("next/router"));
const setting_service_1 = require("@services/setting.service");
const utils_1 = require("@lib/utils");
const services_1 = require("src/services");
const studio_register_form_1 = __importDefault(require("@components/auth/register/studio-register-form"));
const react_redux_1 = require("react-redux");
const layout_1 = require("@components/common/layout");
require("../auth/index.less");
class RegisterStudioPage extends react_1.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            error: false,
            errorMessage: '',
            countries: [],
            registering: false
        };
    }
    componentDidMount() {
        const { loggedIn } = this.props;
        if (loggedIn) {
            router_1.default.push('/');
        }
        this.getContries();
    }
    async getContries() {
        try {
            const countries = await setting_service_1.settingService.getCountries();
            this.setState({ countries: countries.data });
        }
        catch (error) {
            this.setState({ error: true, errorMessage: utils_1.getResponseError(error) });
        }
    }
    async submit(data) {
        var _a, _b;
        try {
            this.setState({ registering: true });
            const resp = await services_1.authService.studioRegister(data);
            antd_1.message.success(((_a = resp === null || resp === void 0 ? void 0 : resp.data) === null || _a === void 0 ? void 0 : _a.message)
                ? (_b = resp === null || resp === void 0 ? void 0 : resp.data) === null || _b === void 0 ? void 0 : _b.message
                : 'Registered successfully, please wait for our admin approval');
            router_1.default.push('/studio/login');
        }
        catch (error) {
            this.setState({ error: true, errorMessage: utils_1.getResponseError(error) });
        }
        finally {
            this.setState({ registering: false });
        }
    }
    render() {
        const { error, errorMessage, countries, registering } = this.state;
        const { ui } = this.props;
        return (<>
      <head_1.default>
        <title> Studio Register </title>
      </head_1.default>
      <div className="register-page">
        <div className="form-register-container">
          <studio_register_form_1.default error={error} onFinish={this.submit.bind(this)} submiting={registering} countries={countries} errorMessage={errorMessage}/>
        </div>
        <layout_1.FormRegisterPlaceHolder ui={ui}/>
      </div>
    </>);
    }
}
RegisterStudioPage.layout = 'auth';
RegisterStudioPage.authenticate = false;
const mapStateToProps = (state) => ({
    ui: state.ui,
    loggedIn: state.auth.loggedIn
});
exports.default = react_redux_1.connect(mapStateToProps)(RegisterStudioPage);
