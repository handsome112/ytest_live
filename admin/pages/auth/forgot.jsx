"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const antd_1 = require("antd");
const react_1 = require("react");
const react_redux_1 = require("react-redux");
const icons_1 = require("@ant-design/icons");
require("./index.less");
const head_1 = __importDefault(require("next/head"));
const auth_service_1 = require("@services/auth.service");
const link_1 = __importDefault(require("next/link"));
const antd_2 = require("antd");
const FormItem = antd_1.Form.Item;
class Forgot extends react_1.PureComponent {
    constructor() {
        super(...arguments);
        this.state = {
            loading: false
        };
        this.handleOk = async (data) => {
            try {
                await auth_service_1.authService.forgotPassword(data.email, 'user');
                antd_2.message.success('New password have been sent to your email');
            }
            catch (e) {
            }
        };
    }
    render() {
        const { siteName, logo } = this.props.ui;
        const { loading } = this.state;
        return (<react_1.Fragment>
        <head_1.default>
          <title>Forgot password</title>
        </head_1.default>
        <div className="form" style={{ height: '240px' }}>
          <div className="logo">
            {logo && <img alt="logo" src={logo}/>}
            <span>{siteName}</span>
          </div>
          <antd_1.Form onFinish={this.handleOk}>
            <FormItem hasFeedback 
        // label="Username"
        name="email" rules={[
                { required: true, message: 'Please input your email!' },
                { type: 'email' }
            ]}>
              <antd_1.Input placeholder="youremail@example.com"/>
            </FormItem>
            <antd_1.Row>
              <antd_1.Button type="primary" loading={loading} htmlType="submit">
                Submit
              </antd_1.Button>
            </antd_1.Row>
          </antd_1.Form>
          <p>
            <link_1.default href="/auth/login">
              <a style={{ float: 'right' }}>Login</a>
            </link_1.default>
          </p>
        </div>
        <div className="footer">{siteName}{' '}<icons_1.CopyrightCircleOutlined /> {` Copy right ${new Date().getFullYear()}`}</div>
      </react_1.Fragment>);
    }
}
Forgot.layout = 'public';
Forgot.authenticate = false;
const mapStates = (state) => ({
    ui: state.ui
});
exports.default = react_redux_1.connect(mapStates)(Forgot);
