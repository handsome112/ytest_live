"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("../index.less");
const react_1 = require("react");
const antd_1 = require("antd");
const head_1 = __importDefault(require("next/head"));
const page_1 = __importDefault(require("@components/common/layout/page"));
const lib_1 = require("src/lib");
const services_1 = require("src/services");
const react_redux_1 = require("react-redux");
const layout_1 = require("@components/common/layout");
class ResendVeryficationEmail extends react_1.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            submiting: false,
            error: false,
            errorMessage: ''
        };
    }
    async submit(data) {
        try {
            this.setState({ error: false, errorMessage: '' });
            await services_1.authService.resendVerificationEmail(data);
            antd_1.message.success('Verification email have been sent. Please check your inbox or spam box!');
        }
        catch (e) {
            const error = await Promise.resolve(e);
            this.setState({ error: true, errorMessage: lib_1.getResponseError(error) });
        }
    }
    render() {
        const { submiting, error, errorMessage } = this.state;
        const { ui } = this.props;
        return (<>
        <head_1.default>
          <title>Resend Verification Email</title>
        </head_1.default>
        <page_1.default className="register-page resend-verification-email-page" inner>
          <div className="form-register-container">
            <antd_1.Form onFinish={this.submit.bind(this)} layout="vertical" validateMessages={lib_1.validateMessages}>
              <h1>Resend Verification Email</h1>
              <antd_1.Form.Item name="email" rules={[
                { required: true, message: 'Please input your email!' },
                { type: 'email', message: 'The input is not valid E-mail!' }
            ]}>
                <antd_1.Input type="email" placeholder="E-mail"/>
              </antd_1.Form.Item>
              <antd_1.Form.Item name="source" rules={[{ required: true }]}>
                <antd_1.Select placeholder="You are?">
                  <antd_1.Select.Option value="user">User</antd_1.Select.Option>
                  <antd_1.Select.Option value="performer">Performer</antd_1.Select.Option>
                  <antd_1.Select.Option value="studio">Studio</antd_1.Select.Option>
                </antd_1.Select>
              </antd_1.Form.Item>
              {error && (<antd_1.Form.Item>
                  <antd_1.Alert showIcon type="error" description={errorMessage} message="Error"/>
                </antd_1.Form.Item>)}
              <antd_1.Form.Item>
                <antd_1.Button type="primary" htmlType="submit" loading={submiting} disabled={submiting}>
                  Submit
                </antd_1.Button>
              </antd_1.Form.Item>
            </antd_1.Form>
          </div>
          <layout_1.FormRegisterPlaceHolder ui={ui}/>
        </page_1.default>
      </>);
    }
}
ResendVeryficationEmail.layout = 'auth';
const mapStateToProps = (state) => ({ ui: state.ui });
exports.default = react_redux_1.connect(mapStateToProps)(ResendVeryficationEmail);
