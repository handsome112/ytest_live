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
const next_cookies_1 = __importDefault(require("next-cookies"));
const _error_1 = __importDefault(require("pages/_error"));
require("./index.less");
class PayoutRequestCreatePage extends react_1.default.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            submitting: false,
            success: false
        };
    }
    static async getInitialProps({ ctx }) {
        try {
            const { query: { data, id } } = ctx;
            if (process.browser && data) {
                return {
                    payout: JSON.parse(data)
                };
            }
            const { token } = next_cookies_1.default(ctx);
            const resp = await services_1.payoutRequestService.detail(id, {
                Authorization: token
            }, 'studio');
            return {
                payout: resp.data
            };
        }
        catch (_a) {
            return {};
        }
    }
    async submit(data) {
        if (!data.date[0] || !data.date[1])
            return;
        const { payout } = this.props;
        try {
            this.setState({ submitting: true });
            const body = {
                paymentAccountType: data.paymentAccountType,
                requestNote: data.requestNote,
                fromDate: data.date[0],
                toDate: data.date[1]
            };
            await services_1.payoutRequestService.update(payout._id, body, 'studio');
            antd_1.message.success('Success!');
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
        const { payout } = this.props;
        const { submitting, success } = this.state;
        if (!payout)
            return <_error_1.default statusCode={404}/>;
        return (<>
        <head_1.default>
          <title>Payout Request</title>
        </head_1.default>
        {success && (<div className="payout-request-page">
            <page_header_1.default title="Update a Payout Request"/>
            <form_1.default payout={payout} submit={this.submit.bind(this)} submitting={submitting}/>
          </div>)}

      </>);
    }
}
PayoutRequestCreatePage.layout = 'primary';
PayoutRequestCreatePage.authenticate = true;
exports.default = PayoutRequestCreatePage;
