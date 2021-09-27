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
const profile_detail_1 = __importDefault(require("@components/performer/profile-detail"));
const router_1 = __importDefault(require("next/router"));
const react_redux_1 = require("react-redux");
const actions_1 = require("src/redux/performer/actions");
const services_1 = require("src/services");
const profile_edit_form_1 = __importDefault(require("@components/performer/profile-edit-form"));
const utils_1 = require("src/lib/utils");
const image_upload_1 = require("@components/file/image-upload");
require("./index.less");
const file_1 = require("@lib/file");
class PerformerProfilePage extends react_1.PureComponent {
    constructor(props) {
        super(props);
    }
    static getInitialProps({ ctx }) {
        const { query } = ctx;
        return {
            action: query.action
        };
    }
    componentDidUpdate(prevProps) {
        const { updateSuccess, updateError } = this.props;
        if (updateSuccess && prevProps.updateSuccess !== updateSuccess) {
            antd_1.message.success('Update Profile Success.');
        }
        if (prevProps.updateError !== updateError && updateError) {
            antd_1.message.error(utils_1.getResponseError(updateError));
        }
    }
    onTabsChange(key) {
        router_1.default.push({
            pathname: '/account/performer/profile',
            query: { action: key }
        }, `/account/performer/profile?action=${key}`, { shallow: false });
    }
    onFinish(data) {
        const { performer, updatePerformerProfile: dispatchupDatePerformerProfile } = this.props;
        dispatchupDatePerformerProfile(Object.assign(Object.assign({}, performer), data));
    }
    onUploadedAvatar(data) {
        const { performer, updatePerformerProfileSuccess: dispatchUpdatePerformerProfileSuccess, setupdatingPerformerProfile: dispatchSetUpdating } = this.props;
        dispatchSetUpdating();
        dispatchUpdatePerformerProfileSuccess(Object.assign(Object.assign({}, performer), { avatar: data.response.data.url }));
    }
    render() {
        const { action, performer, categoriesData, updating, countries } = this.props;
        const uploadHeaders = {
            authorization: services_1.authService.getToken()
        };
        return (<>
        <head_1.default>
          <title>My Profile</title>
        </head_1.default>
        <div className="performer-profile-page">
          <page_header_1.default title="My Profile"/>
          <antd_1.Tabs activeKey={action || 'profile-image'} style={{ padding: '0 24px' }} size="large" onChange={this.onTabsChange.bind(this)}>
            <antd_1.Tabs.TabPane tab="Profile Image" key="profile-image">
              <antd_1.Form.Item label="Profile Image">
                <image_upload_1.ImageUpload options={{ fieldName: 'avatar' }} imageUrl={performer === null || performer === void 0 ? void 0 : performer.avatar} uploadUrl={services_1.performerService.getAvatarUploadUrl()} headers={uploadHeaders} beforeUpload={file_1.beforeAvatarUpload} onUploaded={this.onUploadedAvatar.bind(this)}/>
              </antd_1.Form.Item>
            </antd_1.Tabs.TabPane>
            <antd_1.Tabs.TabPane tab="My Profile" key="profile">
              <profile_detail_1.default performer={performer}/>
            </antd_1.Tabs.TabPane>
            <antd_1.Tabs.TabPane tab="Edit Profile" key="edit-profile">
              <profile_edit_form_1.default {...performer} categoriesData={categoriesData} countries={countries} onFinish={this.onFinish.bind(this)} loading={updating}/>
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
    categoriesData: state.performer.categories.data,
    countries: state.settings.countries
});
const mapDispatchs = {
    updatePerformerProfile: actions_1.updatePerformerProfile,
    updateCurrentPerformer: actions_1.updateCurrentPerformer,
    updatePerformerProfileSuccess: actions_1.updatePerformerProfileSuccess,
    setupdatingPerformerProfile: actions_1.setupdatingPerformerProfile
};
exports.default = react_redux_1.connect(mapStateToProps, mapDispatchs)(PerformerProfilePage);
