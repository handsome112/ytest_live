"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// import { useState } from 'react';
const link_1 = __importDefault(require("next/link"));
const antd_1 = require("antd");
const utils_1 = require("@lib/utils");
const react_redux_1 = require("react-redux");
const actions_1 = require("src/redux/ui/actions");
const footer_login_form_1 = __importDefault(require("./footer-login-form"));
const FormItem = antd_1.Form.Item;
const LoginForm = ({ requesting, submit, error, success, onRemember, singularTextModel }) => {
    const [form] = antd_1.Form.useForm();
    const onPressEnter = () => {
        form.submit();
    };
    return (<antd_1.Form layout="vertical" onFinish={submit}>
      <h1>User Sign In</h1>
      <FormItem hasFeedback label="Email" name="email" rules={[
            { type: 'email', message: 'The input is not valid E-mail!' },
            { required: true, message: 'Please input your email!' }
        ]}>
        <antd_1.Input onPressEnter={onPressEnter} placeholder="youremail@example.com"/>
      </FormItem>
      <FormItem hasFeedback label={(<antd_1.Space>
            <span>Password</span>
          </antd_1.Space>)} className="input-password" name="password" rules={[
            { required: true, message: 'Please input your password!' },
            {
                min: 6,
                max: 14,
                message: '6-14 characters'
            }
        ]}>
        <antd_1.Input.Password onPressEnter={onPressEnter} placeholder="Password"/>
      </FormItem>
      <div style={{
            display: 'flex', justifyContent: 'space-between', width: '100%', margin: '15px 0'
        }}>
        <antd_1.Checkbox onChange={(e) => onRemember(e.target.checked)}>Remember me</antd_1.Checkbox>
        <link_1.default href="/auth/forgot-password">
          <a>Forgot password?</a>
        </link_1.default>
      </div>
      {(error || success) && (<FormItem>
          {error && (<antd_1.Alert message="Error" description={error.message && error.message === 'ACCOUNT_INACTIVE'
                    ? 'You do not have permission'
                    : utils_1.getResponseError(error)} type="error" showIcon/>)}
          {success && (<antd_1.Alert message="Login success" type="success" description="Redirecting..."/>)}
        </FormItem>)}
      <FormItem className="row-button-auth">
        <antd_1.Button type="primary" htmlType="submit" disabled={requesting} loading={requesting}>
          Sign in
        </antd_1.Button>
      </FormItem>
      <footer_login_form_1.default account="user" singularTextModel={singularTextModel}/>
    </antd_1.Form>);
};
const mapStates = (state) => (Object.assign({}, state.ui));
const mapDispatch = { updateUIValue: actions_1.updateUIValue };
exports.default = react_redux_1.connect(mapStates, mapDispatch)(LoginForm);
