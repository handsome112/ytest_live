"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.IssueCheckUSSetingForm = void 0;
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
const IssueCheckUSSetingForm = ({ onFinish, paymentInformation, loading }) => {
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
          <Item name="checkPayable" key="checkPayable" label="Check Payable To" dependencies={['type']} rules={[{ required: true }]}>
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
exports.IssueCheckUSSetingForm = IssueCheckUSSetingForm;
