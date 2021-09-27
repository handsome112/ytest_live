"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const React = __importStar(require("react"));
const antd_1 = require("antd");
const moment_1 = __importDefault(require("moment"));
const utils_1 = require("@lib/utils");
const link_1 = __importDefault(require("next/link"));
const react_redux_1 = require("react-redux");
const actions_1 = require("src/redux/ui/actions");
const RegisterFrom = ({ onFinish, submiting, countries, error, singularTextModel }) => {
    const [form] = antd_1.Form.useForm();
    return (<antd_1.Form layout="vertical" form={form} onFinish={onFinish} name="performerRegisterForm" initialValues={{ country: undefined }}>
      <h1>Member register</h1>
      <antd_1.Form.Item name="dateOfBirth" rules={[
            {
                required: true,
                message: 'Please input your date of birth!'
            },
            {
                validator: (rule, value) => {
                    if (!value)
                        return Promise.resolve();
                    const years = moment_1.default().diff(value, 'years');
                    if (years >= 18) {
                        return Promise.resolve();
                    }
                    return Promise.reject(new Error('Minimum of 18 years'));
                }
            }
        ]}>
        <antd_1.DatePicker placeholder="Date of Birth"/>
      </antd_1.Form.Item>
      <antd_1.Form.Item name="gender">
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
      <antd_1.Form.Item name="firstName" rules={[
            {
                required: true,
                message: 'Please input your first name!'
            },
            {
                pattern: new RegExp('^[a-zA-Z0-9 ]*$'),
                message: 'Alphanumeric'
            },
            {
                whitespace: true,
                message: 'Please input your first name!'
            }
        ]}>
        <antd_1.Input placeholder="First Name"/>
      </antd_1.Form.Item>
      <antd_1.Form.Item name="lastName" rules={[
            {
                required: true,
                message: 'Please input your last name!'
            },
            {
                pattern: new RegExp('^[a-zA-Z0-9 ]*$'),
                message: 'Alphanumeric'
            },
            {
                whitespace: true,
                message: 'Please input your last name!'
            }
        ]}>
        <antd_1.Input placeholder="Last Name"/>
      </antd_1.Form.Item>
      <antd_1.Form.Item name="email" rules={[
            {
                required: true,
                message: 'Please input your E-mail!'
            },
            {
                type: 'email',
                message: 'The input is not valid E-mail!'
            }
        ]}>
        <antd_1.Input placeholder="E-mail"/>
      </antd_1.Form.Item>
      <antd_1.Form.Item name="phone" rules={[
            { min: 9 },
            { max: 14 },
            {
                pattern: new RegExp(/^[0-9\b\\+ ]+$/),
                message: 'The phone number is not in the correct format'
            }
        ]}>
        <antd_1.Input placeholder="Phone Number"/>
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
      <antd_1.Form.Item name="password" rules={[
            {
                required: true,
                message: 'Please input your password!'
            },
            {
                min: 6,
                max: 14,
                message: 'Passoword should be 6-14 characters'
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
      <antd_1.Form.Item name="country" rules={[{ required: true, message: 'Please input your country!' }]}>
        <antd_1.Select showSearch placeholder="Country">
          {countries.length > 0
            && countries.map((country) => (<antd_1.Select.Option value={country.name} key={country.code}>
                {country.name}
              </antd_1.Select.Option>))}
        </antd_1.Select>
      </antd_1.Form.Item>
      {error && (<antd_1.Alert description={utils_1.getResponseError(error)} type="error" message="Error"/>)}
      <antd_1.Form.Item>
        <antd_1.Button type="primary" htmlType="submit" loading={submiting} disabled={submiting} className="btn-submit">
          Register new account
        </antd_1.Button>
      </antd_1.Form.Item>
      <antd_1.Form.Item>
        Are you member?
        {' '}
        <link_1.default href="/auth/login/user">
          <a>Login</a>
        </link_1.default>
      </antd_1.Form.Item>
      <antd_1.Form.Item>
        Are you
        {' '}
        {singularTextModel || 'Performer'}
        ?
        {' '}
        <link_1.default href="/auth/register/model">
          <a>Signup now</a>
        </link_1.default>
      </antd_1.Form.Item>
    </antd_1.Form>);
};
const mapStateToProps = (state) => (Object.assign({}, state.ui));
const mapDispatchs = { updateUIValue: actions_1.updateUIValue };
exports.default = react_redux_1.connect(mapStateToProps, mapDispatchs)(RegisterFrom);
