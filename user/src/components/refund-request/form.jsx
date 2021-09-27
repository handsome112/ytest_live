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
/* eslint-disable no-return-assign */
/* eslint-disable @typescript-eslint/no-unused-vars */
const React = __importStar(require("react"));
const antd_1 = require("antd");
const router_1 = __importDefault(require("next/router"));
const lib_1 = require("src/lib");
const input_item_list_1 = __importDefault(require("@components/common/base/input-item-list"));
const initialValues = {
    description: '',
    sourceId: '',
    sourceType: 'order',
    performerId: '',
    token: 0
};
const RefundRequestForm = ({ onFinish, loading, performers, products, onChangePerformer }) => {
    let selectPerformerRef;
    let selectProductRef;
    const [form] = antd_1.Form.useForm();
    const performerSelectOptions = performers && performers.map((per) => ({
        label: per.username,
        value: per._id
    }));
    const productSelectOptions = products && products.map((prod) => ({
        label: `${prod.productsInfo && prod.productsInfo[0] ? prod.productsInfo[0].name : 'N/A'} - ${prod.orderNumber}`,
        value: prod._id
    }));
    const leftFormItem = [
        {
            name: 'performerId',
            label: 'Performer',
            rules: [
                {
                    required: true,
                    message: 'Please select performer!'
                }
            ],
            children: (<antd_1.Select showSearch optionFilterProp="label" ref={(ref) => (selectPerformerRef = ref)} placeholder="Please Select Performer" options={performerSelectOptions} onChange={(value) => { form.setFieldsValue({ sourceId: '' }); onChangePerformer(value); }} dropdownRender={(menu) => (<>
              {menu}
            </>)}/>)
        },
        {
            name: 'description',
            label: 'Description',
            children: <antd_1.Input.TextArea placeholder="Enter Description"/>
        }
    ];
    const rightInputFrom = [
        {
            name: 'sourceId',
            label: 'Product',
            rules: [
                {
                    required: true,
                    message: 'Please select product!'
                }
            ],
            children: (<antd_1.Select showSearch optionFilterProp="label" ref={(ref) => (selectProductRef = ref)} placeholder="Please Select Product" options={productSelectOptions} onChange={(value) => {
                    const prod = products.find((p) => p._id === value);
                    prod && form.setFieldsValue({ token: prod.totalPrice });
                }} dropdownRender={(menu) => (<>
              {menu}
            </>)}/>)
        },
        {
            name: 'token',
            label: 'Token',
            rules: [
                {
                    required: true,
                    message: 'Please input product token!'
                }
            ],
            children: (<antd_1.InputNumber min={1} disabled/>)
        }
    ];
    return (<antd_1.Form {...lib_1.formItemLayout} form={form} onFinish={onFinish} name="productsForm" className="product-form" initialValues={Object.assign({}, initialValues)} layout="vertical">
      <antd_1.Row gutter={25}>
        <antd_1.Col sm={12} xs={24} md={12} lg={12}>
          <input_item_list_1.default fields={leftFormItem}/>
        </antd_1.Col>
        <antd_1.Col sm={12} xs={24} md={12} lg={12}>
          <input_item_list_1.default fields={rightInputFrom}/>
        </antd_1.Col>
      </antd_1.Row>
      <antd_1.Form.Item {...lib_1.tailFormItemLayout}>
        <antd_1.Space>
          <antd_1.Button type="primary" htmlType="submit" disabled={loading} loading={loading}>
            Save Changes
          </antd_1.Button>
          <antd_1.Button type="primary" onClick={() => router_1.default.push('/account/user/refund-request')}>
            Back
          </antd_1.Button>
        </antd_1.Space>
      </antd_1.Form.Item>
    </antd_1.Form>);
};
RefundRequestForm.defaultProps = {
    performers: [],
    products: []
};
exports.default = RefundRequestForm;
