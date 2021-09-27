"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WireTransferSettingForm = void 0;
/* eslint-disable no-nested-ternary */
const react_1 = require("react");
const antd_1 = require("antd");
const FormItem_1 = __importDefault(require("antd/lib/form/FormItem"));
const PAYMENT_INFO_CURRENCY = {
    eurEuro: 'EUR (Euro)',
    usdUnitedStatesDollars: 'USD (U.S Dollar)'
};
const { Item } = antd_1.Form;
const { Option } = antd_1.Select;
const initFormValue = {
    type: 'wireTransfer',
    withdrawCurrency: 'eurEuro',
    taxPayer: ''
};
const formItemLayout = {
    labelCol: {
        xs: {
            span: 24
        },
        sm: {
            span: 24
        }
    },
    wrapperCol: {
        xs: {
            span: 24
        },
        sm: {
            span: 20
        }
    }
};
const tailFormItemLayout = {
    wrapperCol: {
        xs: {
            span: 24,
            offset: 0
        },
        sm: {
            span: 16,
            offset: 0
        }
    }
};
const WireTransferSettingForm = ({ onFinish, loading, paymentInformation }) => {
    const [form] = antd_1.Form.useForm();
    react_1.useEffect(() => {
        form.setFieldsValue(paymentInformation);
    }, [paymentInformation]);
    return (<antd_1.Form {...formItemLayout} form={form} layout="vertical" onFinish={onFinish} name="paymentInfoSettingForm" className="performerEditForm" validateMessages={{ required: 'This field is required!' }} initialValues={Object.assign({}, initFormValue)}>
      <antd_1.Row>
        <antd_1.Col xs={24} sm={12}>
          <Item name="withdrawCurrency" key="withdrawCurrency" rules={[{ required: true }]} label="Withdraw Currency">
            <antd_1.Select>
              {Object.keys(PAYMENT_INFO_CURRENCY).map((key) => (<Option value={key} key={key}>
                  {PAYMENT_INFO_CURRENCY[key]}
                </Option>))}
            </antd_1.Select>
          </Item>
          <Item name="taxPayer" key="taxPayer" label="Taxpayer ID/SSN">
            <antd_1.Input />
          </Item>
          <Item name="bankName" key="bankName" label="Bank Name" dependencies={['type']} rules={[{ required: true }]}>
            <antd_1.Input />
          </Item>
          <Item name="bankAddress" key="bankAddress" label="Bank Address" dependencies={['type']} rules={[{ required: true }]}>
            <antd_1.Input />
          </Item>
          <Item name="bankSWIFTBICABA" key="bankSWIFTBICABA" label="Bank SWIFT-BIC/ABA" dependencies={['type']} rules={[{ required: true }]}>
            <antd_1.Input />
          </Item>
          <Item name="additionalInformation" key="additionalInformation" label="Additional Information">
            <antd_1.Input.TextArea />
          </Item>
        </antd_1.Col>
        <antd_1.Col xs={24} sm={12}>
          <Item name="bankCity" key="bankCity" label="Bank City" dependencies={['type']} rules={[{ required: true }]}>
            <antd_1.Input />
          </Item>
          <Item name="bankState" key="bankState" label="Bank State" dependencies={['type']} rules={[{ required: true }]}>
            <antd_1.Input />
          </Item>
          <Item name="bankZip" key="bankZip" label="Bank Zip" dependencies={['type']} rules={[{ required: true }]}>
            <antd_1.Input />
          </Item>
          <Item name="bankCountry" key="bankCountry" label="Bank Country" dependencies={['type']} rules={[{ required: true }]}>
            <antd_1.Input />
          </Item>
          <Item name="bankAcountNumber" key="bankAcountNumber" label="Bank Account Number" dependencies={['type']} rules={[{ required: true }]}>
            <antd_1.Input />
          </Item>
          <Item name="holderOfBankAccount" key="holderOfBankAccount" label="Primary Account Holder" dependencies={['type']} rules={[{ required: true }]}>
            <antd_1.Input />
          </Item>
        </antd_1.Col>
      </antd_1.Row>
      <FormItem_1.default {...tailFormItemLayout}>
        <antd_1.Button type="primary" htmlType="submit" loading={loading}>
          Save Change
        </antd_1.Button>
      </FormItem_1.default>
    </antd_1.Form>);
};
exports.WireTransferSettingForm = WireTransferSettingForm;
