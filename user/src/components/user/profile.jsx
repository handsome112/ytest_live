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
const moment_1 = __importDefault(require("moment"));
const api_request_1 = require("src/services/api-request");
const js_cookie_1 = __importDefault(require("js-cookie"));
const icons_1 = require("@ant-design/icons");
require("./profile.less");
const file_1 = require("@lib/file");
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
const UserProfile = ({ username, firstName, lastName, gender, onFinish, countries, email, country, phone, city, state, dateOfBirth, onChangeAvatar, uploadAvatarUrl, uploadedAvatar, avatarUploading, avatar, loading }) => {
    const [form] = antd_1.Form.useForm();
    const uploadButton = (<antd_1.Button type="dashed" loading={avatarUploading} disabled={avatarUploading} icon={<icons_1.UploadOutlined />}>
      Upload
    </antd_1.Button>);
    return (<antd_1.Form {...formItemLayout} form={form} onFinish={onFinish} name="performerRegisterForm" className="performerRegisterForm" initialValues={{
            dateOfBirth: moment_1.default(dateOfBirth),
            country,
            firstName,
            lastName,
            gender,
            email,
            avatar,
            username,
            phone,
            city,
            state
        }} layout="vertical">
      <antd_1.Row gutter={25}>
        <antd_1.Col sm={12} xs={24}>
          <antd_1.Form.Item name="username" label="Username" rules={[
            {
                required: true,
                message: 'Please input your username!'
            }
        ]}>
            <antd_1.Input disabled/>
          </antd_1.Form.Item>
          <antd_1.Form.Item name="gender" label="Sex">
            <antd_1.Select>
              <antd_1.Select.Option value="male" key="male">
                Male
              </antd_1.Select.Option>
              <antd_1.Select.Option value="female" key="female">
                Female
              </antd_1.Select.Option>
              <antd_1.Select.Option value="transgender" key="transgender">
                Transgender
              </antd_1.Select.Option>
            </antd_1.Select>
          </antd_1.Form.Item>
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
          <antd_1.Form.Item name="phone" label="Phone Number" rules={[
            { min: 9 },
            { max: 14 },
            {
                pattern: new RegExp(/^[0-9\b\\+ ]+$/),
                message: 'The phone number is not in the correct format'
            }
        ]}>
            <antd_1.Input placeholder="Phone Number"/>
          </antd_1.Form.Item>
        </antd_1.Col>
        <antd_1.Col sm={12} xs={24}>
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
            <antd_1.Input disabled placeholder="test@example.com"/>
          </antd_1.Form.Item>
          <antd_1.Form.Item name="dateOfBirth" label="Date of Birth" rules={[
            {
                required: true,
                message: 'Please input date of birth!'
            },
            {
                validator: (rule, value) => {
                    if (!value)
                        return Promise.resolve();
                    const years = moment_1.default().diff(value, 'years');
                    if (years >= 18) {
                        return Promise.resolve();
                    }
                    return Promise.reject(new Error('Minimum of 18 years'));
                }
            }
        ]}>
            <antd_1.DatePicker style={{ width: '100%' }}/>
          </antd_1.Form.Item>
          <antd_1.Form.Item name="country" label="Country" rules={[{ required: true, message: 'Please input your country!' }]}>
            <antd_1.Select showSearch>
              {countries.length > 0
            && countries.map((c) => (<antd_1.Select.Option value={c.name} key={c.code}>
                    {c.name}
                  </antd_1.Select.Option>))}
            </antd_1.Select>
          </antd_1.Form.Item>
          <antd_1.Form.Item name="state" label="State">
            <antd_1.Input placeholder="State Name"/>
          </antd_1.Form.Item>
          <antd_1.Form.Item name="city" label="City">
            <antd_1.Input placeholder="City Name"/>
          </antd_1.Form.Item>
          <antd_1.Form.Item label="Profile Avatar">
            <antd_1.Upload onChange={onChangeAvatar} accept="image/*" action={uploadAvatarUrl} headers={{
            Authorization: process.browser ? js_cookie_1.default.get(api_request_1.TOKEN) : ''
        }} name="avatar" showUploadList={false} beforeUpload={file_1.beforeAvatarUpload}>
              {avatar || uploadedAvatar ? (<div style={{ height: 60, width: 60, position: 'relative' }}>
                  <img src={uploadedAvatar || avatar} style={{ height: 60, width: 60, borderRadius: 30 }} alt=""/>
                  <icons_1.EditOutlined className="edit-icon"/>
                </div>) : (uploadButton)}
            </antd_1.Upload>
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
