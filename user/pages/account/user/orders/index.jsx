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
const head_1 = __importDefault(require("next/head"));
const react_1 = __importStar(require("react"));
const antd_1 = require("antd");
const page_header_1 = __importDefault(require("@components/common/layout/page-header"));
const index_1 = require("@services/index");
const order_1 = require("@components/order");
const table_list_1 = __importDefault(require("@components/order/table-list"));
const react_redux_1 = require("react-redux");
const utils_1 = require("@lib/utils");
class UserOrderPage extends react_1.PureComponent {
    constructor() {
        super(...arguments);
        this.state = {
            pagination: {},
            searching: true,
            list: [],
            limit: 10,
            filter: {},
            sortBy: 'createdAt',
            sort: 'desc'
        };
    }
    static async getInitialProps({ ctx }) {
        return ctx.query;
    }
    async componentDidMount() {
        this.search();
    }
    async handleTableChange(pagination, filters, sorter) {
        const pager = Object.assign({}, pagination);
        const oldState = this.state;
        pager.current = pagination.current;
        await this.setState(utils_1.getSearchData(pagination, filters, sorter, oldState));
        this.search(pager.current);
    }
    async handleFilter(filter) {
        await this.setState({ filter });
        this.search();
    }
    async search(page = 1) {
        const { filter, limit, sort, sortBy, pagination } = this.state;
        try {
            await this.setState({ searching: true });
            const resp = await index_1.orderService.userSearch(Object.assign(Object.assign({}, filter), { limit,
                sort,
                sortBy,
                page }));
            await this.setState({
                list: resp.data.data,
                pagination: Object.assign(Object.assign({}, pagination), { total: resp.data.total, pageSize: limit })
            });
        }
        catch (e) {
            const err = Promise.resolve(e);
            antd_1.message.error(utils_1.getResponseError(err));
        }
        finally {
            this.setState({ searching: false });
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
                key: 'created',
                text: 'Created'
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
        return (<>
        <head_1.default>
          <title>My Orders</title>
        </head_1.default>
        <div className="order-page">
          <page_header_1.default title="My Orders"/>
          <div>
            <order_1.OrderSearchFilter statuses={statuses} onSubmit={this.handleFilter.bind(this)}/>
            <table_list_1.default type="user" dataSource={list} rowKey="_id" loading={searching} pagination={pagination} onChange={this.handleTableChange.bind(this)}/>
          </div>
        </div>
      </>);
    }
}
UserOrderPage.authenticate = true;
UserOrderPage.layout = 'primary';
const mapStates = (state) => ({
    ui: state.ui
});
exports.default = react_redux_1.connect(mapStates)(UserOrderPage);
