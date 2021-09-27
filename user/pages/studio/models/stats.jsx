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
const actions_1 = require("src/redux/studio/actions");
const react_1 = __importStar(require("react"));
const search_online_status_1 = __importDefault(require("@components/studio/models-manager/search-online-status"));
const studio_models_stats_table_1 = __importDefault(require("@components/studio/models-manager/studio-models-stats-table"));
const react_redux_1 = require("react-redux");
require("./index.less");
const lib_1 = require("src/lib");
class StudioModelStatsPage extends react_1.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            limit: 12,
            offset: 0,
            sortBy: 'createdAt',
            sort: 'desc',
            filter: {}
        };
    }
    componentDidMount() {
        const { getMembers: dispatchGetMembers } = this.props;
        dispatchGetMembers(this.state);
    }
    componentDidUpdate(_, prevStates) {
        const { getMembers: dispatchGetMembers } = this.props;
        if (prevStates !== this.state) {
            dispatchGetMembers(this.state);
        }
    }
    handleTableChange(pagination, filters, sorter) {
        const state = Object.assign({}, this.state);
        this.setState(lib_1.getSearchData(pagination, filters, sorter, state));
    }
    onSearch(data) {
        this.setState(data);
    }
    render() {
        const { data, searching, total } = this.props;
        const { limit } = this.state;
        return (<>
        <head_1.default>
          <title>Performer Stats</title>
        </head_1.default>
        <div className="studio-models-background">
          <page_header_1.default title="Models"/>
          <div className="studio-models-box">
            <antd_1.Row>
              <antd_1.Col xs={24} sm={12}>
                <search_online_status_1.default searching={searching} onSearch={this.onSearch.bind(this)}/>
              </antd_1.Col>
              <antd_1.Col xs={24} sm={12}/>
            </antd_1.Row>
            <studio_models_stats_table_1.default data={data} searching={searching} total={total} onChange={this.handleTableChange.bind(this)} pageSize={limit}/>
          </div>
        </div>
      </>);
    }
}
StudioModelStatsPage.authenticate = 'studio';
StudioModelStatsPage.layout = 'primary';
const mapStateToProps = (state) => (Object.assign({}, state.studio.members));
const mapDispatchs = { getMembers: actions_1.getMembers };
exports.default = react_redux_1.connect(mapStateToProps, mapDispatchs)(StudioModelStatsPage);
