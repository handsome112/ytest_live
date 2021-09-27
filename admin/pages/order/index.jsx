"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const head_1 = __importDefault(require("next/head"));
const react_1 = require("react");
const antd_1 = require("antd");
const page_1 = __importDefault(require("@components/common/layout/page"));
const index_1 = require("@services/index");
const table_list_1 = __importDefault(require("@components/order/table-list"));
const common_1 = require("@components/common");
const search_filter_1 = require("@components/common/search-filter");
class ModelOrderPage extends react_1.PureComponent {
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
            const pager = Object.assign({}, this.state.pagination);
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
    async search(page = 1) {
        try {
            await this.setState({ searching: true });
            const resp = await index_1.orderService.search(Object.assign(Object.assign({}, this.state.filter), { limit: this.state.limit, offset: (page - 1) * this.state.limit, sort: this.state.sort, sortBy: this.state.sortBy }));
            await this.setState({
                searching: false,
                list: resp.data.data,
                pagination: Object.assign(Object.assign({}, this.state.pagination), { total: resp.data.total, pageSize: this.state.limit })
            });
        }
        catch (e) {
            antd_1.message.error('An error occurred, please try again!');
            await this.setState({ searching: false });
        }
    }
    async handleFilter(filter) {
        await this.setState({
            filter: {
                deliveryStatus: filter.status,
                q: filter.q
            }
        });
        this.search();
    }
    render() {
        const { list, searching, pagination } = this.state;
        const statuses = [
            {
                key: '',
                text: 'All'
            },
            {
                key: 'processing',
                text: 'Processing'
            },
            {
                key: 'shipping',
                text: 'Shipping'
            },
            {
                key: 'delivered',
                text: 'Delivered'
            },
            {
                key: 'refunded',
                text: 'Refunded'
            }
        ];
        return (<react_1.Fragment>
        <head_1.default>
          <title>Orders</title>
        </head_1.default>
        <page_1.default>
          <div className="main-container">
            <common_1.BreadcrumbComponent breadcrumbs={[{ title: 'Orders', href: '/order' }]}/>
            <search_filter_1.SearchFilter statuses={statuses} onSubmit={this.handleFilter.bind(this)} notWithKeyWord={true}/>
            <div style={{ marginBottom: '20px' }}></div>
            <table_list_1.default dataSource={list} rowKey="_id" loading={searching} pagination={pagination} onChange={this.handleTableChange.bind(this)}/>
          </div>
        </page_1.default>
      </react_1.Fragment>);
    }
}
ModelOrderPage.authenticate = true;
ModelOrderPage.onlyPerformer = true;
exports.default = ModelOrderPage;
