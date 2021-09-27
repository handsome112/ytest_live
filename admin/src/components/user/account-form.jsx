"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AccountForm = void 0;
const react_1 = require("react");
const antd_1 = require("antd");
const avatar_upload_1 = require("@components/user/avatar-upload");
const moment_1 = __importDefault(require("moment"));
const env_1 = __importDefault(require("../../env"));
const layout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 16 }
};
const validateMessages = {
    required: 'This field is required!',
    types: {
        email: 'Not a validate email!',
        number: 'Not a validate number!'
    },
    number: {
        range: 'Must be between ${min} and ${max}'
    }
};
class AccountForm extends react_1.PureComponent {
    render() {
        const { onFinish, user, updating, countries } = this.props;
        const { uploadHeaders, avatarUploadUrl, onAvatarUploaded, beforeUpload } = this.props.options;
        return (<antd_1.Form {...layout} name="nest-messages" onFinish={onFinish.bind(this)} validateMessages={validateMessages} initialValues={user
                ? Object.assign(Object.assign({}, user), { dateOfBirth: moment_1.default(user.dateOfBirth) }) : {
                country: 'US',
                status: 'active',
                gender: 'male',
                roles: ['user']
            }}>
        <antd_1.Form.Item name="firstName" label="First name" rules={[{ required: true }]}>
          <antd_1.Input />
        </antd_1.Form.Item>
        <antd_1.Form.Item name="lastName" label="Last name" rules={[{ required: true }]}>
          <antd_1.Input />
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
                        return Promise.reject('Minimum of 18 years');
                    }
                }
            ]}>
          <antd_1.DatePicker style={{ width: '100%' }}/>
        </antd_1.Form.Item>
        <antd_1.Form.Item name="gender" label="Gender" rules={[{ required: true }]}>
          <antd_1.Select>
            <antd_1.Select.Option key="male" value="male">
              Male
            </antd_1.Select.Option>
            <antd_1.Select.Option key="female" value="female">
              Female
            </antd_1.Select.Option>
            <antd_1.Select.Option key="transgender" value="transgender">
              Transgender
            </antd_1.Select.Option>
          </antd_1.Select>
        </antd_1.Form.Item>
        <antd_1.Form.Item name="phone" label="Phone Number" rules={[
                { min: 9 },
                { max: 14 },
                {
                    pattern: /^[0-9\b\+ ]+$/,
                    message: 'The phone number is not in the correct format'
                }
            ]}>
          <antd_1.Input style={{ width: '100%' }}/>
        </antd_1.Form.Item>
        <antd_1.Form.Item name="username" label="Username" rules={[{ required: true }, { min: 3 }]}>
          <antd_1.Input placeholder="Unique, lowercase and number, no space or special chars"/>
        </antd_1.Form.Item>
        <antd_1.Form.Item name="email" label="Email" rules={[{ type: 'email', required: true }]}>
          <antd_1.Input />
        </antd_1.Form.Item>
        {!user && (<react_1.Fragment>
            <antd_1.Form.Item name="password" label="Password" rules={[{ required: true }, { min: 6 }]}>
              <antd_1.Input.Password placeholder="User password"/>
            </antd_1.Form.Item>
            <antd_1.Form.Item name="rePassword" label="Confirm password" rules={[{ required: true }, { min: 6 }]}>
              <antd_1.Input.Password placeholder="Confirm user password"/>
            </antd_1.Form.Item>
          </react_1.Fragment>)}
        <antd_1.Form.Item name="country" label="Country" rules={[{ required: true }]}>
          <antd_1.Select showSearch filterOption={(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}>
            {countries.map((country) => (<antd_1.Select.Option key={country.code} value={country.code}>
                {country.name}
              </antd_1.Select.Option>))}
          </antd_1.Select>
        </antd_1.Form.Item>
        <react_1.Fragment>
          <antd_1.Form.Item name="balance" label="Balance">
            <antd_1.InputNumber />
          </antd_1.Form.Item>
          <antd_1.Form.Item name="roles" label="Roles" rules={[{ required: true }]}>
            <antd_1.Select mode="multiple">
              <antd_1.Select.Option key="user" value="user">
                User
                </antd_1.Select.Option>
              <antd_1.Select.Option key="admin" value="admin">
                Admin
                </antd_1.Select.Option>
            </antd_1.Select>
          </antd_1.Form.Item>
          <antd_1.Form.Item name="emailVerified" label="Verified Email" valuePropName="checked">
            <antd_1.Switch />
          </antd_1.Form.Item>
        </react_1.Fragment>
        <antd_1.Form.Item name="status" label="Status" rules={[{ required: true }]}>
          <antd_1.Select>
            <antd_1.Select.Option key="active" value="active">
              Active
            </antd_1.Select.Option>
            <antd_1.Select.Option key="inactive" value="inactive">
              Inactive
            </antd_1.Select.Option>
          </antd_1.Select>
        </antd_1.Form.Item>
        <antd_1.Form.Item label="Avatar" help={`Image must smaller than ${env_1.default.maximumSizeUploadImage || 2}MB! Only accept ${env_1.default.imageAccept}.`}>
          {/* <Avatar alt="Avatar" /> */}
          <avatar_upload_1.AvatarUpload headers={uploadHeaders} uploadUrl={avatarUploadUrl} onUploaded={onAvatarUploaded} imageUrl={user ? user.avatar : ''} uploadNow={user ? true : false} beforeUpload={beforeUpload}/>
        </antd_1.Form.Item>
        <antd_1.Form.Item wrapperCol={Object.assign(Object.assign({}, layout.wrapperCol), { offset: 4 })}>
          <antd_1.Button type="primary" htmlType="submit" loading={updating}>
            Submit
          </antd_1.Button>
        </antd_1.Form.Item>
      </antd_1.Form>);
    }
}
exports.AccountForm = AccountForm;
