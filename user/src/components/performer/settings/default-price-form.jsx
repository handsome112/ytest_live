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
    {
        name: 'privateCallPrice',
        rules: [
            {
                validator: (_, value) => new Promise((resolve, reject) => {
                    if (parseInt(value, 10) > 0)
                        return resolve(null);
                    return reject(new Error('The price must be greater than 0!'));
                })
            }
        ],
        label: 'Private call tokens/minute',
        children: <antd_1.InputNumber type="number"/>
    },
    {
        name: 'groupCallPrice',
        rules: [
            {
                validator: (_, value) => new Promise((resolve, reject) => {
                    if (parseInt(value, 10) > 0)
                        return resolve(null);
                    return reject(new Error('The price must be greater than 0!'));
                })
            }
        ],
        label: 'Group call tokens/minute',
        children: <antd_1.InputNumber type="number"/>
    }
];
const initFormValue = {
    privateCallPrice: 0,
    groupCallPrice: 0
};
exports.default = ({ onFinish, privateCallPrice, groupCallPrice, loading }) => {
    const [form] = antd_1.Form.useForm();
    return (<antd_1.Form {...lib_1.formItemLayout} form={form} layout="vertical" onFinish={onFinish} name="defaultPriceForm" className="performerEditForm" initialValues={Object.assign(Object.assign({}, initFormValue), { privateCallPrice, groupCallPrice })}>
      <input_item_list_1.default fields={leftFormItem}/>
      <antd_1.Form.Item {...lib_1.tailFormItemLayout}>
        <antd_1.Button type="primary" htmlType="submit" loading={loading}>
          Save Change
        </antd_1.Button>
      </antd_1.Form.Item>
    </antd_1.Form>);
};
