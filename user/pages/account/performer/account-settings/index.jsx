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
const interfaces_1 = require("src/interfaces");
const head_1 = __importDefault(require("next/head"));
const contact_setting_form_1 = __importDefault(require("@components/performer/contact-setting-form"));
const payment_1 = require("@components/payment");
const commission_card_1 = __importDefault(require("@components/commission/commission-card"));
const disable_account_form_1 = __importDefault(require("@components/performer/settings/disable-account-form"));
const default_price_form_1 = __importDefault(require("@components/performer/settings/default-price-form"));
const actions_1 = require("src/redux/performer/actions");
const actions_2 = require("src/redux/auth/actions");
const utils_1 = require("@lib/utils");
const services_1 = require("src/services");
const router_1 = __importDefault(require("next/router"));
const password_change_1 = __importDefault(require("@components/auth/password-change"));
const documents_setting_form_1 = __importDefault(require("@components/performer/documents-setting-form"));
const timezones_1 = __importDefault(require("@components/common/base/select/timezones"));
const layout_1 = require("@lib/layout");
const broadcast_setting_form_1 = __importDefault(require("@components/performer/broadcast-setting-form"));
require("./index.less");
const socket_1 = require("src/socket");
const { Panel } = antd_1.Collapse;
class UserProfilePage extends react_1.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            updatingMaxPearticipantsAllowed: false,
            paymentInformationKey: '',
            paymentInformation: {}
        };
    }
    static getInitialProps({ ctx }) {
        const { query } = ctx;
        return {
            action: query.action
        };
    }
    componentDidUpdate(prevProps, prevStates) {
        const { updateSuccess, updateError, auth } = this.props;
        const { paymentInformationKey } = this.state;
        if (prevProps.updateSuccess !== updateSuccess && updateSuccess) {
            antd_1.message.success('Update Profile Success.');
        }
        if (prevProps.updateError !== updateError && updateError) {
            antd_1.message.error(utils_1.getResponseError(updateError));
        }
        if (prevProps.auth.updatePassword.success !== auth.updatePassword.success
            && auth.updatePassword.success) {
            antd_1.message.success('Update Password Success.');
        }
        if (prevProps.auth.updatePassword.error !== auth.updatePassword.error
            && auth.updatePassword.error) {
            antd_1.message.error(utils_1.getResponseError(auth.updatePassword.error));
        }
        if (paymentInformationKey
            && paymentInformationKey !== prevStates.paymentInformationKey) {
            this.getPaymentInformation();
        }
    }
    onFinish(data) {
        const { performer, updatePerformerProfile: dispatchupdatePerformerProfile } = this.props;
        dispatchupdatePerformerProfile(Object.assign(Object.assign({}, performer), data));
    }
    onTabsChange(key) {
        router_1.default.push({
            pathname: '/account/performer/account-settings',
            query: { action: key }
        }, `/account/performer/account-settings?action=${key}`, { shallow: false });
    }
    async onUpdateBroadcastSetting(data) {
        const { maxParticipantsAllowed } = data;
        try {
            this.setState({ updatingMaxPearticipantsAllowed: true });
            await services_1.performerService.updateBroadcastSetting({ maxParticipantsAllowed });
            antd_1.message.success('Update Broadcast Setting Success.');
        }
        catch (error) {
            const err = await Promise.resolve(error);
            antd_1.message.error(utils_1.getResponseError(err));
        }
        finally {
            this.setState({ updatingMaxPearticipantsAllowed: false });
        }
    }
    onPasswordChange(data) {
        const { updatePassword: dispatchUpdatePassword } = this.props;
        dispatchUpdatePassword(data);
    }
    onUpdateDefaultPrice(data) {
        const { updateDefaultPrice: dispatchUpdateDefaultPrice } = this.props;
        dispatchUpdateDefaultPrice(data);
    }
    async onSuspendAccount(data) {
        try {
            const { performer, logout: dispatchLogout } = this.props;
            // Check password
            const auth = await services_1.authService.performerLogin({
                username: performer.username,
                password: data.password
            });
            if (!auth.data || !auth.data.token) {
                return antd_1.message.error("Something's gone wrong, please try again later");
            }
            await services_1.performerService.suspendAccount(performer._id);
            const socket = this.context;
            const token = services_1.authService.getToken();
            if (socket && token) {
                socket.disconnect();
            }
            dispatchLogout();
        }
        catch (e) {
            const error = await Promise.resolve(e);
            antd_1.message.error(utils_1.getResponseError(error));
        }
        return undefined;
    }
    onPaymentInformationChange(key) {
        this.setState({ paymentInformationKey: key });
    }
    async getPaymentInformation() {
        const { paymentInformationKey } = this.state;
        services_1.paymentInformationService
            .findOne({ type: paymentInformationKey })
            .then((resp) => this.setState({
            paymentInformation: { [paymentInformationKey]: resp.data }
        }));
    }
    async submitPaymentInfoForm(data) {
        try {
            const { paymentInformationKey } = this.state;
            const resp = await services_1.paymentInformationService.create(Object.assign({ type: paymentInformationKey }, data));
            this.setState({
                paymentInformation: { [paymentInformationKey]: resp.data }
            });
            antd_1.message.success('Update Payment Information Success');
        }
        catch (e) {
            const error = await Promise.resolve(e);
            antd_1.message.error(utils_1.getResponseError(error));
        }
    }
    render() {
        const { performer, action, auth, updating, countries } = this.props;
        const { updatingMaxPearticipantsAllowed, paymentInformation } = this.state;
        return (<>
        <head_1.default>
          <title>Account Settings</title>
        </head_1.default>
        <div className="account-setting-page">
          <page_header_1.default title="Account Settings"/>
          <antd_1.Tabs defaultActiveKey={action || 'commission'} style={{ padding: '0 24px' }} size="large" onChange={this.onTabsChange.bind(this)}>
            <antd_1.Tabs.TabPane tab="Commission" key="commission">
              <commission_card_1.default />
            </antd_1.Tabs.TabPane>
            <antd_1.Tabs.TabPane tab="Default Price" key="default-price">
              <default_price_form_1.default {...performer} loading={updating} onFinish={this.onUpdateDefaultPrice.bind(this)}/>
            </antd_1.Tabs.TabPane>
            <antd_1.Tabs.TabPane tab="Documents" key="documents">
              <documents_setting_form_1.default loading={updating} onFinish={this.onFinish.bind(this)} performer={performer}/>
            </antd_1.Tabs.TabPane>
            <antd_1.Tabs.TabPane tab="Contact Setting" key="contact-settings">
              <contact_setting_form_1.default {...performer} onFinish={this.onFinish.bind(this)} loading={updating} countries={countries}/>
            </antd_1.Tabs.TabPane>
            <antd_1.Tabs.TabPane tab="Broadcast Setting" key="broadcast-settings">
              <broadcast_setting_form_1.default maxParticipantsAllowed={performer.maxParticipantsAllowed} onFinish={this.onUpdateBroadcastSetting.bind(this)} loading={updatingMaxPearticipantsAllowed}/>
            </antd_1.Tabs.TabPane>
            <antd_1.Tabs.TabPane tab="Payment Information" key="paymentInfo">
              <antd_1.Collapse accordion onChange={this.onPaymentInformationChange.bind(this)}>
                <Panel header="Wire Transfer (Free)" key="wire" forceRender>
                  <payment_1.WireTransferSettingForm paymentInformation={paymentInformation.wire} loading={updating} onFinish={this.submitPaymentInfoForm.bind(this)}/>
                </Panel>
                <Panel header="Paypal" key="paypal" forceRender>
                  <payment_1.PaypalSettingFrom paymentInformation={paymentInformation.paypal} loading={updating} onFinish={this.submitPaymentInfoForm.bind(this)}/>
                </Panel>
                <Panel header="Issue Check (U.S only)" key="issue_check_us" forceRender>
                  <payment_1.IssueCheckUSSetingForm paymentInformation={paymentInformation.issue_check_us} loading={updating} onFinish={this.submitPaymentInfoForm.bind(this)}/>
                </Panel>
                <Panel header="Direct Deposit" key="deposit" forceRender>
                  <payment_1.DirectDepositSettingForm paymentInformation={paymentInformation.deposit} loading={updating} onFinish={this.submitPaymentInfoForm.bind(this)}/>
                </Panel>
                <Panel header="Paxum" key={interfaces_1.PAYMENT_ACCOUNT.PAXUM} forceRender>
                  <payment_1.PaxumSettingForm paymentInformation={paymentInformation[interfaces_1.PAYMENT_ACCOUNT.PAXUM]} loading={updating} onFinish={this.submitPaymentInfoForm.bind(this)}/>
                </Panel>
                <Panel header="Bitpay" key={interfaces_1.PAYMENT_ACCOUNT.BITPAY} forceRender>
                  <payment_1.BitpaySettigForm paymentInformation={paymentInformation[interfaces_1.PAYMENT_ACCOUNT.BITPAY]} loading={updating} onFinish={this.submitPaymentInfoForm.bind(this)}/>
                </Panel>
              </antd_1.Collapse>
            </antd_1.Tabs.TabPane>
            <antd_1.Tabs.TabPane key="timezone" tab="Timezone">
              <h3>
                Sometimes the timezone is very important so make sure you alway
                set up it correctly. We will contact you taking into
                consideration the time zone and so may the performer do!
              </h3>
              <antd_1.Form onFinish={this.onFinish.bind(this)} layout="vertical" initialValues={{ timezone: performer.timezone }} {...layout_1.formItemLayout}>
                <antd_1.Form.Item name="timezone" key="timezone" label="Timezone" rules={[
                {
                    required: true,
                    message: 'Please input your timezone!'
                }
            ]}>
                  <timezones_1.default autoFocus/>
                </antd_1.Form.Item>
                <antd_1.Form.Item>
                  <antd_1.Button type="primary" disabled={updating} loading={updating} htmlType="submit">
                    Save Changes
                  </antd_1.Button>
                </antd_1.Form.Item>
              </antd_1.Form>
            </antd_1.Tabs.TabPane>
            <antd_1.Tabs.TabPane tab="Disable Account" key="disable-account">
              <disable_account_form_1.default loading={updating} onFinish={this.onSuspendAccount.bind(this)}/>
            </antd_1.Tabs.TabPane>
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
UserProfilePage.contextType = socket_1.SocketContext;
const mapStateToProps = (state) => ({
    performer: state.performer.current,
    updating: state.performer.updating,
    updateSuccess: state.performer.updateSuccess,
    updateError: state.performer.updateError,
    countries: state.settings.countries,
    auth: state.auth
});
const mapDispatch = {
    updatePerformerProfile: actions_1.updatePerformerProfile,
    logout: actions_2.logout,
    updatePaymentInfo: actions_1.updatePaymentInfo,
    updatePassword: actions_2.updatePassword,
    updateDirectDeposit: actions_1.updateDirectDeposit,
    updateBitpay: actions_1.updateBitpay,
    updatePaxum: actions_1.updatePaxum,
    updateDefaultPrice: actions_1.updateDefaultPrice
};
exports.default = react_redux_1.connect(mapStateToProps, mapDispatch)(UserProfilePage);
