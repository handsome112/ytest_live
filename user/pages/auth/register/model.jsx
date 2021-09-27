"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("../index.less");
const react_1 = require("react");
const head_1 = __importDefault(require("next/head"));
const router_1 = __importDefault(require("next/router"));
const antd_1 = require("antd");
const react_redux_1 = require("react-redux");
const actions_1 = require("@redux/auth/actions");
const model_register_form_1 = __importDefault(require("@components/auth/register/model-register-form"));
const actions_2 = require("src/redux/ui/actions");
const setting_service_1 = require("@services/setting.service");
const utils_1 = require("@lib/utils");
const moment_1 = __importDefault(require("moment"));
const layout_1 = require("@components/common/layout");
class PerformerRegisterPage extends react_1.PureComponent {
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
        const { success, data, error } = this.props;
        if (prevProps.success !== success && success) {
            antd_1.message.success((data && data.message) || 'Your register has been successfully, please wait for our admin approval');
            router_1.default.push('/auth/login/performer');
        }
        if (prevProps.error !== error && error) {
            antd_1.message.error(utils_1.getResponseError(error));
        }
    }
    onFinish(data) {
        const { performerRegister: dispatchPerformerRegister } = this.props;
        let newData = Object.assign({}, data);
        if (data.dateOfBirth) {
            newData = Object.assign(Object.assign({}, data), { dateOfBirth: moment_1.default(data.dateOfBirth).toISOString() });
        }
        // if (data.dateOfBirth) {
        //   data.dateOfBirth = moment(data.dateOfBirth).toISOString();
        // }
        dispatchPerformerRegister(newData);
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
    render() {
        const { submiting, ui } = this.props;
        const { error, errorMessage, countries } = this.state;
        return (<>
        <head_1.default>
          <title>
            {(ui === null || ui === void 0 ? void 0 : ui.singularTextModel) || 'Performer'}
            {' '}
            Register
          </title>
        </head_1.default>
        <div className="register-page">
          <div className="form-register-container">
            {errorMessage && (<antd_1.Alert type="error" message="Error request" banner/>)}
            <model_register_form_1.default singularTextModel={(ui === null || ui === void 0 ? void 0 : ui.singularTextModel) || 'Performer'} onFinish={this.onFinish.bind(this)} submiting={submiting} countries={countries} error={error}/>
          </div>
          <layout_1.FormRegisterPlaceHolder ui={ui}/>
        </div>
      </>);
    }
}
PerformerRegisterPage.authenticate = false;
PerformerRegisterPage.layout = 'auth';
const mapStateToProps = (state) => (Object.assign({ ui: state.ui, loggedIn: state.auth.loggedIn }, state.auth.performerRegister));
const mapDispatchs = { performerRegister: actions_1.performerRegister, updateUIValue: actions_2.updateUIValue };
exports.default = react_redux_1.connect(mapStateToProps, mapDispatchs)(PerformerRegisterPage);
