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
Object.defineProperty(exports, "__esModule", { value: true });
const React = __importStar(require("react"));
const antd_1 = require("antd");
const formItemLayout = {
    labelCol: {
        xs: {
            span: 24
        },
        sm: {
            span: 12
        }
    },
    wrapperCol: {
        xs: {
            span: 24
        },
        sm: {
            span: 12
        }
    }
};
const PasswordChange = ({ onFinish, submiting }) => (<antd_1.Form layout="vertical" onFinish={onFinish} {...formItemLayout}>
    <antd_1.Form.Item name="prePassword" label="Old Password" rules={[
        {
            required: true,
            message: 'Please input your old password!'
        },
        {
            min: 6,
            max: 14,
            message: '6-14 characters'
        }
    ]} hasFeedback>
      <antd_1.Input.Password placeholder="Old Password"/>
    </antd_1.Form.Item>
    <antd_1.Form.Item name="password" label="New Password" rules={[
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
    <antd_1.Form.Item name="confirm" dependencies={['password']} hasFeedback label="Retype password" rules={[
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
    <antd_1.Form.Item>
      <antd_1.Button type="primary" htmlType="submit" loading={submiting} disabled={submiting} className="btn-submit">
        Save Changes
      </antd_1.Button>
    </antd_1.Form.Item>
  </antd_1.Form>);
PasswordChange.defaultProps = {
    submiting: false
};
exports.default = PasswordChange;
