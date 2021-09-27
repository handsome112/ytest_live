"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const link_1 = __importDefault(require("next/link"));
const antd_1 = require("antd");
const utils_1 = require("@lib/utils");
const react_redux_1 = require("react-redux");
const rules_1 = require("@lib/rules");
const footer_login_form_1 = __importDefault(require("./footer-login-form"));
const FormItem = antd_1.Form.Item;
const LoginForm = ({ requesting, submit, error, success, onRemember, singularTextModel }) => {
    const [form] = antd_1.Form.useForm();
    const onPressEnter = async () => {
        form.submit();
    };
    return (<antd_1.Form layout="vertical" onFinish={submit}>
      <h1>
        {singularTextModel || 'Performer'}
        {' '}
        Sign In
      </h1>
      <FormItem hasFeedback label="Username" name="username" rules={[
            {
                required: true,
                message: 'Please input your username!'
            },
            rules_1.usernamePatternRule
        ]}>
        <antd_1.Input onPressEnter={onPressEnter} placeholder="Username"/>
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
                    ? 'Your account is deactivated'
                    : utils_1.getResponseError(error)} type="error" showIcon/>)}
          {success && (<antd_1.Alert message="Login success" type="success" description="Redirecting..."/>)}
        </FormItem>)}
      <FormItem className="row-button-auth">
        <antd_1.Button type="primary" htmlType="submit" disabled={requesting} loading={requesting}>
          Sign in
        </antd_1.Button>
      </FormItem>
      <footer_login_form_1.default account="performer" singularTextModel={singularTextModel}/>
    </antd_1.Form>);
};
const mapStates = (state) => (Object.assign({}, state.ui));
LoginForm.defaultProps = {
    singularTextModel: ''
};
exports.default = react_redux_1.connect(mapStates)(LoginForm);
