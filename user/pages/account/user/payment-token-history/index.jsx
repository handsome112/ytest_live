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
require("./index.less");
class PaymentTokenHistory extends react_1.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            limit: 10,
            offset: 0,
            sortBy: 'createdAt',
            sort: 'desc'
        };
    }
    componentDidMount() {
        const { getPaymentTokenHistroy: dispatchGetPaymentTokenHistroy } = this.props;
        dispatchGetPaymentTokenHistroy(Object.assign({}, this.state));
    }
    componentDidUpdate(prevProps, prevStates) {
        const { getPaymentTokenHistroy: dispatchGetPaymentTokenHistroy } = this.props;
        if (prevStates !== this.state) {
            dispatchGetPaymentTokenHistroy(Object.assign({}, this.state));
        }
    }
    onChange(pagination, filters, sorter) {
        const oldState = this.state;
        this.setState(utils_1.getSearchData(pagination, filters, sorter, oldState));
    }
    onDateChange(_, dateStrings) {
        const oldState = this.state;
        this.setState(Object.assign(Object.assign({}, oldState), { fromDate: dateStrings[0], toDate: dateStrings[1] }));
    }
    render() {
        const { data, searching, total } = this.props;
        const { limit } = this.state;
        const paymentHistoryprops = {
            paymentTokenHistory: data,
            searching,
            total,
            onChange: this.onChange.bind(this),
            pageSize: limit
        };
        return (<>
        <head_1.default>
          <title>Payment Token History</title>
        </head_1.default>
        <div className="payment-token-history">
          <page_header_1.default title="Payment Token History"/>
          <div className="ant-page-header">
            <antd_1.DatePicker.RangePicker onChange={this.onDateChange.bind(this)}/>
          </div>
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
