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
const react_redux_1 = require("react-redux");
const actions_1 = require("src/redux/user/actions");
const utils_1 = require("@lib/utils");
const head_1 = __importDefault(require("next/head"));
const antd_1 = require("antd");
const page_header_1 = __importDefault(require("@components/common/layout/page-header"));
const payment_token_history_table_1 = __importDefault(require("@components/user/payment-token-history-table"));
const services_1 = require("src/services");
const lodash_1 = require("lodash");
require("./index.less");
class PaymentTokenHistory extends react_1.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            limit: 10,
            offset: 0,
            sortBy: 'createdAt',
            sort: 'desc',
            data: [],
            total: 0,
            searching: false
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
    async onDateChange(_, dateStrings) {
        const oldState = this.state;
        await this.setState(Object.assign(Object.assign({}, oldState), { fromDate: dateStrings[0], toDate: dateStrings[1] }));
        this.getData();
    }
    async getData() {
        const query = lodash_1.omit(this.state, ['data', 'total', 'loading']);
        await this.setState({ searching: true });
        try {
            const resp = await services_1.productService.purchased(Object.assign({}, query));
            await this.setState({ total: resp.data.total, data: resp.data.data });
        }
        catch (e) {
            return {};
        }
        finally {
            await this.setState({ searching: false });
        }
        return {};
    }
    async showError(e) {
        const err = await Promise.resolve(e);
        antd_1.message.error(utils_1.getResponseError(err));
    }
    render() {
        // const { data, searching, total, loading } = this.props;
        const { data, total, searching, limit } = this.state;
        const paymentHistoryprops = {
            paymentTokenHistory: data,
            total,
            onChange: this.onChange.bind(this),
            pageSize: limit,
            searching
        };
        return (<>
        <head_1.default>
          <title>My Purchased Products</title>
        </head_1.default>
        <div className="purchased-product">
          <page_header_1.default title="Purchased Products"/>
          {/* <div className="ant-page-header">
              <DatePicker.RangePicker onChange={this.onDateChange.bind(this)} />
            </div> */}
          <payment_token_history_table_1.default {...paymentHistoryprops}/>
        </div>
      </>);
    }
}
PaymentTokenHistory.authenticate = true;
PaymentTokenHistory.layout = 'primary';
const mapStateToProps = (state) => (Object.assign({}, state.user.paymentTokenHistory));
const mapDispatch = { getPaymentTokenHistroy: actions_1.getPaymentTokenHistroy };
exports.default = react_redux_1.connect(mapStateToProps, mapDispatch)(PaymentTokenHistory);
