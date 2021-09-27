"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const head_1 = __importDefault(require("next/head"));
const react_1 = require("react");
const antd_1 = require("antd");
const page_1 = __importDefault(require("@components/common/layout/page"));
const router_1 = __importDefault(require("next/router"));
const index_1 = require("@services/index");
const utils_service_1 = require("@services/utils.service");
const utils_1 = require("@lib/utils");
const account_form_1 = require("@components/user/account-form");
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
class UserCreate extends react_1.PureComponent {
    constructor() {
        super(...arguments);
        this.state = {
            pwUpdating: false,
            creating: false,
            fetching: false,
            user: {}
        };
    }
    static async getInitialProps() {
        const resp = await utils_service_1.utilsService.countriesList();
        return {
            countries: resp.data
        };
    }
    async submit(data) {
        try {
            if (data.password !== data.rePassword) {
                return antd_1.message.error('Confirm password mismatch!');
            }
            if (!utils_1.validateUsername(data.username)) {
                return antd_1.message.error('Username is invalid!');
            }
            this.setState({ creating: true });
            const resp = await index_1.userService.create(data);
            antd_1.message.success('Updated successfully');
            if (this._avatar) {
                await index_1.userService.uploadAvatarUser(this._avatar, resp.data._id);
            }
            router_1.default.push(`/users/update?id=${resp.data._id}`);
        }
        catch (e) {
            const err = (await Promise.resolve(e)) || {};
            antd_1.message.error(utils_1.getResponseError(err) || 'An error occurred, please try again!');
        }
        finally {
            this.setState({ creating: false });
        }
    }
    onBeforeUpload(file) {
        this._avatar = file;
    }
    render() {
        const { creating } = this.state;
        const { countries } = this.props;
        const uploadHeaders = {
            authorization: index_1.authService.getToken()
        };
        return (<react_1.Fragment>
        <head_1.default>
          <title>Create user</title>
        </head_1.default>
        <page_1.default>
          <account_form_1.AccountForm onFinish={this.submit.bind(this)} updating={creating} options={{
                beforeUpload: this.onBeforeUpload.bind(this)
            }} countries={countries}/>
          {/* <Form
              {...layout}
              name="nest-messages"
              onFinish={this.submit.bind(this)}
              validateMessages={validateMessages}
              initialValues={{
                country: 'US',
                status: 'active',
                gender: 'male',
                roles: ['user']
              }}
            >
              <Form.Item
                name="firstName"
                label="First name"
                rules={[{ required: true }]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                name="lastName"
                label="Last name"
                rules={[{ required: true }]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                name="gender"
                label="Gender"
                rules={[{ required: true }]}
              >
                <Select>
                  <Select.Option key="male" value="male">
                    Male
                  </Select.Option>
                  <Select.Option key="female" value="female">
                    Female
                  </Select.Option>
                  <Select.Option key="transgender" value="transgender">
                    Transgender
                  </Select.Option>
                </Select>
              </Form.Item>
              <Form.Item
                name="username"
                label="Username"
                rules={[{ required: true }, { min: 3 }]}
              >
                <Input placeholder="Unique, lowercase and number, no space or special chars" />
              </Form.Item>
              <Form.Item
                name="email"
                label="Email"
                rules={[{ type: 'email', required: true }]}
              >
                <Input placeholder="email@examle.com" />
              </Form.Item>
              <Form.Item
                name="password"
                label="Password"
                rules={[{ required: true }, { min: 6 }]}
              >
                <Input.Password placeholder="User password" />
              </Form.Item>
              <Form.Item
                name="rePassword"
                label="Confirm password"
                rules={[{ required: true }, { min: 6 }]}
              >
                <Input.Password placeholder="Confirm user password" />
              </Form.Item>
              <Form.Item
                name="country"
                label="Country"
                rules={[{ required: true }]}
              >
                <Select>
                  {countries.map((country) => (
                    <Select.Option key={country.code} value={country.code}>
                      {country.name}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
  
              <Form.Item name="balance" label="Balance">
                <InputNumber />
              </Form.Item>
              <Form.Item name="roles" label="Roles" rules={[{ required: true }]}>
                <Select defaultValue={['user']} mode="multiple">
                  <Select.Option key="user" value="user">
                    User
                  </Select.Option>
                  <Select.Option key="admin" value="admin">
                    Admin
                  </Select.Option>
                </Select>
              </Form.Item>
              <Form.Item
                name="status"
                label="Status"
                rules={[{ required: true }]}
              >
                <Select>
                  <Select.Option key="active" value="active">
                    Active
                  </Select.Option>
                  <Select.Option key="inactive" value="inactive">
                    Inactive
                  </Select.Option>
                </Select>
              </Form.Item>
              <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 4 }}>
                <Button type="primary" htmlType="submit" loading={creating}>
                  Create
                </Button>
              </Form.Item>
            </Form> */}
        </page_1.default>
      </react_1.Fragment>);
    }
}
exports.default = UserCreate;
