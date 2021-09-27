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
const actions_1 = require("@redux/studio/actions");
const studio_performer_request_table_1 = __importDefault(require("src/components/payout-request/studio-performer-request-table"));
const utils_1 = require("@lib/utils");
require("./index.less");
class PerformerPayoutRequestPage extends react_1.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            limit: 12,
            offset: 0,
            sortBy: 'createdAt',
            sort: 'desc'
        };
    }
    componentDidMount() {
        const { getPerformerRequest: dispatchGetPerformerRequest } = this.props;
        dispatchGetPerformerRequest(this.state);
    }
    componentDidUpdate(preProps, prevStates) {
        const { getPerformerRequest: dispatchGetPerformerRequest, error } = this.props;
        if (prevStates !== this.state) {
            dispatchGetPerformerRequest(this.state);
        }
        if (error && error !== preProps.error) {
            antd_1.message.error(utils_1.getResponseError(error));
        }
    }
    onChange(pagination, filters, sorter) {
        const oldState = this.state;
        this.setState(utils_1.getSearchData(pagination, filters, sorter, oldState));
    }
    render() {
        const { data, searching, total } = this.props;
        const { limit } = this.state;
        return (<>
        <head_1.default>
          <title>Performer Payout Request</title>
        </head_1.default>
        <div className="payout-request-page">
          <page_header_1.default title="Performer Payout Request"/>
          <studio_performer_request_table_1.default payouts={data} searching={searching} total={total} onChange={this.onChange.bind(this)} pageSize={limit}/>
        </div>
      </>);
    }
}
PerformerPayoutRequestPage.authenticate = 'studio';
PerformerPayoutRequestPage.layout = 'primary';
const mapStateToProps = (state) => (Object.assign({}, state.studio.performerRequests));
const mapDispatch = { getPerformerRequest: actions_1.getPerformerRequest };
exports.default = react_redux_1.connect(mapStateToProps, mapDispatch)(PerformerPayoutRequestPage);
