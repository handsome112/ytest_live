"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const antd_1 = require("antd");
const head_1 = __importDefault(require("next/head"));
const react_1 = require("react");
const breadcrumb_1 = require("@components/common/breadcrumb");
const page_1 = __importDefault(require("@components/common/layout/page"));
const services_1 = require("src/services");
const router_1 = __importDefault(require("next/router"));
const utils_1 = require("@lib/utils");
const date_1 = require("src/lib/date");
const lodash_1 = require("lodash");
const { Content } = antd_1.Layout;
const { Item } = antd_1.Descriptions;
const invisibleField = [
    '_id',
    '__v',
    'sourceType',
    'sourceId',
    'sourceInfo',
    'type',
    'createdAt',
    'updatedAt'
];
class PayoutDetailPage extends react_1.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            submitting: false,
            request: null,
            loading: true,
            isUpdating: true,
            status: '',
            adminNote: ''
        };
    }
    static async getInitialProps({ ctx }) {
        return ctx.query;
    }
    componentDidMount() {
        this.getData();
    }
    async getData() {
        try {
            const resp = await services_1.payoutRequestService.findById(this.props.id);
            await this.setState({
                request: resp.data,
                status: resp.data.status,
                adminNote: resp.data.adminNote
            });
        }
        catch (e) {
            const err = await Promise.resolve(e);
            antd_1.message.error(utils_1.getResponseError(err));
        }
        finally {
            this.setState({ loading: false });
        }
    }
    async onUpdate(id) {
        const { status, adminNote, request } = this.state;
        try {
            await services_1.payoutRequestService.update(id, {
                status: this.state.status,
                adminNote: this.state.adminNote
            });
            antd_1.message.success('Updated successfully');
            if (request.sourceType === 'studio') {
                router_1.default.push('/payout-request/studios');
            }
            if (request.sourceType === 'performer') {
                router_1.default.push('/payout-request');
            }
        }
        catch (e) {
            const err = await Promise.resolve(e);
            antd_1.message.error(utils_1.getResponseError(err));
        }
    }
    render() {
        var _a;
        const { request, adminNote } = this.state;
        const paymentInfo = [];
        if (request) {
            const { paymentAccountInfo } = request;
            paymentAccountInfo && Object.keys(lodash_1.omit(paymentAccountInfo, invisibleField)).forEach((field) => {
                paymentInfo.push(<Item label={field}>{paymentAccountInfo[field]}</Item>);
            });
        }
        return (<antd_1.Layout>
        <head_1.default>
          <title>Request Details</title>
        </head_1.default>
        <Content>
          <div className="main-container">
            <breadcrumb_1.BreadcrumbComponent breadcrumbs={[
                { title: 'Payout Requests', href: '/payout-request' },
                {
                    title: (request === null || request === void 0 ? void 0 : request._id) || 'Request Details'
                }
            ]}/>
            {request ? (<page_1.default>
                <antd_1.PageHeader title="Payout Request Informations"/>
                <antd_1.Row>
                  <antd_1.Col md={24} lg={12}>
                    <div>
                      <p>
                        Requester:{' '}
                        <strong>{(_a = request.performerInfo) === null || _a === void 0 ? void 0 : _a.username}</strong>
                      </p>
                      <p>
                        Pay Period: {date_1.formatDate(request.fromDate, 'DD/MM/YYYY')}{' '}
                        - {date_1.formatDate(request.toDate, 'DD/MM/YYYY')}
                      </p>
                      <p>Total token request: {request.tokenMustPay}</p>
                      <p>Previous paid out: {request.previousPaidOut}</p>
                      <p>Remaining token must pay: {request.pendingToken}</p>
                      <p>Note: {request.requestNote}</p>
                      <p>Date requested: {date_1.formatDate(request.fromDate)}</p>
                      <antd_1.Descriptions title="Payment Account Information" column={1}>
                        {paymentInfo.length > 0 ? paymentInfo : ''}
                      </antd_1.Descriptions>
                    </div>
                  </antd_1.Col>
                  <antd_1.Col md={24} lg={12}>
                    <div style={{ marginBottom: '10px' }}>
                      <p>Status:</p>
                      <antd_1.Select style={{ width: '100%' }} onChange={(e) => this.setState({ status: e })} defaultValue={this.state.status || 'N/A'}>
                        <antd_1.Select.Option key="approved" value="approved">
                          Approved
                        </antd_1.Select.Option>
                        <antd_1.Select.Option key="pending" value="pending">
                          Pending
                        </antd_1.Select.Option>
                        <antd_1.Select.Option key="rejected" value="rejected">
                          Rejected
                        </antd_1.Select.Option>
                        <antd_1.Select.Option key="done" value="done">
                          Done
                        </antd_1.Select.Option>
                      </antd_1.Select>
                    </div>
                    <div style={{ marginBottom: '10px' }}>
                      <p>Note: </p>
                      <antd_1.Input.TextArea defaultValue={adminNote} style={{ width: '100%' }} onChange={(v) => {
                    this.setState({ adminNote: v.target.value });
                }} placeholder="Add your comment here..." autoSize={{ minRows: 3 }}/>
                    </div>

                    <div style={{ marginBottom: '10px' }}>
                      <antd_1.Button danger onClick={this.onUpdate.bind(this, request._id)}>
                        Update
                      </antd_1.Button>
                    </div>
                  </antd_1.Col>
                </antd_1.Row>
              </page_1.default>) : (<p>Request not found.</p>)}
          </div>
        </Content>
      </antd_1.Layout>);
    }
}
PayoutDetailPage.authenticate = true;
PayoutDetailPage.onlyPerformer = true;
exports.default = PayoutDetailPage;
