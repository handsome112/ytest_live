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
const React = __importStar(require("react"));
const antd_1 = require("antd");
const countries_1 = __importDefault(require("@components/common/base/select/countries"));
require("./index.less");
const formItemLayout = {
    labelCol: {
        xs: {
            span: 24
        },
        sm: {
            span: 4
        }
    },
    wrapperCol: {
        xs: {
            span: 24
        },
        sm: {
            span: 16
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
const UserProfile = ({ firstName, lastName, onFinish, email, country, phone, city, loading, address, zipcode, state, countries }) => {
    const [form] = antd_1.Form.useForm();
    return (<antd_1.Form {...formItemLayout} form={form} onFinish={onFinish} name="contactSettingForm" className="performerEditForm" initialValues={{
            country,
            firstName,
            lastName,
            email,
            phone,
            city,
            address,
            zipcode,
            state
        }} layout="vertical">
      <antd_1.Row gutter={25}>
        <antd_1.Col sm={12} xs={24}>
          <antd_1.Form.Item name="firstName" label="First Name" rules={[
            {
                pattern: new RegExp('^[a-zA-Z0-9 ]*$'),
                message: 'Alphanumeric'
            },
            {
                whitespace: true,
                message: 'Please input your first name!'
            },
            {
                required: true,
                message: 'Please input your first name!'
            }
        ]}>
            <antd_1.Input placeholder="First name"/>
          </antd_1.Form.Item>
          <antd_1.Form.Item name="lastName" label="Last Name" rules={[
            {
                pattern: new RegExp('^[a-zA-Z0-9 ]*$'),
                message: 'Alphanumeric'
            },
            {
                whitespace: true,
                message: 'Please input your last name!'
            },
            {
                required: true,
                message: 'Please input your first name!'
            }
        ]}>
            <antd_1.Input placeholder="Last name"/>
          </antd_1.Form.Item>
          <antd_1.Form.Item name="country" label="Country" rules={[{ required: true, message: 'Please input your country!' }]}>
            <countries_1.default defaultValue={country} countries={countries}/>
          </antd_1.Form.Item>
          <antd_1.Form.Item name="state" label="State Name">
            <antd_1.Input placeholder="samplestate"/>
          </antd_1.Form.Item>
          <antd_1.Form.Item name="city" label="City">
            <antd_1.Input placeholder="samplecity"/>
          </antd_1.Form.Item>
        </antd_1.Col>
        <antd_1.Col sm={12} xs={24}>
          <antd_1.Form.Item name="zipcode" label="Zip">
            <antd_1.Input placeholder="012345-678"/>
          </antd_1.Form.Item>
          <antd_1.Form.Item name="address" label="Address">
            <antd_1.Input placeholder="Address"/>
          </antd_1.Form.Item>
          <antd_1.Form.Item name="email" label="E-mail" rules={[
            {
                type: 'email',
                message: 'The input is not valid E-mail!'
            },
            {
                required: true,
                message: 'Please input your E-mail!'
            }
        ]}>
            <antd_1.Input placeholder="test@example.com"/>
          </antd_1.Form.Item>
          <antd_1.Form.Item name="phone" label="Mobile Phone" rules={[
            {
                min: 8,
                max: 14,
                message: '8-14 digits'
            }
        ]}>
            <antd_1.Input placeholder="+18000 0000"/>
          </antd_1.Form.Item>
        </antd_1.Col>
      </antd_1.Row>
      <antd_1.Form.Item {...tailFormItemLayout}>
        <antd_1.Button type="primary" htmlType="submit" disabled={loading} loading={loading}>
          Save Changes
        </antd_1.Button>
      </antd_1.Form.Item>
    </antd_1.Form>);
};
exports.default = UserProfile;
