"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const antd_1 = require("antd");
const utils_1 = require("@lib/utils");
const router_1 = __importDefault(require("next/router"));
const react_1 = __importDefault(require("react"));
const StudioAddModelForm = ({ loading, error, message, onFinish }) => {
    const [form] = antd_1.Form.useForm();
    return (<antd_1.Form form={form} name="studioAddModelForm" onFinish={onFinish} scrollToFirstError style={{ margin: 'auto', textAlign: 'center', maxWidth: '400px' }}>
      <antd_1.Form.Item name="firstName" rules={[
            { required: true, message: 'Please input first name!' },
            {
                pattern: new RegExp('^[a-zA-Z0-9 ]*$'),
                message: 'Alphanumeric'
            },
            {
                whitespace: true,
                message: 'Please input first name!'
            }
        ]}>
        <antd_1.Input placeholder="Model's first name"/>
      </antd_1.Form.Item>
      <antd_1.Form.Item name="lastName" rules={[
            { required: true, message: 'Please input last name!' },
            {
                pattern: new RegExp('^[a-zA-Z0-9 ]*$'),
                message: 'Alphanumeric'
            },
            {
                whitespace: true,
                message: 'Please input last name!'
            }
        ]}>
        <antd_1.Input placeholder="Model's last name"/>
      </antd_1.Form.Item>
      <antd_1.Form.Item name="username" rules={[
            {
                required: true,
                message: 'Username is required!'
            },
            {
                pattern: new RegExp('^[a-zA-Z0-9]*$'),
                message: 'Dont allow special chars or space'
            }
        ]}>
        <antd_1.Input placeholder="Username"/>
      </antd_1.Form.Item>
      <antd_1.Form.Item name="email" rules={[
            {
                type: 'email',
                message: 'The input is not valid E-mail!'
            },
            {
                required: true,
                message: 'Please input your E-mail!'
            }
        ]}>
        <antd_1.Input placeholder="E-mail"/>
      </antd_1.Form.Item>
      <antd_1.Form.Item name="gender" rules={[{ required: true, message: 'Please select your gender!' }]}>
        <antd_1.Select placeholder="Gender">
          <antd_1.Select.Option value="male" key="male">
            Male
          </antd_1.Select.Option>
          <antd_1.Select.Option value="female" key="female">
            Female
          </antd_1.Select.Option>
          <antd_1.Select.Option value="transgender" key="transgender">
            Transgender
          </antd_1.Select.Option>
        </antd_1.Select>
      </antd_1.Form.Item>
      <antd_1.Form.Item name="password" rules={[
            {
                required: true,
                message: 'Please input your password!'
            },
            {
                min: 6,
                max: 14,
                message: '6-14 characters'
            }
        ]} hasFeedback>
        <antd_1.Input.Password placeholder="Password"/>
      </antd_1.Form.Item>
      <antd_1.Form.Item name="confirm" dependencies={['password']} hasFeedback rules={[
            {
                required: true,
                message: 'Please confirm your password!'
            },
            ({ getFieldValue }) => ({
                validator(rule, value) {
                    if (!value || getFieldValue('password') === value) {
                        return Promise.resolve();
                    }
                    return Promise.reject(new Error('The two passwords that you entered do not match!'));
                }
            })
        ]}>
        <antd_1.Input.Password placeholder="Confirm Password"/>
      </antd_1.Form.Item>
      {error && (<antd_1.Form.Item>
          <antd_1.Alert description={utils_1.getResponseError(message)} type="error" message="Error"/>
        </antd_1.Form.Item>)}
      <antd_1.Form.Item style={{ textAlign: 'right' }}>
        <antd_1.Space>
          <antd_1.Button type="primary" onClick={() => router_1.default.push('/studio/models')} className="btn-submit">
            Cancel
          </antd_1.Button>
          <antd_1.Button type="primary" htmlType="submit" loading={loading} disabled={loading} className="btn-submit">
            Create
          </antd_1.Button>
        </antd_1.Space>
      </antd_1.Form.Item>
    </antd_1.Form>);
};
exports.default = StudioAddModelForm;
