"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const head_1 = __importDefault(require("next/head"));
const react_1 = require("react");
const antd_1 = require("antd");
const page_1 = __importDefault(require("@components/common/layout/page"));
const studio_account_form_1 = __importDefault(require("@components/studio/studio-account-form"));
const index_1 = require("@services/index");
const loader_1 = __importDefault(require("@components/common/base/loader"));
const utils_service_1 = require("@services/utils.service");
const update_password_form_1 = require("@components/user/update-password-form");
const common_1 = require("@components/common");
const studio_commission_form_1 = __importDefault(require("@components/studio/studio-commission-form"));
const utils_1 = require("@lib/utils");
const studio_document_form_1 = require("@components/studio/studio-document-form");
class PerformerUpdate extends react_1.PureComponent {
    constructor() {
        super(...arguments);
        this.formRef = react_1.createRef();
        this.state = {
            pwUpdating: false,
            updating: false,
            fetching: false,
            studio: {},
            settingUpdating: false
        };
        this.customFields = {};
        this.dates = null;
    }
    static async getInitialProps({ ctx }) {
        const [countries] = await Promise.all([utils_service_1.utilsService.countriesList()]);
        return Object.assign({ countries: countries.data }, ctx.query);
    }
    async componentDidMount() {
        try {
            this.setState({ fetching: true });
            const resp = await index_1.studioService.findById(this.props.id);
            this.setState({ studio: resp.data });
        }
        catch (e) {
            antd_1.message.error('Error while fecting performer!');
        }
        finally {
            this.setState({ fetching: false });
        }
    }
    async submit(data) {
        try {
            this.setState({ updating: true });
            const updated = await index_1.studioService.update(this.props.id, Object.assign(Object.assign({}, data), this.customFields));
            this.setState({ performer: updated.data });
            antd_1.message.success('Updated successfully');
        }
        catch (e) {
            // TODO - exact error message
            antd_1.message.error('An error occurred, please try again!');
        }
        finally {
            this.setState({ updating: false });
        }
    }
    async updatePassword(data) {
        try {
            this.setState({ pwUpdating: true });
            await index_1.authService.updatePassword(data.password, this.props.id, 'studio');
            antd_1.message.success('Password has been updated!');
        }
        catch (e) {
            const err = await Promise.resolve(e);
            antd_1.message.error(utils_1.getResponseError(err) || 'An error occurred, please try again!');
        }
        finally {
            this.setState({ pwUpdating: false });
        }
    }
    onUploaded(field, resp) {
        this.customFields[field] = resp.response.data._id;
    }
    onBeforeUpload(file) {
        this._document = file;
    }
    onFormRefSubmit() {
        this.formRef.formRefSubmit();
    }
    async updateCommissionSetting(data) {
        try {
            this.setState({ settingUpdating: true });
            await index_1.studioService.updateStudioCommission(this.props.id, Object.assign(Object.assign({}, data), { studioId: this.props.id }));
            antd_1.message.success('Commission setting has been updated!');
        }
        catch (e) {
            const err = await Promise.resolve(e);
            antd_1.message.error(utils_1.getResponseError(err) || 'An error occurred, please try again!');
        }
        finally {
            this.setState({ settingUpdating: false });
        }
    }
    render() {
        const { pwUpdating, studio, updating, fetching, settingUpdating } = this.state;
        const { countries } = this.props;
        return (<react_1.Fragment>
        <head_1.default>
          <title>Studio update</title>
        </head_1.default>
        <common_1.BreadcrumbComponent breadcrumbs={[
                { title: 'Studios', href: '/studios' },
                { title: studio.username },
                { title: 'Update' }
            ]}/>
        <page_1.default>
          {fetching ? (<loader_1.default />) : studio ? (<antd_1.Tabs defaultActiveKey="basic" tabPosition="left">
              <antd_1.Tabs.TabPane tab={<span>General info</span>} key="basic">
                <studio_account_form_1.default ref={(el) => (this.formRef = el)} onFinish={this.submit.bind(this)} studio={studio} submiting={updating} countries={countries}/>
              </antd_1.Tabs.TabPane>
              <antd_1.Tabs.TabPane tab={<span>Change password</span>} key="password">
                <update_password_form_1.UpdatePaswordForm onFinish={this.updatePassword.bind(this)} updating={pwUpdating}/>
              </antd_1.Tabs.TabPane>
              <antd_1.Tabs.TabPane tab={<span>Commission Setting</span>} key="commission">
                <studio_commission_form_1.default submiting={settingUpdating} onFinish={this.updateCommissionSetting.bind(this)} commission={studio.commission}/>
              </antd_1.Tabs.TabPane>
              <antd_1.Tabs.TabPane tab={<span>Document</span>} key="document">
                <studio_document_form_1.StudioDocumentForm submiting={updating} onUploaded={this.onUploaded.bind(this)} studio={studio} method="PUT"/>
              </antd_1.Tabs.TabPane>
            </antd_1.Tabs>) : (<p>Studio not found!</p>)}
        </page_1.default>
      </react_1.Fragment>);
    }
}
exports.default = PerformerUpdate;
