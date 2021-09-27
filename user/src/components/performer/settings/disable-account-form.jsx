"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const antd_1 = require("antd");
const input_item_list_1 = __importDefault(require("@components/common/base/input-item-list"));
const lib_1 = require("src/lib");
const leftFormItem = [
    // {
    //   name: 'suspendReason',
    //   rules: [
    //     { required: true, message: 'The suspension reason is requried' },
    //     { max: 250, message: 'Max 250 words' }
    //   ],
    //   label: 'Suspension Reason',
    //   children: <Input.TextArea />
    // },
    {
        name: 'password',
        rules: [{ required: true, message: 'Password is requried' }],
        label: 'Enter your password',
        children: <antd_1.Input.Password placeholder="Password"/>
    },
    {
        name: 'confirmation',
        valuePropName: 'checked',
        rules: [{ required: true, message: 'The confirmation is requried' }],
        children: <antd_1.Checkbox>I am sure that i want to suspend my account.</antd_1.Checkbox>
    }
];
exports.default = ({ loading, onFinish }) => {
    const [form] = antd_1.Form.useForm();
    return (<antd_1.Form {...lib_1.formItemLayout} form={form} layout="vertical" onFinish={onFinish.bind(this)} name="disableAccountForm" className="performerEditForm">
      <input_item_list_1.default fields={leftFormItem}/>
      <antd_1.Form.Item {...lib_1.tailFormItemLayout}>
        <antd_1.Button type="primary" htmlType="submit" loading={loading}>
          Save Change
        </antd_1.Button>
      </antd_1.Form.Item>
    </antd_1.Form>);
};
