"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateBalanceForm = void 0;
const react_1 = __importDefault(require("react"));
const antd_1 = require("antd");
const layout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 16 }
};
const UpdateBalanceForm = ({ onFinish, balance, updating = false }) => {
    return (<antd_1.Form name="nest-messages" onFinish={onFinish.bind(this)} {...layout} initialValues={{
            balance
        }}>
      <antd_1.Form.Item name="balance" label="Balance" rules={[
            { required: true, message: 'Enter balance you want to update!' }
        ]}>
        <antd_1.InputNumber />
      </antd_1.Form.Item>
      <antd_1.Form.Item wrapperCol={Object.assign(Object.assign({}, layout.wrapperCol), { offset: 4 })}>
        <antd_1.Button type="primary" htmlType="submit" loading={updating}>
          Update
        </antd_1.Button>
      </antd_1.Form.Item>
    </antd_1.Form>);
};
exports.UpdateBalanceForm = UpdateBalanceForm;
