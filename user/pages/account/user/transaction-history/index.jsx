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
const antd_1 = require("antd");
const page_header_1 = __importDefault(require("@components/common/layout/page-header"));
const head_1 = __importDefault(require("next/head"));
const react_1 = __importStar(require("react"));
const services_1 = require("src/services");
const utils_1 = require("@lib/utils");
const loader_1 = __importDefault(require("src/components/common/base/loader"));
const table_list_1 = require("src/components/transaction/table-list");
require("./index.less");
class TransactionHistoryPage extends react_1.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            transaction: [],
            limit: 10,
            total: 0,
            offset: 0,
            sortBy: 'createdAt',
            sort: 'desc',
            filter: {}
        };
    }
    componentDidMount() {
        this.getData();
    }
    async onChange(pagination, filters, sorter) {
        const oldState = this.state;
        await this.setState(utils_1.getSearchData(pagination, filters, sorter, oldState));
        this.getData();
    }
    async getData() {
        const { filter, limit, offset, sortBy, sort } = this.state;
        try {
            const resp = await services_1.transactionService.search(Object.assign(Object.assign({}, filter), { limit,
                offset,
                sortBy,
                sort }));
            await this.setState({ transaction: resp.data.data, total: resp.data.total });
        }
        catch (e) {
            const err = Promise.resolve(e);
            antd_1.message.error(utils_1.getResponseError(err));
        }
        finally {
            this.setState({ loading: false });
        }
    }
    render() {
        const { loading, transaction, total, limit } = this.state;
        return (<>
        <head_1.default>
          <title>Transaction History</title>
        </head_1.default>
        <div className="transaction-history-page">
          <page_header_1.default title="Transaction History"/>
          <div>
            {loading ? (<loader_1.default />) : (<table_list_1.TransactionHistoryTable rowKey="_id" transactions={transaction} pageSize={limit} total={total} onChange={this.onChange.bind(this)}/>)}
          </div>
        </div>
      </>);
    }
}
TransactionHistoryPage.authenticate = true;
TransactionHistoryPage.layout = 'primary';
exports.default = TransactionHistoryPage;
