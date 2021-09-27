"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BitpaySettigForm = void 0;
const react_1 = require("react");
const antd_1 = require("antd");
const input_item_list_1 = __importDefault(require("@components/common/base/input-item-list"));
const lib_1 = require("src/lib");
const leftFormItem = [
    {
        name: 'bitpayName',
        rules: [{ required: true, message: 'Name is requried' }],
        label: 'Name',
        children: <antd_1.Input />
    },
    {
        name: 'bitpayEmail',
        rules: [
            { required: true, message: 'Account email is requried' },
            { type: 'email', message: 'Account email must be email' }
        ],
        label: 'Email',
        children: <antd_1.Input type="email"/>
    },
    {
        name: 'bitpayAdditionalInformation',
        rules: [{ required: true, message: 'Name is requried' }],
        label: 'Additional Information',
        children: <antd_1.Input />
    }
];
const initFormValue = {
    bitpayName: '',
    bitpayEmail: '',
    bitpayAdditionalInformation: ''
};
const BitpaySettigForm = ({ onFinish, paymentInformation, loading }) => {
    const [form] = antd_1.Form.useForm();
    react_1.useEffect(() => {
        form.setFieldsValue(paymentInformation);
    }, [paymentInformation]);
    return (<antd_1.Form {...lib_1.formItemLayout} form={form} layout="vertical" onFinish={onFinish} name="bitpaySettingForm" className="performerEditForm" initialValues={Object.assign({}, initFormValue)}>
      <input_item_list_1.default fields={leftFormItem}/>
      <antd_1.Form.Item {...lib_1.tailFormItemLayout}>
        <antd_1.Button type="primary" htmlType="submit" loading={loading}>
          Save Change
        </antd_1.Button>
      </antd_1.Form.Item>
    </antd_1.Form>);
};
exports.BitpaySettigForm = BitpaySettigForm;
