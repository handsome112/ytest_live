"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const head_1 = __importDefault(require("next/head"));
const react_1 = require("react");
const antd_1 = require("antd");
const page_1 = __importDefault(require("@components/common/layout/page"));
const AccountForm_1 = require("@components/performer/AccountForm");
const Document_1 = require("@components/performer/Document");
const Schedule_1 = require("@components/performer/Schedule");
const next_cookies_1 = __importDefault(require("next-cookies"));
const index_1 = require("@services/index");
const loader_1 = __importDefault(require("@components/common/base/loader"));
const utils_service_1 = require("@services/utils.service");
const update_password_form_1 = require("@components/user/update-password-form");
const common_1 = require("@components/common");
const socialsForm_1 = require("@components/performer/socialsForm");
const commission_setting_1 = require("@components/performer/commission-setting");
const layout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 16 }
};
class PerformerUpdate extends react_1.PureComponent {
    constructor() {
        super(...arguments);
        this.formRef = react_1.createRef();
        this.state = {
            pwUpdating: false,
            updating: false,
            fetching: false,
            performer: {},
            settingUpdating: false
        };
        this.customFields = {};
        this.scheduleValue = {
            mon: {
                start: '00:00',
                end: '',
                closed: true
            },
            tue: {
                start: '00:00',
                end: '',
                closed: true
            },
            wed: {
                start: '00:00',
                end: '',
                closed: true
            },
            thu: {
                start: '00:00',
                end: '',
                closed: true
            },
            fri: {
                start: '00:00',
                end: '',
                closed: true
            },
            sat: {
                start: '00:00',
                end: '',
                closed: true
            },
            sun: {
                start: '00:00',
                end: '',
                closed: true
            }
        };
        this.dates = null;
    }
    static async getInitialProps({ ctx }) {
        try {
            const { token } = next_cookies_1.default(ctx);
            const [countries, languages, phoneCodes, categories, studios] = await Promise.all([
                utils_service_1.utilsService.countriesList(),
                utils_service_1.utilsService.languagesList(),
                utils_service_1.utilsService.phoneCodesList(),
                index_1.performerCategoryService.search({
                    sortBy: 'ordering',
                    sort: 'asc',
                    limit: 100
                }),
                index_1.studioService.search({
                    limit: 100
                }, {
                    Authorization: token
                })
            ]);
            return Object.assign({ countries: countries.data, languages: languages.data, phoneCodes: phoneCodes.data, studios: studios.data.data, categories: categories.data && categories.data.data ? categories.data.data : [] }, ctx.query);
        }
        catch (e) {
            const error = await Promise.resolve(e);
            console.log(error);
            return;
        }
    }
    async componentDidMount() {
        try {
            this.setState({ fetching: true });
            const resp = await index_1.performerService.findById(this.props.id);
            this.setState({ performer: resp.data });
            if (resp.data && resp.data.schedule) {
                this.scheduleValue = Object.assign(Object.assign({}, this.scheduleValue), resp.data.schedule);
            }
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
            const updated = await index_1.performerService.update(this.props.id, Object.assign(Object.assign(Object.assign({}, data), this.customFields), { schedule: this.scheduleValue }));
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
            await index_1.authService.updatePassword(data.password, this.props.id, 'performer');
            antd_1.message.success('Password has been updated!');
        }
        catch (e) {
            antd_1.message.error('An error occurred, please try again!');
        }
        finally {
            this.setState({ pwUpdating: false });
        }
    }
    onUploaded(field, resp) {
        this.customFields[field] = resp.response.data._id;
    }
    onUpdateSocials(values) {
        const { performer } = this.state;
        const data = Object.assign(Object.assign({}, performer), values);
        this.submit(data);
    }
    onFormRefSubmit() {
        this.formRef.formRefSubmit();
    }
    onChangeTime(dates, dateStrings, key) {
        this.dates = dates;
        const start = dateStrings[0];
        const end = dateStrings[1];
        const objectKey = this.scheduleValue[key];
        objectKey['start'] = start;
        objectKey['end'] = end;
        this.scheduleValue[key] = Object.assign(Object.assign({}, this.scheduleValue[key]), objectKey);
    }
    onChangeCloded(checked, key) {
        const objectKey = this.scheduleValue[key];
        objectKey['closed'] = checked;
        this.scheduleValue[key] = Object.assign(Object.assign({}, this.scheduleValue[key]), objectKey);
    }
    async updateCommissionSetting(data) {
        try {
            this.setState({ settingUpdating: true });
            await index_1.performerService.updateCommissionSetting(this.props.id, Object.assign(Object.assign({}, data), { performerId: this.props.id }));
            antd_1.message.success('Commission setting has been updated!');
        }
        catch (error) {
            antd_1.message.error('An error occurred, please try again!');
        }
        finally {
            this.setState({ settingUpdating: false });
        }
    }
    render() {
        const { pwUpdating, performer, updating, fetching, settingUpdating } = this.state;
        return (<react_1.Fragment>
        <head_1.default>
          <title>Performer update</title>
        </head_1.default>
        <common_1.BreadcrumbComponent breadcrumbs={[
                { title: 'Performers', href: '/performer' },
                { title: performer.username },
                { title: 'Update' }
            ]}/>
        <page_1.default>
          {fetching ? (<loader_1.default />) : (<antd_1.Tabs defaultActiveKey="basic" tabPosition="left" {...layout}>
              <antd_1.Tabs.TabPane tab={<span>General info</span>} key="basic">
                <AccountForm_1.AccountForm ref={(el) => (this.formRef = el)} onUploaded={this.onUploaded.bind(this)} onFinish={this.submit.bind(this)} performer={performer} submiting={updating} {...this.props}/>
              </antd_1.Tabs.TabPane>
              <antd_1.Tabs.TabPane tab={<span>Socials</span>} key="socials">
                <socialsForm_1.SocialsForm ref={(el) => (this.formRef = el)} socials={performer.socials ? performer.socials : {}} onFinish={this.onUpdateSocials.bind(this)} submiting={updating}/>
              </antd_1.Tabs.TabPane>
              <antd_1.Tabs.TabPane tab={<span>Change password</span>} key="password">
                <update_password_form_1.UpdatePaswordForm onFinish={this.updatePassword.bind(this)} updating={pwUpdating}/>
              </antd_1.Tabs.TabPane>
              <antd_1.Tabs.TabPane tab={<span>Document</span>} key="document">
                <Document_1.PerformerDocument update={true} submiting={updating} onUploaded={this.onUploaded.bind(this)} onFormRefSubmit={this.onFormRefSubmit.bind(this)} performer={performer}/>
              </antd_1.Tabs.TabPane>
              <antd_1.Tabs.TabPane tab={<span>Schedule</span>} key="schedule">
                <Schedule_1.PerformerSchedule scheduleValue={this.scheduleValue} onChangeTime={this.onChangeTime.bind(this)} submiting={updating} onFormRefSubmit={this.onFormRefSubmit.bind(this)} onChangeCloded={this.onChangeCloded.bind(this)}/>
              </antd_1.Tabs.TabPane>
              <antd_1.Tabs.TabPane tab={<span>Commission Setting</span>} key="commission">
                <commission_setting_1.CommissionSettingForm submiting={settingUpdating} onFinish={this.updateCommissionSetting.bind(this)} commissionSetting={performer.commissionSetting}/>
              </antd_1.Tabs.TabPane>
            </antd_1.Tabs>)}
        </page_1.default>
      </react_1.Fragment>);
    }
}
exports.default = PerformerUpdate;
