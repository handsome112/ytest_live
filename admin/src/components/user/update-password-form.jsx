"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdatePaswordForm = void 0;
const react_1 = __importDefault(require("react"));
const antd_1 = require("antd");
const layout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 16 }
};
const UpdatePaswordForm = ({ onFinish, updating = false }) => {
    return (<antd_1.Form name="nest-messages" onFinish={onFinish.bind(this)} {...layout}>
      <antd_1.Form.Item name="password" label="Password" rules={[
            { required: true, message: 'Please input your password!' },
            {
                min: 6,
                max: 14,
                message: 'Passoword should be 6-14 characters'
            }
        ]}>
        <antd_1.Input.Password placeholder="Enter password. At least 6 characters"/>
      </antd_1.Form.Item>
      <antd_1.Form.Item wrapperCol={Object.assign(Object.assign({}, layout.wrapperCol), { offset: 4 })}>
        <antd_1.Button type="primary" htmlType="submit" loading={updating}>
          Update
        </antd_1.Button>
      </antd_1.Form.Item>
    </antd_1.Form>);
};
exports.UpdatePaswordForm = UpdatePaswordForm;
