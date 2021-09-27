"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable no-nested-ternary */
const head_1 = __importDefault(require("next/head"));
const react_1 = require("react");
const antd_1 = require("antd");
const page_1 = __importDefault(require("@components/common/layout/page"));
const payment_service_1 = require("@services/payment.service");
const search_filter_1 = require("@components/common/search-filter");
const table_list_payment_1 = require("@components/payment/table-list-payment");
const common_1 = require("@components/common");
class PaymentTransaction extends react_1.PureComponent {
    constructor() {
        super(...arguments);
        this.state = {
            pagination: {},
            searching: false,
            list: [],
            limit: 10,
            filter: {},
            sortBy: 'createdAt',
            sort: 'desc'
        };
        this.handleTableChange = (pagination, filters, sorter) => {
            const pager = Object.assign({}, pagination);
            pager.current = pagination.current;
            this.setState({
                pagination: pager,
                sortBy: sorter.field || 'createdAt',
                sort: sorter.order
                    ? sorter.order === 'descend'
                        ? 'desc'
                        : 'asc'
                    : 'desc'
            });
            this.search(pager.current);
        };
    }
    static async getInitialProps({ ctx }) {
        return ctx.query;
    }
    async componentDidMount() {
        this.search();
    }
    async handleFilter(filter) {
        await this.setState({ filter });
        this.search();
    }
    async search(page = 1) {
        const { limit, filter, sort, sortBy, pagination } = this.state;
        try {
            await this.setState({ searching: true });
            const resp = await payment_service_1.paymentService.search(Object.assign(Object.assign({}, filter), { limit, offset: (page - 1) * limit, sort,
                sortBy }));
            await this.setState({
                searching: false,
                list: resp.data.data,
                pagination: Object.assign(Object.assign({}, pagination), { total: resp.data.total, pageSize: limit })
            });
        }
        catch (e) {
            antd_1.message.error('An error occurred, please try again!');
            await this.setState({ searching: false });
        }
    }
    render() {
        const { list, searching, pagination } = this.state;
        const statuses = [
            {
                key: '',
                text: 'All'
            },
            {
                key: 'pending',
                text: 'Pending'
            },
            {
                key: 'success',
                text: 'Success'
            },
            {
                key: 'cancelled',
                text: 'Cancelled'
            }
        ];
        return (<>
        <head_1.default>
          <title>Payment Transaction</title>
        </head_1.default>
        <common_1.BreadcrumbComponent breadcrumbs={[{ title: 'Payment transaction' }]}/>
        <page_1.default>
          <search_filter_1.SearchFilter statuses={statuses} onSubmit={this.handleFilter.bind(this)} notWithKeyWord={true} searchWithUser={true}/>
          <div style={{ marginBottom: '20px' }}/>
          <table_list_payment_1.TableListPaymentTransaction dataSource={list} rowKey="_id" loading={searching} pagination={pagination} onChange={this.handleTableChange.bind(this)}/>
        </page_1.default>
      </>);
    }
}
exports.default = PaymentTransaction;
