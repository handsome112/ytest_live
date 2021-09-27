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
/* eslint-disable no-return-assign */
const antd_1 = require("antd");
const page_header_1 = __importDefault(require("@components/common/layout/page-header"));
const head_1 = __importDefault(require("next/head"));
const actions_1 = require("src/redux/studio/actions");
const react_1 = __importStar(require("react"));
const studio_commissions_table_1 = __importDefault(require("@components/studio/models-manager/studio-commissions-table"));
const react_redux_1 = require("react-redux");
require("./index.less");
const lib_1 = require("src/lib");
const popup_1 = __importDefault(require("@components/common/base/popup"));
const services_1 = require("src/services");
class StudioModelsPage extends react_1.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            limit: 12,
            offset: 0,
            sortBy: 'createdAt',
            sort: 'desc',
            filter: {},
            commissionId: null
        };
    }
    componentDidMount() {
        const { getMembersCommissions: dispatchGetMembersCommissions } = this.props;
        dispatchGetMembersCommissions(this.state);
    }
    componentDidUpdate(_, prevStates) {
        const { getMembersCommissions: dispatchGetMembersCommissions } = this.props;
        if (prevStates !== this.state) {
            dispatchGetMembersCommissions(this.state);
        }
    }
    handleTableChange(pagination, filters, sorter) {
        const oldState = this.state;
        this.setState(lib_1.getSearchData(pagination, filters, sorter, oldState));
    }
    async onOk() {
        const { updateMemberCommision: dispatchUpdateMemberCommision } = this.props;
        const { commissionId } = this.state;
        if (!commissionId || !this.inputRef)
            return;
        try {
            const { value } = this.inputRef.state;
            await services_1.studioService.updateMemberCommission(commissionId, parseInt(value, 10));
            dispatchUpdateMemberCommision({
                id: commissionId,
                memberCommission: parseInt(value, 10)
            });
            antd_1.message.success('Update success');
            this.popupRef && this.popupRef.setVisible(false);
        }
        catch (e) {
            const err = await Promise.resolve(e);
            antd_1.message.error(lib_1.getResponseError(err));
        }
    }
    update(id) {
        this.setState({ commissionId: id });
        this.popupRef && this.popupRef.setVisible(true);
    }
    render() {
        const { data, searching, total } = this.props;
        const { limit } = this.state;
        return (<>
        <head_1.default>
          <title>Commissions</title>
        </head_1.default>
        <popup_1.default ref={(ref) => (this.popupRef = ref)} content={(<antd_1.Input type="number" min={0} max={100} ref={(ref) => (this.inputRef = ref)}/>)} onOk={this.onOk.bind(this)}/>
        <div className="studio-commisson-background">
          <page_header_1.default title="Commissions"/>
          <div className="studio-commisson-box">
            <studio_commissions_table_1.default data={data} searching={searching} total={total} update={this.update.bind(this)} onChange={this.handleTableChange.bind(this)} pageSize={limit}/>
          </div>
        </div>
      </>);
    }
}
StudioModelsPage.authenticate = 'studio';
StudioModelsPage.layout = 'primary';
const mapStateToProps = (state) => (Object.assign({}, state.studio.commissions));
const mapDispatchs = { getMembersCommissions: actions_1.getMembersCommissions, updateMemberCommision: actions_1.updateMemberCommision };
exports.default = react_redux_1.connect(mapStateToProps, mapDispatchs)(StudioModelsPage);
