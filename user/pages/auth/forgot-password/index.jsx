"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("../index.less");
const react_1 = require("react");
const head_1 = __importDefault(require("next/head"));
const auth_service_1 = require("src/services/auth.service");
const antd_1 = require("antd");
const utils_1 = require("src/lib/utils");
const link_1 = __importDefault(require("next/link"));
const react_redux_1 = require("react-redux");
const layout_1 = require("@components/common/layout");
class ForgotPasswordPage extends react_1.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            loading: false
        };
    }
    async onFinish(data) {
        try {
            this.setState({ loading: true });
            await auth_service_1.authService.forgotPassword(data.email, data.type);
            antd_1.message.success('New password have been sent to your email');
            this.setState({ loading: false });
        }
        catch (e) {
            const err = await Promise.resolve(e);
            antd_1.message.error(utils_1.getResponseError(err));
            this.setState({ loading: false });
        }
    }
    render() {
        const { loading } = this.state;
        const { ui } = this.props;
        return (<>
        <head_1.default>
          <title>Forgot Password</title>
        </head_1.default>
        <div className="register-page">
          <div className="form-register-container">
            <antd_1.Form onFinish={this.onFinish.bind(this)} layout="vertical" initialValues={{ type: 'user' }}>
              <h1>Forgot Password</h1>
              <antd_1.Form.Item label="Type" name="type" key="type" rules={[{ required: true }]}>
                <antd_1.Select>
                  <antd_1.Select.Option value="user" key="user">
                    User
                  </antd_1.Select.Option>
                  <antd_1.Select.Option value="performer" key="performer">
                    {(ui === null || ui === void 0 ? void 0 : ui.singularTextModel) || 'Performer'}
                  </antd_1.Select.Option>
                  <antd_1.Select.Option value="studio" key="studio">
                    Studio
                  </antd_1.Select.Option>
                </antd_1.Select>
              </antd_1.Form.Item>
              <antd_1.Form.Item name="email" key="email" label="Email" rules={[
                { type: 'email', message: 'The input is not valid E-mail!' },
                { required: true, message: 'Please input your email!' }
            ]}>
                <antd_1.Input type="email" placeholder="abc@example.com"/>
              </antd_1.Form.Item>
              <antd_1.Form.Item>
                <antd_1.Button type="primary" disabled={loading} loading={loading} htmlType="submit">
                  Submit
                </antd_1.Button>
              </antd_1.Form.Item>
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                width: '100%',
                margin: '15px 0'
            }}>
                <link_1.default href="/auth/resend-verification-email">
                  <a>Resend Email Verification</a>
                </link_1.default>
                <link_1.default href="/auth/login/user">
                  <a>Login</a>
                </link_1.default>
              </div>
            </antd_1.Form>
          </div>
          <layout_1.FormRegisterPlaceHolder ui={ui}/>
        </div>
      </>);
    }
}
ForgotPasswordPage.layout = 'auth';
ForgotPasswordPage.authenticate = false;
const mapStates = (state) => ({
    ui: state.ui
});
const mapDispatch = {};
exports.default = react_redux_1.connect(mapStates, mapDispatch)(ForgotPasswordPage);
