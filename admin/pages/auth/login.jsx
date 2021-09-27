"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getStaticProps = void 0;
const antd_1 = require("antd");
const react_1 = require("react");
const react_redux_1 = require("react-redux");
const icons_1 = require("@ant-design/icons");
require("./index.less");
const head_1 = __importDefault(require("next/head"));
const actions_1 = require("@redux/auth/actions");
const link_1 = __importDefault(require("next/link"));
const utils_1 = require("@lib/utils");
const FormItem = antd_1.Form.Item;
async function getStaticProps() {
    return {
        props: {}
    };
}
exports.getStaticProps = getStaticProps;
class Login extends react_1.PureComponent {
    constructor() {
        super(...arguments);
        this.handleOk = (data) => {
            this.props.login(data);
        };
    }
    render() {
        const { siteName, logo } = this.props.ui;
        const { loginAuth = { requesting: false, error: null, success: false } } = this.props;
        return (<react_1.Fragment>
        <head_1.default>
          <title>Login</title>
        </head_1.default>
        <div className="form">
          <div className="logo">
            {logo && <img alt="logo" src={logo}/>}
            <span>{siteName}</span>
          </div>
          {loginAuth.error && (<antd_1.Alert message="Error" description={utils_1.getResponseError(loginAuth.error)} type="error" showIcon/>)}
          {loginAuth.success ? (<antd_1.Alert message="Login success" type="success" description="Redirecting..."/>) : (<antd_1.Form onFinish={this.handleOk} initialValues={{
                    email: '',
                    password: ''
                }}>
              <FormItem hasFeedback 
            // label="Username"
            name="email" rules={[
                    { required: true, message: 'Please input your email!' },
                    { type: 'email', message: 'The input is not valid E-mail!' }
                ]}>
                <antd_1.Input placeholder="youremail@example.com"/>
              </FormItem>
              <FormItem hasFeedback 
            // label="Password"
            name="password" rules={[
                    { required: true, message: 'Please input your password!' }
                ]}>
                <antd_1.Input type="password" placeholder="Password"/>
              </FormItem>
              <FormItem>
                <antd_1.Button type="primary" disabled={loginAuth.requesting} loading={loginAuth.requesting} htmlType="submit">
                  Sign in
                </antd_1.Button>
              </FormItem>
            </antd_1.Form>)}

          <p>
            <link_1.default href="/auth/forgot">
              <a style={{ float: 'right' }}>Forgot?</a>
            </link_1.default>
          </p>
        </div>
        <div className="footer">
          {siteName} <icons_1.CopyrightCircleOutlined />
          {` Copy right ${new Date().getFullYear()}`}
        </div>
      </react_1.Fragment>);
    }
}
Login.layout = 'public';
Login.authenticate = false;
const mapStates = (state) => ({
    loginAuth: state.auth.login,
    ui: state.ui
});
const mapDispatch = { login: actions_1.login };
exports.default = react_redux_1.connect(mapStates, mapDispatch)(Login);
