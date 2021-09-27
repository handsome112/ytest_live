"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("../index.less");
const react_1 = require("react");
const antd_1 = require("antd");
const react_redux_1 = require("react-redux");
const head_1 = __importDefault(require("next/head"));
const user_register_form_1 = __importDefault(require("@components/auth/register/user-register-form"));
const actions_1 = require("@redux/auth/actions");
const router_1 = __importDefault(require("next/router"));
const setting_service_1 = require("@services/setting.service");
const utils_1 = require("@lib/utils");
const moment_1 = __importDefault(require("moment"));
const layout_1 = require("@components/common/layout");
class UserRegisterPage extends react_1.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            error: false,
            errorMessage: '',
            countries: []
        };
    }
    componentDidMount() {
        this.getContries();
    }
    componentDidUpdate(prevProps) {
        const { success, error } = this.props;
        if (prevProps.success !== success && success) {
            antd_1.message.success('Congrats, your account has been created');
            router_1.default.push('/auth/login');
        }
        if (prevProps.error !== error && error) {
            antd_1.message.error(utils_1.getResponseError(error));
        }
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
    submit(data) {
        const { userRegister: dispatchUserRegister } = this.props;
        let newData = Object.assign({}, data);
        if (data.dateOfBirth) {
            newData = Object.assign(Object.assign({}, data), { dateOfBirth: moment_1.default(data.dateOfBirth).toISOString() });
            // if (data.dateOfBirth) {
            //   data.dateOfBirth = moment(data.dateOfBirth).toISOString();
        }
        dispatchUserRegister(newData);
    }
    render() {
        const { requesting, ui } = this.props;
        const { error, errorMessage, countries } = this.state;
        return (<>
        <head_1.default>
          <title>User Register</title>
        </head_1.default>
        <div className="register-page">
          <div className="form-register-container">
            {errorMessage && (<antd_1.Alert type="error" message="Error request" banner/>)}
            <user_register_form_1.default singularTextModel={(ui === null || ui === void 0 ? void 0 : ui.singularTextModel) || 'Performer'} error={error} onFinish={this.submit.bind(this)} submiting={requesting} countries={countries}/>
          </div>
          <layout_1.FormRegisterPlaceHolder ui={ui}/>
        </div>
      </>);
    }
}
UserRegisterPage.authenticate = false;
UserRegisterPage.layout = 'public';
const mapStateToProps = (state) => (Object.assign({ ui: state.ui, loggedIn: state.auth.loggedIn }, state.auth.userRegister));
const mapDispatch = { userRegister: actions_1.userRegister };
exports.default = react_redux_1.connect(mapStateToProps, mapDispatch)(UserRegisterPage);
