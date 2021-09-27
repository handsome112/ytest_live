"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AccountForm = void 0;
const react_1 = require("react");
const antd_1 = require("antd");
const avatar_upload_1 = require("@components/user/avatar-upload");
const index_1 = require("@services/index");
const env_1 = __importDefault(require("../../env"));
const layout = {
    labelCol: { lg: { span: 4 }, sm: { span: 10 } },
    wrapperCol: { lg: { span: 16 }, sm: { span: 10 } }
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
    constructor() {
        super(...arguments);
        this.formRef = react_1.createRef();
    }
    formRefSubmit() {
        this.formRef.current.submit();
    }
    render() {
        const { performer, onFinish, submiting, countries, languages, categories, onUploaded, studios } = this.props;
        const uploadHeaders = {
            authorization: index_1.authService.getToken()
        };
        return (<antd_1.Form ref={this.formRef} {...layout} name="form-performer" onFinish={onFinish.bind(this)} onFinishFailed={() => antd_1.message.error('Please complete the required fields in tab general info')} validateMessages={validateMessages} initialValues={performer
                ? performer
                : {
                    country: 'US',
                    status: 'active',
                    gender: 'male',
                    languages: ['en'],
                    emailVerified: false,
                    socials: {
                        facebook: 'facebook.com',
                        twitter: 'twitter.com',
                        instagram: 'instagram.com'
                    }
                }}>
        <antd_1.Form.Item name="firstName" label="First name" rules={[{ required: true }]}>
          <antd_1.Input />
        </antd_1.Form.Item>
        <antd_1.Form.Item name="lastName" label="Last name" rules={[{ required: true }]}>
          <antd_1.Input />
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
        <antd_1.Form.Item name="username" label="Username" rules={[{ required: true }, { min: 3 }]}>
          <antd_1.Input placeholder="Unique, lowercase and number, no space or special chars"/>
        </antd_1.Form.Item>
        <antd_1.Form.Item name="email" label="Email" rules={[{ type: 'email', required: true }]}>
          <antd_1.Input />
        </antd_1.Form.Item>
        {/* TODO - check is number */}
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
        {categories && categories.length > 0 && (<antd_1.Form.Item name="categoryIds" label="Categories" rules={[
                    {
                        type: 'array'
                    }
                ]}>
            <antd_1.Select mode="multiple">
              {categories.map((cat) => (<antd_1.Select.Option key={cat.slug} value={cat._id}>
                  {cat.name}
                </antd_1.Select.Option>))}
            </antd_1.Select>
          </antd_1.Form.Item>)}
        {studios && studios.length > 0 && (<antd_1.Form.Item name="studioId" label="Studio">
            <antd_1.Select>
              {studios.map((s) => (<antd_1.Select.Option key={s._id} value={s._id}>
                  {s.name}
                </antd_1.Select.Option>))}
            </antd_1.Select>
          </antd_1.Form.Item>)}
        {!performer && [
                <antd_1.Form.Item key="password" name="password" label="Password" rules={[{ required: true }, { min: 6 }]}>
            <antd_1.Input.Password placeholder="Performer password"/>
          </antd_1.Form.Item>,
                <antd_1.Form.Item key="rePassword" name="rePassword" label="Confirm password" rules={[{ required: true }, { min: 6 }]}>
            <antd_1.Input.Password placeholder="Confirm performer password"/>
          </antd_1.Form.Item>
            ]}
        <antd_1.Form.Item name="country" label="Country" rules={[{ required: true }]}>
          <antd_1.Select showSearch filterOption={(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}>
            {countries && countries.map((country) => (<antd_1.Select.Option key={country.code} value={country.code}>
                {country.name}
              </antd_1.Select.Option>))}
          </antd_1.Select>
        </antd_1.Form.Item>
        <antd_1.Form.Item name="city" label="City">
          <antd_1.Input placeholder="Enter the city"/>
        </antd_1.Form.Item>
        <antd_1.Form.Item name="state" label="State">
          <antd_1.Input placeholder="Enter the state"/>
        </antd_1.Form.Item>
        <antd_1.Form.Item name="address" label="Address">
          <antd_1.Input placeholder="Enter the address"/>
        </antd_1.Form.Item>
        <antd_1.Form.Item name="zipcode" label="Zipcode">
          <antd_1.Input placeholder="Enter the zipcode"/>
        </antd_1.Form.Item>
        <antd_1.Form.Item name="languages" label="Languages" rules={[
                {
                    type: 'array'
                }
            ]}>
          <antd_1.Select mode="multiple">
            {languages && languages.map((l) => (<antd_1.Select.Option key={l.code} value={l.code}>
                {l.name}
              </antd_1.Select.Option>))}
          </antd_1.Select>
        </antd_1.Form.Item>
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
        <antd_1.Form.Item name="emailVerified" label="Verified Email" valuePropName="checked">
          <antd_1.Switch />
        </antd_1.Form.Item>
        <antd_1.Form.Item label="Avatar" help={`Image must smaller than ${env_1.default.maximumSizeUploadImage || 2}MB! Only accept ${env_1.default.imageAccept}.`}>
          <avatar_upload_1.AvatarUpload imageUrl={performer && performer.avatar ? performer.avatar : ''} uploadUrl={index_1.performerService.getAvatarUploadUrl()} headers={uploadHeaders} onUploaded={onUploaded.bind(this, 'avatarId')} uploadNow={true}/>
        </antd_1.Form.Item>
        <antd_1.Form.Item wrapperCol={Object.assign(Object.assign({}, layout.wrapperCol), { offset: 4 })}>
          <antd_1.Button type="primary" htmlType="submit" loading={submiting}>
            Submit
          </antd_1.Button>
        </antd_1.Form.Item>
      </antd_1.Form>);
    }
}
exports.AccountForm = AccountForm;
