"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdatePaswordForm = void 0;
const react_1 = __importDefault(require("react"));
const antd_1 = require("antd");
const UpdatePaswordForm = ({ onFinish, updating = false }) => (<antd_1.Form name="nest-messages" onFinish={onFinish.bind(this)}>
    <antd_1.Form.Item name="password" label="Password" rules={[{ required: true, message: 'Please input your password!', min: 6 }]}>
      <antd_1.Input.Password placeholder="Enter password. At least 6 characters"/>
    </antd_1.Form.Item>
    <antd_1.Form.Item wrapperCol={{ offset: 4 }}>
      <antd_1.Button type="primary" htmlType="submit" disabled={updating} loading={updating}>
        Update
      </antd_1.Button>
    </antd_1.Form.Item>
  </antd_1.Form>);
exports.UpdatePaswordForm = UpdatePaswordForm;
