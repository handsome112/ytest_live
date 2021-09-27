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
const head_1 = __importDefault(require("next/head"));
const antd_1 = require("antd");
const page_header_1 = __importDefault(require("@components/common/layout/page-header"));
const list_item_1 = __importDefault(require("@components/common/base/list-item"));
const router_1 = __importDefault(require("next/router"));
const react_redux_1 = require("react-redux");
const actions_1 = require("src/redux/performer/actions");
const form_1 = __importDefault(require("@components/schedules/form"));
const utils_1 = require("src/lib/utils");
const lib_1 = require("src/lib");
const moment_1 = __importDefault(require("moment"));
require("./index.less");
class PerformerProfilePage extends react_1.PureComponent {
    constructor(props) {
        super(props);
        this.state = {};
    }
    static getInitialProps({ ctx }) {
        const { query } = ctx;
        return {
            action: query.action
        };
    }
    componentDidMount() { }
    componentDidUpdate(prevProps) {
        const { updateSuccess, updateError } = this.props;
        if (prevProps.updateSuccess !== updateSuccess && updateSuccess) {
            antd_1.message.success('Update Profile Success.');
        }
        if (prevProps.updateError !== updateError && updateError) {
            antd_1.message.error(utils_1.getResponseError(updateError));
        }
    }
    onTabsChange(key) {
        router_1.default.push({
            pathname: '/account/performer/schedules',
            query: { action: key }
        }, `/account/performer/schedules?action=${key}`, { shallow: false });
    }
    onFinish(data) {
        const { performer, updatePerformerProfile: dispatchUpdatePerformerProfile } = this.props;
        dispatchUpdatePerformerProfile(Object.assign(Object.assign({}, performer), data));
    }
    render() {
        const { action, performer, updating } = this.props;
        const schedule = performer.schedule || utils_1.getDefaultSchedule();
        return (<>
        <head_1.default>
          <title>Scheduling</title>
        </head_1.default>
        <div className="performer-schedule-page">
          <page_header_1.default title="Schedules"/>
          <antd_1.Tabs activeKey={action || 'schedules'} style={{ padding: '0 24px' }} size="large" onChange={this.onTabsChange.bind(this)}>
            <antd_1.Tabs.TabPane tab="Schedules" key="schedules">
              <antd_1.Row>
                <antd_1.Col sm={{ span: 12 }} xs={{ span: 24 }}>
                  <antd_1.List itemLayout="horizontal">
                    <list_item_1.default title="Next Show" description={utils_1.getNextShow(schedule)} titleLayout={{ sm: { span: 6 }, xs: { span: 12 } }} descriptionLayout={{ sm: { span: 18 }, xs: { span: 12 } }}/>
                    {Object.keys(schedule).map((key) => (<list_item_1.default title={lib_1.formatDate(moment_1.default().day(key).toDate(), 'dddd')} description={!schedule[key].closed
                    // `${performer.schedule[key].start}`
                    && `${schedule[key].start} - ${schedule[key].end}`} titleLayout={{ sm: { span: 6 }, xs: { span: 12 } }} descriptionLayout={{
                    sm: { span: 18 },
                    xs: { span: 12 }
                }} key={key}/>))}
                  </antd_1.List>
                </antd_1.Col>
              </antd_1.Row>
            </antd_1.Tabs.TabPane>
            <antd_1.Tabs.TabPane tab="Edit Schedule Details" key="edit-schedules">
              <form_1.default onFinish={this.onFinish.bind(this)} schedule={schedule} updating={updating}/>
            </antd_1.Tabs.TabPane>
          </antd_1.Tabs>
        </div>
      </>);
    }
}
PerformerProfilePage.authenticate = true;
PerformerProfilePage.layout = 'primary';
const mapStateToProps = (state) => ({
    performer: state.performer.current,
    updating: state.performer.updating,
    updateSuccess: state.performer.updateSuccess,
    updateError: state.performer.updateError,
    categoriesData: state.performer.categories.data
});
const mapDispatchs = { updatePerformerProfile: actions_1.updatePerformerProfile, updateCurrentPerformer: actions_1.updateCurrentPerformer };
exports.default = react_redux_1.connect(mapStateToProps, mapDispatchs)(PerformerProfilePage);
