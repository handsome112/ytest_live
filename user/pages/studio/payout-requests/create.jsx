"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const head_1 = __importDefault(require("next/head"));
const form_1 = __importDefault(require("@components/payout-request/form"));
const antd_1 = require("antd");
const page_header_1 = __importDefault(require("@components/common/layout/page-header"));
const services_1 = require("src/services");
const router_1 = __importDefault(require("next/router"));
require("./index.less");
class PayoutRequestCreatePage extends react_1.default.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            submitting: false
            // success: false
        };
    }
    async submit(data) {
        if (!data.date[0] || !data.date[1])
            return;
        try {
            this.setState({ submitting: true });
            const body = {
                paymentAccountType: data.paymentAccountType,
                requestNote: data.requestNote,
                sourceType: 'studio',
                fromDate: data.date[0],
                toDate: data.date[1]
            };
            await services_1.payoutRequestService.create(body, 'studio');
            antd_1.message.success('Create Success!');
            router_1.default.push('/studio/payout-requests');
        }
        catch (e) {
            const error = await Promise.resolve(e);
            antd_1.message.error(error);
        }
        finally {
            this.setState({ submitting: false });
        }
    }
    render() {
        const { submitting } = this.state;
        return (<>
        <head_1.default>
          <title>Payout Request</title>
        </head_1.default>
        <div className="payout-request-page">
          <page_header_1.default title="Create a Payout Request"/>
          <form_1.default payout={{}} submit={this.submit.bind(this)} submitting={submitting} 
        // eslint-disable-next-line jsx-a11y/aria-role
        role="studio"/>
        </div>
      </>);
    }
}
PayoutRequestCreatePage.layout = 'primary';
PayoutRequestCreatePage.authenticate = true;
exports.default = PayoutRequestCreatePage;
