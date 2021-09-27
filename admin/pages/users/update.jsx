"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const head_1 = __importDefault(require("next/head"));
const react_1 = require("react");
const antd_1 = require("antd");
const page_1 = __importDefault(require("@components/common/layout/page"));
const account_form_1 = require("@components/user/account-form");
const index_1 = require("@services/index");
const update_password_form_1 = require("@components/user/update-password-form");
const loader_1 = __importDefault(require("@components/common/base/loader"));
const utils_service_1 = require("@services/utils.service");
const UpdateBalanceForm_1 = require("@components/user/UpdateBalanceForm");
class UserUpdate extends react_1.PureComponent {
    constructor() {
        super(...arguments);
        this.state = {
            pwUpdating: false,
            updating: false,
            fetching: false,
            user: {}
        };
    }
    static async getInitialProps({ ctx }) {
        const resp = await utils_service_1.utilsService.countriesList();
        return Object.assign({ countries: resp.data }, ctx.query);
    }
    async componentDidMount() {
        try {
            this.setState({ fetching: true });
            const resp = await index_1.userService.findById(this.props.id);
            this.setState({ user: resp.data });
        }
        catch (e) {
            antd_1.message.error('Error while fecting user!');
        }
        finally {
            this.setState({ fetching: false });
        }
    }
    async submit(data) {
        try {
            this.setState({ updating: true });
            const updated = await index_1.userService.update(this.props.id, data);
            this.setState({ user: updated.data });
            antd_1.message.success('Updated successfully');
        }
        catch (e) {
            // TODO - exact error message
            antd_1.message.error('An error occurred, please try again!');
        }
        finally {
            this.setState({ updating: false });
        }
    }
    onAvatarUploaded(data) {
        // TODO - check with current user if needed?
        antd_1.message.success('Avatar has been updated!');
        // this.props.updateCurrentUserAvatar(data.base64);
    }
    async updatePassword(data) {
        try {
            this.setState({ pwUpdating: true });
            await index_1.authService.updatePassword(data.password, this.props.id);
            antd_1.message.success('Password has been updated!');
        }
        catch (e) {
            antd_1.message.error('An error occurred, please try again!');
        }
        finally {
            this.setState({ pwUpdating: false });
        }
    }
    render() {
        const { pwUpdating, user, updating, fetching } = this.state;
        const { countries } = this.props;
        const uploadHeaders = {
            authorization: index_1.authService.getToken()
        };
        return (<react_1.Fragment>
        <head_1.default>
          <title>User update</title>
        </head_1.default>
        <page_1.default>
          {fetching ? (<loader_1.default />) : (<antd_1.Tabs defaultActiveKey="basic" tabPosition="left">
              <antd_1.Tabs.TabPane tab={<span>Basic info</span>} key="basic">
                <account_form_1.AccountForm onFinish={this.submit.bind(this)} user={user} updating={updating} options={{
                    uploadHeaders,
                    avatarUploadUrl: index_1.userService.getAvatarUploadUrl(user._id),
                    onAvatarUploaded: this.onAvatarUploaded.bind(this)
                }} countries={countries}/>
              </antd_1.Tabs.TabPane>
              <antd_1.Tabs.TabPane tab={<span>Change password</span>} key="password">
                <update_password_form_1.UpdatePaswordForm onFinish={this.updatePassword.bind(this)} updating={pwUpdating}/>
              </antd_1.Tabs.TabPane>

              <antd_1.Tabs.TabPane tab={<span>Balance</span>} key="balance">
                <UpdateBalanceForm_1.UpdateBalanceForm balance={user.balance} onFinish={this.submit.bind(this)} updating={updating}/>
              </antd_1.Tabs.TabPane>
            </antd_1.Tabs>)}
        </page_1.default>
      </react_1.Fragment>);
    }
}
exports.default = UserUpdate;
