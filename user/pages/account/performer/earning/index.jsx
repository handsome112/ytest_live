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
const react_redux_1 = require("react-redux");
const actions_1 = require("@redux/performer/actions");
const earning_history_table_1 = __importDefault(require("@components/performer/earning-history-table"));
const lib_1 = require("src/lib");
const numberformat_1 = __importDefault(require("@components/common/layout/numberformat"));
require("./index.less");
class PerformerProductsPage extends react_1.PureComponent {
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
        const { getEarning: dispatchGetEarning } = this.props;
        dispatchGetEarning(this.state);
    }
    componentDidUpdate(_, prevStates) {
        const { getEarning: dispatchGetEarning } = this.props;
        if (prevStates !== this.state) {
            dispatchGetEarning(this.state);
        }
    }
    onChange(pagination, filters, sorter) {
        const oldState = Object.assign({}, this.state);
        this.setState(lib_1.getSearchData(pagination, filters, sorter, oldState));
    }
    setDateRanger(_, dateStrings) {
        if (!dateStrings[0] && !dateStrings[1]) {
            this.setState({
                toDate: null,
                fromDate: null,
                sortBy: 'createdAt',
                sort: 'desc'
            });
            return;
        }
        if (!dateStrings[0] || !dateStrings[1])
            return;
        this.setState({ fromDate: dateStrings[0], toDate: dateStrings[1] });
    }
    render() {
        const { data, searching, total, performer, stats, success } = this.props;
        const { limit } = this.state;
        return (<>
        <head_1.default>
          <title>Earnings</title>
        </head_1.default>
        <div className="earning-history-page">
          <page_header_1.default title="My Earning"/>
          <antd_1.Row className="ant-page-header">
            <antd_1.Col md={12} xs={24}>
              <antd_1.Space>
                <span>My Balance:</span>
                <span style={{ color: lib_1.defaultColor.primaryColor }}>
                  <numberformat_1.default value={performer.balance || 0}/>
                </span>
              </antd_1.Space>
              <div>
                <antd_1.DatePicker.RangePicker disabledDate={() => searching} onCalendarChange={this.setDateRanger.bind(this)}/>
              </div>
            </antd_1.Col>
            <antd_1.Col md={12} xs={24}>
              {success && stats && (<antd_1.Space size="large">
                  <antd_1.Statistic title="Paid Tokens" value={stats.data.paidPrice} precision={2} decimalSeparator="," groupSeparator="."/>
                  <antd_1.Statistic title="Remaining Tokens" value={stats.data.remainingPrice} precision={2} decimalSeparator="," groupSeparator="."/>
                  <antd_1.Statistic title="Total Tokens" value={stats.data.totalPrice} precision={2} decimalSeparator="," groupSeparator="."/>
                </antd_1.Space>)}
            </antd_1.Col>
          </antd_1.Row>
          <earning_history_table_1.default earnings={data} searching={searching} total={total} pageSize={limit} onChange={this.onChange.bind(this)}/>
        </div>
      </>);
    }
}
PerformerProductsPage.authenticate = true;
PerformerProductsPage.layout = 'primary';
const mapStateToProps = (state) => (Object.assign(Object.assign({}, state.performer.earning), { 
    // earning: state.performer.earning.data,
    performer: state.performer.current }));
const mapDispatch = { getEarning: actions_1.getEarning };
exports.default = react_redux_1.connect(mapStateToProps, mapDispatch)(PerformerProductsPage);
