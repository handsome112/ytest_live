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
const react_1 = __importStar(require("react"));
const antd_1 = require("antd");
const page_header_1 = __importDefault(require("@components/common/layout/page-header"));
const react_redux_1 = require("react-redux");
const profile_1 = __importDefault(require("@components/user/profile"));
const head_1 = __importDefault(require("next/head"));
const setting_service_1 = require("src/services/setting.service");
const user_service_1 = require("src/services/user.service");
const actions_1 = require("src/redux/user/actions");
const actions_2 = require("src/redux/auth/actions");
const utils_1 = require("@lib/utils");
const router_1 = __importDefault(require("next/router"));
const password_change_1 = __importDefault(require("@components/auth/password-change"));
require("./index.less");
class UserProfilePage extends react_1.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            countries: [],
            uploadedAvatar: '',
            avatarUploading: false
        };
    }
    static getInitialProps({ ctx }) {
        const { query } = ctx;
        return {
            action: query.action
        };
    }
    componentDidMount() {
        const { action } = this.props;
        if (!action || action === 'account-information')
            this.getCountries();
    }
    componentDidUpdate(prevProps) {
        const { success, updateUserError, auth, action } = this.props;
        const { countries } = this.state;
        if (prevProps.success !== success && success) {
            antd_1.message.success('Update Profile Success.');
        }
        if (prevProps.updateUserError !== updateUserError && updateUserError) {
            antd_1.message.error(utils_1.getResponseError(updateUserError));
        }
        if (prevProps.auth.updatePassword.success !== auth.updatePassword.success
            && auth.updatePassword.success) {
            antd_1.message.success('Update Password Success.');
        }
        if (prevProps.auth.updatePassword.error !== auth.updatePassword.error
            && auth.updatePassword.error) {
            antd_1.message.error(utils_1.getResponseError(auth.updatePassword.error));
        }
        if (!countries.length && action === 'account-information') {
            this.getCountries();
        }
    }
    onFinish(data) {
        const { user, updateUser: dispatchUpdateUser } = this.props;
        dispatchUpdateUser(Object.assign(Object.assign({}, user), data));
    }
    onChangeAvatar({ file }) {
        if (file.status === 'uploading') {
            this.setState({ avatarUploading: true });
            return;
        }
        if (file.status === 'done') {
            this.setState({ avatarUploading: false });
            if (file.response) {
                this.setState({
                    uploadedAvatar: file.response.data.url
                });
            }
        }
    }
    onTabsChange(key) {
        router_1.default.push({ pathname: '/account/user/account-settings', query: { action: key } }, `/account/user/account-settings?action=${key}`, { shallow: false });
    }
    onPasswordChange(data) {
        const { updatePassword: dispatchUpdatePassword } = this.props;
        dispatchUpdatePassword(data);
    }
    async getCountries() {
        try {
            const countries = await setting_service_1.settingService.getCountries();
            this.setState({ countries: countries.data });
        }
        catch (error) {
            antd_1.message.error(utils_1.getResponseError(error));
        }
    }
    render() {
        const { user, action, auth, userUpdating } = this.props;
        const { countries, uploadedAvatar, avatarUploading } = this.state;
        return (<>
        <head_1.default>
          <title>{`${user.username} Profile`}</title>
        </head_1.default>
        <div className="account-setting-page">
          <page_header_1.default title="Account Settings"/>
          <antd_1.Tabs activeKey={action || 'account-information'} style={{ padding: '0 24px' }} size="large" onChange={this.onTabsChange.bind(this)}>
            <antd_1.Tabs.TabPane tab="Account Information" key="account-information">
              <profile_1.default {...user} onFinish={this.onFinish.bind(this)} countries={countries} onChangeAvatar={this.onChangeAvatar.bind(this)} uploadAvatarUrl={user_service_1.userService.getAvatarUploadUrl()} uploadedAvatar={uploadedAvatar} avatarUploading={avatarUploading} loading={userUpdating}/>
            </antd_1.Tabs.TabPane>
            {/* <Tabs.TabPane key="timezone" tab="Timezone">
              <h3>
                Sometimes the timezone is very important so make sure you alway
                set up it correctly. We will contact you taking into
                consideration the time zone and so may the performer do!
              </h3>
              <Form
                onFinish={this.onFinish.bind(this)}
                layout="vertical"
                initialValues={{ timezone: user.timezone }}
                {...formItemLayout}
              >
                <Form.Item
                  name="timezone"
                  key="timezone"
                  label="Timezone"
                  rules={[
                    {
                      required: true,
                      message: 'Please input your timezone!'
                    }
                  ]}
                >
                  <Timezones autoFocus />
                </Form.Item>
                <Form.Item>
                  <Button type="primary" htmlType="submit">
                    Save Changes
                  </Button>
                </Form.Item>
              </Form>
            </Tabs.TabPane> */}
            <antd_1.Tabs.TabPane key="change-password" tab="Change Password">
              <password_change_1.default onFinish={this.onPasswordChange.bind(this)} {...auth.updatePassword}/>
            </antd_1.Tabs.TabPane>
          </antd_1.Tabs>
        </div>
      </>);
    }
}
UserProfilePage.authenticate = true;
UserProfilePage.layout = 'primary';
const mapStateToProps = (state) => ({
    user: state.user.current,
    userUpdating: state.user.userUpdating,
    success: state.user.updateUserSuccess,
    updateUserError: state.user.updateUserError,
    auth: state.auth
});
const mapDispatch = { updateUser: actions_1.updateUser, updatePassword: actions_2.updatePassword };
exports.default = react_redux_1.connect(mapStateToProps, mapDispatch)(UserProfilePage);
