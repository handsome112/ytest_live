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
const react_redux_1 = require("react-redux");
const actions_1 = require("src/redux/ui/actions");
const utils_1 = require("@lib/utils");
const icons_1 = require("@ant-design/icons");
const link_1 = __importDefault(require("next/link"));
const StudioRegisterForm = ({ onFinish, submiting, countries, error, errorMessage, singularTextModel }) => {
    const [documentVerification, setDocumentVerification] = React.useState('');
    const [form] = antd_1.Form.useForm();
    return (<antd_1.Form layout="vertical" form={form} onFinish={onFinish} name="studioRegisterForm" initialValues={{ country: undefined, gender: 'male' }}>
      <h1>Studio register</h1>
      <antd_1.Form.Item name="firstName" rules={[
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
      <antd_1.Form.Item name="name" rules={[
            {
                required: true,
                message: 'Please input your studio name!'
            },
            {
                pattern: new RegExp('^[a-zA-Z0-9 ]*$'),
                message: 'Alphanumeric'
            },
            {
                whitespace: true,
                message: 'Please input your studio name!'
            }
        ]}>
        <antd_1.Input placeholder="Studio Name"/>
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
      <antd_1.Form.Item name="documentVerification" rules={[
            {
                required: true,
                message: 'Verification document is required!'
            }
        ]}>
        <antd_1.Upload showUploadList={false} customRequest={() => true} fileList={[]} onChange={(files) => setDocumentVerification(files.file.name)}>
          <antd_1.Button>
            <icons_1.UploadOutlined />
            {' '}
            Upload Document For Verification
          </antd_1.Button>
          {documentVerification && (<span className="file-name">{documentVerification}</span>)}
        </antd_1.Upload>
      </antd_1.Form.Item>
      {error && (<antd_1.Form.Item>
          <antd_1.Alert description={utils_1.getResponseError(errorMessage)} type="error" message="Error"/>
        </antd_1.Form.Item>)}
      <antd_1.Form.Item>
        <antd_1.Button type="primary" htmlType="submit" loading={submiting} disabled={submiting} className="btn-submit">
          Register new account
        </antd_1.Button>
      </antd_1.Form.Item>
      <antd_1.Form.Item>
        Want to be a Member?
        {' '}
        <link_1.default href="/auth/register/user">
          <a>Signup here</a>
        </link_1.default>
      </antd_1.Form.Item>
      <antd_1.Form.Item>
        Are you a
        {' '}
        {singularTextModel || 'Performer'}
        ?
        {' '}
        <link_1.default href="/auth/login/performer">
          <a>Login here</a>
        </link_1.default>
      </antd_1.Form.Item>
      <antd_1.Form.Item>
        Are you a studio?
        {' '}
        <link_1.default href="/studio/login">
          <a>Login here</a>
        </link_1.default>
      </antd_1.Form.Item>
    </antd_1.Form>);
};
StudioRegisterForm.defaultProps = {
    submiting: false,
    singularTextModel: ''
};
const mapStateToProps = (state) => (Object.assign({}, state.ui));
const mapDispatchs = { updateUIValue: actions_1.updateUIValue };
exports.default = react_redux_1.connect(mapStateToProps, mapDispatchs)(StudioRegisterForm);
