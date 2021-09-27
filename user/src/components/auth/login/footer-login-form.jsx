"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const link_1 = __importDefault(require("next/link"));
const antd_1 = require("antd");
const { Item: FormItem } = antd_1.Form;
const FormFooterLogin = ({ account, singularTextModel }) => (<antd_1.Row>
    <antd_1.Col span={24}>
      {account !== 'studio' && account === 'user' ? (<FormItem>
          Want to be a Member?
          {' '}
          <link_1.default href="/auth/register/user">
            <a>Signup here</a>
          </link_1.default>
        </FormItem>)
        : account === 'performer' && (<FormItem>
          Want to be a
          {' '}
          {singularTextModel || 'Performer'}
          ?
          {' '}
          <link_1.default href="/auth/register/model">
            <a>Signup here</a>
          </link_1.default>
        </FormItem>)}
      {account === 'studio' && (<FormItem>
        {'Don\'t have account yet? '}
        <link_1.default href="/studio/register">
          <a>Signup now</a>
        </link_1.default>
      </FormItem>)}
    </antd_1.Col>
    <antd_1.Col span={24}>
      {account === 'user' && (<FormItem>
        Are you a
        {' '}
        {singularTextModel || 'Performer'}
        ?
        {' '}
        <link_1.default href="/auth/login/performer">
          <a>Login here</a>
        </link_1.default>
      </FormItem>)}
      {account === 'performer' && (<FormItem>
        Are you a Member?
        {' '}
        <link_1.default href="/auth/login/user">
          <a>Login here</a>
        </link_1.default>
      </FormItem>)}
    </antd_1.Col>
  </antd_1.Row>);
FormFooterLogin.defaultProps = {
    singularTextModel: 'Performer'
};
exports.default = FormFooterLogin;
