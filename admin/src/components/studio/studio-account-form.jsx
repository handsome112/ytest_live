"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
const antd_1 = require("antd");
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
class StudioAccountForm extends react_1.PureComponent {
    constructor() {
        super(...arguments);
        this.state = {
            loading: false
        };
    }
    render() {
        const { studio, onFinish, submiting, countries } = this.props;
        return (<antd_1.Form {...layout} name="form-performer" onFinish={onFinish} onFinishFailed={() => antd_1.message.error('Please complete the required fields in tab general info')} validateMessages={validateMessages} initialValues={studio
                ? studio
                : {
                    country: 'US',
                    status: 'active',
                    emailVerified: false
                }}>
        <antd_1.Form.Item name="name" label="Studio name" rules={[
                {
                    pattern: new RegExp('^[a-zA-Z0-9 ]*$'),
                    message: 'Studio name must according to Alphanumeric formating'
                },
                {
                    whitespace: true,
                    message: 'Please input your Studio name!'
                },
                {
                    required: true,
                    message: 'Please input your Studio name!'
                }
            ]}>
          <antd_1.Input />
        </antd_1.Form.Item>
        <antd_1.Form.Item name="username" label="User Name" rules={[
                {
                    pattern: new RegExp('^[a-zA-Z0-9 ]*$'),
                    message: 'User name must according to Alphanumeric formating'
                },
                {
                    whitespace: true,
                    message: 'Please input your user name!'
                },
                {
                    required: true,
                    message: 'Please input your user name!'
                }
            ]}>
          <antd_1.Input placeholder="Username name"/>
        </antd_1.Form.Item>
        <antd_1.Form.Item name="email" label="Email Address" rules={[
                {
                    type: 'email',
                    message: 'The input is not valid E-mail!'
                },
                {
                    required: true,
                    message: 'Please input your E-mail!'
                }
            ]}>
          <antd_1.Input placeholder="studio@example.com"/>
        </antd_1.Form.Item>

        {!studio && [
                <antd_1.Form.Item key="password" name="password" label="Password" rules={[{ required: true }, { min: 6 }]}>
            <antd_1.Input.Password placeholder="Performer password"/>
          </antd_1.Form.Item>,
                <antd_1.Form.Item key="rePassword" name="rePassword" label="Confirm password" rules={[{ required: true }, { min: 6 }]}>
            <antd_1.Input.Password placeholder="Confirm performer password"/>
          </antd_1.Form.Item>
            ]}

        <antd_1.Form.Item name="country" label="Country" rules={[{ required: true }]}>
          <antd_1.Select showSearch filterOption={(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}>
            {countries.map((country) => (<antd_1.Select.Option key={country.code} value={country.code}>
                {country.name}
              </antd_1.Select.Option>))}
          </antd_1.Select>
        </antd_1.Form.Item>
        {!studio && [
                <antd_1.Form.Item name="commission" label="Commission" rules={[
                        {
                            validator: (_, value) => {
                                if (parseInt(value) > 0 && parseInt(value) < 100) {
                                    return Promise.resolve();
                                }
                                return Promise.reject('Value must be greater than 0 and less than 100');
                            }
                        }
                    ]}>
            <antd_1.InputNumber min={1} max={99} style={{ width: '100%' }}/>
          </antd_1.Form.Item>
            ]}
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
          <antd_1.Switch defaultChecked={studio && studio.emailVerified ? studio.emailVerified : false}/>
        </antd_1.Form.Item>
        <antd_1.Form.Item wrapperCol={Object.assign(Object.assign({}, layout.wrapperCol), { offset: 4 })}>
          <antd_1.Button type="primary" htmlType="submit" loading={submiting}>
            Submit
          </antd_1.Button>
        </antd_1.Form.Item>
      </antd_1.Form>);
    }
}
exports.default = StudioAccountForm;
