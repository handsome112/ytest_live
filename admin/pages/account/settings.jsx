"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const head_1 = __importDefault(require("next/head"));
const react_1 = require("react");
const react_redux_1 = require("react-redux");
const antd_1 = require("antd");
const page_1 = __importDefault(require("@components/common/layout/page"));
const account_form_1 = require("@components/user/account-form");
const actions_1 = require("src/redux/user/actions");
const index_1 = require("@services/index");
const update_password_form_1 = require("@components/user/update-password-form");
const utils_service_1 = require("@services/utils.service");
class AccountSettings extends react_1.PureComponent {
    constructor() {
        super(...arguments);
        this.state = {
            pwUpdating: false
        };
    }
    static async getInitialProps({ ctx }) {
        const resp = await utils_service_1.utilsService.countriesList();
        return Object.assign({ countries: resp.data }, ctx.query);
    }
    submit(data) {
        this.props.updateUser(data);
        // TODO - show alert success for update?
        // or move to sagas
    }
    onAvatarUploaded(data) {
        antd_1.message.success('Avatar has been updated!');
        this.props.updateCurrentUserAvatar(data.base64);
    }
    async updatePassword(data) {
        try {
            this.setState({ pwUpdating: true });
            await index_1.authService.updatePassword(data.password);
            antd_1.message.success('Password has been updated!');
        }
        catch (e) {
            antd_1.message.error('An error occurred, please try again!');
        }
        finally {
            this.setState({ pwUpdating: false });
        }
    }
    componentDidUpdate(prevProps) {
        if (prevProps.updateSuccess !== this.props.updateSuccess &&
            this.props.updateSuccess) {
            antd_1.message.success('Updated successfully!');
        }
    }
    render() {
        const { currentUser, updating, countries } = this.props;
        const { pwUpdating } = this.state;
        const uploadHeaders = {
            authorization: index_1.authService.getToken()
        };
        return (<react_1.Fragment>
        <head_1.default>
          <title>Account Settings</title>
        </head_1.default>
        <page_1.default>
          <antd_1.Tabs defaultActiveKey="basic" tabPosition="left">
            <antd_1.Tabs.TabPane tab={<span>Basic info</span>} key="basic">
              <account_form_1.AccountForm onFinish={this.submit.bind(this)} user={currentUser} updating={updating} options={{
                uploadHeaders,
                avatarUploadUrl: index_1.userService.getAvatarUploadUrl(),
                onAvatarUploaded: this.onAvatarUploaded.bind(this)
            }} countries={countries}/>
            </antd_1.Tabs.TabPane>
            <antd_1.Tabs.TabPane tab={<span>Change password</span>} key="password">
              <update_password_form_1.UpdatePaswordForm onFinish={this.updatePassword.bind(this)} updating={pwUpdating}/>
            </antd_1.Tabs.TabPane>
          </antd_1.Tabs>
        </page_1.default>
      </react_1.Fragment>);
    }
}
const mapStates = (state) => ({
    currentUser: state.user.current,
    updating: state.user.updating,
    updateSuccess: state.user.updateSuccess
});
const mapDispatch = { updateUser: actions_1.updateUser, updateCurrentUserAvatar: actions_1.updateCurrentUserAvatar };
exports.default = react_redux_1.connect(mapStates, mapDispatch)(AccountSettings);
