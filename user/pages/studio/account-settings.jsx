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
const head_1 = __importDefault(require("next/head"));
const utils_1 = require("@lib/utils");
const router_1 = __importDefault(require("next/router"));
const password_change_1 = __importDefault(require("@components/auth/password-change"));
const interfaces_1 = require("src/interfaces");
const account_information_1 = __importDefault(require("@components/studio/account-information"));
const commission_card_1 = __importStar(require("@components/commission/commission-card"));
const payment_1 = require("@components/payment");
const actions_1 = require("src/redux/studio/actions");
const actions_2 = require("src/redux/auth/actions");
const react_redux_1 = require("react-redux");
const lodash_1 = require("lodash");
const payment_information_service_1 = require("@services/payment-information.service");
const { Panel } = antd_1.Collapse;
class StudioProfilePage extends react_1.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
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
        const { success, errorInfo, auth } = this.props;
        const { paymentInformationKey } = this.state;
        if (prevProps.success !== success && success) {
            antd_1.message.success('Update Profile Success.');
        }
        if (prevProps.errorInfo !== errorInfo && errorInfo) {
            antd_1.message.error(utils_1.getResponseError(errorInfo));
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
    onTabsChange(key) {
        router_1.default.push({
            pathname: '/studio/account-settings',
            query: { action: key }
        }, `/studio/account-settings?action=${key}`, { shallow: false });
    }
    onFinish(data) {
        const { studio, updateStudio: dispatchUpdateStudio } = this.props;
        dispatchUpdateStudio(Object.assign(Object.assign({}, lodash_1.omit(studio, ['bankTransferOption', 'bitpay'])), data));
    }
    onPasswordChange(data) {
        const { updatePassword: dispatchUpdatePassword } = this.props;
        dispatchUpdatePassword(Object.assign({ source: 'studio' }, data));
    }
    onPaymentInformationChange(key) {
        this.setState({ paymentInformationKey: key });
    }
    async getPaymentInformation() {
        const { paymentInformationKey } = this.state;
        payment_information_service_1.paymentInformationService
            .findOne({ type: paymentInformationKey })
            .then((resp) => this.setState({
            paymentInformation: { [paymentInformationKey]: resp.data }
        }));
    }
    async submitPaymentInfoForm(data) {
        try {
            const { paymentInformationKey } = this.state;
            const resp = await payment_information_service_1.paymentInformationService.create(Object.assign({ type: paymentInformationKey }, data));
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
        const { action, updating, studio, countries } = this.props;
        const { paymentInformation } = this.state;
        return (<>
        <head_1.default>
          <title>Account Settings</title>
        </head_1.default>
        <div className="studio-main-background">
          <page_header_1.default title="Account Settings"/>
          <antd_1.Tabs defaultActiveKey={action || 'account-information'} style={{ padding: '0 24px' }} size="large" onChange={this.onTabsChange.bind(this)}>
            <antd_1.Tabs.TabPane key="account-information" tab="Account Information">
              <account_information_1.default {...studio} countries={countries} onFinish={this.onFinish.bind(this)} loading={updating}/>
            </antd_1.Tabs.TabPane>
            <antd_1.Tabs.TabPane key="change-password" tab="Change Password">
              <password_change_1.default onFinish={this.onPasswordChange.bind(this)} submiting={updating}/>
            </antd_1.Tabs.TabPane>
            <antd_1.Tabs.TabPane tab="(%) Commission" key="commission">
              <commission_card_1.default role={commission_card_1.ROLE.STUDIO}/>
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
          </antd_1.Tabs>
        </div>
      </>);
    }
}
StudioProfilePage.authenticate = true;
StudioProfilePage.layout = 'primary';
const mapStates = (state) => ({
    auth: state.auth,
    studio: state.studio.current,
    updating: state.studio.updatingStudio,
    success: state.studio.updateStudioSuccess,
    countries: state.settings.countries,
    errorInfo: state.studio.updateStudioError
});
const mapDispatch = {
    updateStudio: actions_1.updateStudio,
    updateStudioPaymentInfo: actions_1.updateStudioPaymentInfo,
    updateStudioDirectDeposit: actions_1.updateStudioDirectDeposit,
    updateStudioPaxum: actions_1.updateStudioPaxum,
    updateStudioBitpay: actions_1.updateStudioBitpay,
    updatePassword: actions_2.updatePassword
};
exports.default = react_redux_1.connect(mapStates, mapDispatch)(StudioProfilePage);
