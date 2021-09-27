"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DirectDepositSettingForm = void 0;
const react_1 = require("react");
const antd_1 = require("antd");
const input_item_list_1 = __importDefault(require("@components/common/base/input-item-list"));
const lib_1 = require("src/lib");
const { Group } = antd_1.Radio;
const DIRECT_DEPOSIT_TYPE = [
    { key: 'credit', name: 'Credit' },
    { key: 'savings', name: 'Savings' }
];
const radioStyle = {
    display: 'block',
    height: '30px',
    lineHeight: '30px'
};
const leftFormItem = [
    {
        name: 'depositFirstName',
        rules: [{ required: true, message: 'First name is requried' }],
        label: 'First Name',
        children: <antd_1.Input />
    },
    {
        name: 'depositLastName',
        rules: [{ required: true, message: 'Last name is requried' }],
        label: 'Last Name',
        children: <antd_1.Input />
    },
    {
        name: 'accountingEmail',
        rules: [
            { required: true, message: 'Account email is requried' },
            { type: 'email', message: 'Account email must be email' }
        ],
        label: 'Account Email',
        children: <antd_1.Input type="email"/>
    },
    {
        name: 'directBankName',
        rules: [{ required: true, message: 'Bnak name is requried' }],
        label: 'Bank Name',
        children: <antd_1.Input />
    },
    {
        name: 'accountType',
        rules: [{ required: true, message: 'Account type is requried' }],
        label: 'Account Type',
        children: (<Group>
        {DIRECT_DEPOSIT_TYPE.map((type) => (<antd_1.Radio style={radioStyle} value={type.key} key={type.key}>
            {type.name}
          </antd_1.Radio>))}
      </Group>)
    }
];
const rightInputFrom = [
    {
        name: 'accountNumber',
        rules: [{ required: true, message: 'Account number is requried' }],
        label: 'Account number',
        children: <antd_1.Input />
    },
    {
        name: 'routingNumber',
        rules: [{ required: true, message: 'Routing number is requried' }],
        label: 'Routing number',
        children: <antd_1.Input />
    }
];
const initFormValue = {
    depositFirstName: '',
    depositLastName: '',
    accountingEmail: '',
    directBankName: '',
    accountType: 'credit',
    accountNumber: '',
    routingNumber: ''
};
const DirectDepositSettingForm = ({ onFinish, paymentInformation, loading }) => {
    const [form] = antd_1.Form.useForm();
    react_1.useEffect(() => {
        form.setFieldsValue(paymentInformation);
    }, [paymentInformation]);
    return (<antd_1.Form {...lib_1.formItemLayout} form={form} layout="vertical" onFinish={onFinish} name="directDepositSettingForm" className="performerEditForm" initialValues={Object.assign({}, initFormValue)}>
      <antd_1.Row>
        <antd_1.Col xs={24} sm={12}>
          <input_item_list_1.default fields={leftFormItem}/>
        </antd_1.Col>
        <antd_1.Col xs={24} sm={12}>
          <input_item_list_1.default fields={rightInputFrom}/>
        </antd_1.Col>
      </antd_1.Row>
      <antd_1.Form.Item {...lib_1.tailFormItemLayout}>
        <antd_1.Button type="primary" htmlType="submit" loading={loading}>
          Save Change
        </antd_1.Button>
      </antd_1.Form.Item>
    </antd_1.Form>);
};
exports.DirectDepositSettingForm = DirectDepositSettingForm;
