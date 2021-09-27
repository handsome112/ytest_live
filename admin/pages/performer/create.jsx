"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const head_1 = __importDefault(require("next/head"));
const react_1 = require("react");
const antd_1 = require("antd");
const page_1 = __importDefault(require("@components/common/layout/page"));
const router_1 = __importDefault(require("next/router"));
const index_1 = require("@services/index");
const utils_service_1 = require("@services/utils.service");
const utils_1 = require("@lib/utils");
const AccountForm_1 = require("@components/performer/AccountForm");
const Document_1 = require("@components/performer/Document");
const Schedule_1 = require("@components/performer/Schedule");
const socialsForm_1 = require("@components/performer/socialsForm");
const common_1 = require("@components/common");
const commission_setting_1 = require("@components/performer/commission-setting");
const layout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 16 }
};
class PerformerCreate extends react_1.PureComponent {
    constructor() {
        super(...arguments);
        this.state = {
            creating: false,
            fetching: false
        };
        this.customFields = {};
        this.formRef = react_1.createRef();
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
        this.dates = [];
    }
    static async getInitialProps() {
        const [countries, languages, categories] = await Promise.all([
            utils_service_1.utilsService.countriesList(),
            utils_service_1.utilsService.languagesList(),
            index_1.performerCategoryService.search({
                sortBy: 'ordering',
                sort: 'asc',
                limit: 100
            })
        ]);
        return {
            countries: countries.data,
            languages: languages.data,
            categories: categories.data && categories.data.data ? categories.data.data : []
        };
    }
    async submit(data) {
        try {
            if (data.password !== data.rePassword) {
                return antd_1.message.error('Confirm password mismatch!');
            }
            if (!utils_1.validateUsername(data.username)) {
                return antd_1.message.error('Username is invalid!');
            }
            this.setState({ creating: true });
            const resp = await index_1.performerService.create(Object.assign(Object.assign(Object.assign({}, data), this.customFields), { schedule: this.scheduleValue }));
            antd_1.message.success('Updated successfully');
            router_1.default.push({
                pathname: '/performer/update',
                query: { id: resp.data._id }
            }, `/performer/update?id=${resp.data._id}`, {
                shallow: false
            });
        }
        catch (e) {
            const err = (await Promise.resolve(e)) || {};
            antd_1.message.error(utils_1.getResponseError(err) || 'An error occurred, please try again!');
        }
        finally {
            this.setState({ creating: false });
        }
    }
    onUploaded(field, resp) {
        this.customFields[field] = resp.response.data._id;
    }
    onFormRefSubmit() {
        this.formRef.formRefSubmit();
    }
    onChangeTime(dates, dateStrings, key) {
        this.dates = dates;
        const start = dateStrings[0];
        const end = dateStrings[1];
        let objectKey = this.scheduleValue[key];
        objectKey['start'] = start;
        objectKey['end'] = end;
        this.scheduleValue[key] = Object.assign(Object.assign({}, this.scheduleValue[key]), objectKey);
    }
    onChangeCloded(checked, key) {
        const objectKey = this.scheduleValue[key];
        objectKey['closed'] = checked;
        this.scheduleValue[key] = Object.assign(Object.assign({}, this.scheduleValue[key]), objectKey);
    }
    onCreateSocials(values) {
        this.customFields['socials'] = values;
    }
    onCreateCommissionSetting(values) {
        this.customFields['commissionSetting'] = values;
        this.onFormRefSubmit();
    }
    render() {
        const { creating } = this.state;
        const { countries, languages, categories } = this.props;
        return (<react_1.Fragment>
        <head_1.default>
          <title>Create performer</title>
        </head_1.default>
        <common_1.BreadcrumbComponent breadcrumbs={[
                { title: 'Performers', href: '/performer' },
                { title: 'Create new performer' }
            ]}/>
        <page_1.default>
          <antd_1.Tabs defaultActiveKey="basic" tabPosition="left" {...layout}>
            <antd_1.Tabs.TabPane tab={<span>General info</span>} key="basic">
              <AccountForm_1.AccountForm ref={(el) => (this.formRef = el)} onUploaded={this.onUploaded.bind(this)} onFinish={this.submit.bind(this)} submiting={creating} countries={countries} languages={languages} categories={categories}/>
            </antd_1.Tabs.TabPane>
            <antd_1.Tabs.TabPane tab={<span>Socials</span>} key="socials">
              <socialsForm_1.SocialsForm ref={(el) => (this.formRef = el)} socials={null} onFinish={this.onCreateSocials.bind(this)} submiting={creating}/>
            </antd_1.Tabs.TabPane>
            <antd_1.Tabs.TabPane tab={<span>Document</span>} key="document">
              <Document_1.PerformerDocument update={false} onUploaded={this.onUploaded.bind(this)} submiting={creating} onFormRefSubmit={this.onFormRefSubmit.bind(this)}/>
            </antd_1.Tabs.TabPane>
            <antd_1.Tabs.TabPane tab={<span>Schedule</span>} key="schedule">
              <Schedule_1.PerformerSchedule onChangeCloded={this.onChangeCloded.bind(this)} onChangeTime={this.onChangeTime.bind(this)} scheduleValue={this.scheduleValue} submiting={creating} onFormRefSubmit={this.onFormRefSubmit.bind(this)}/>
            </antd_1.Tabs.TabPane>
            <antd_1.Tabs.TabPane tab={<span>Commission Setting</span>} key="commission">
              <commission_setting_1.CommissionSettingForm submiting={creating} onFinish={this.onCreateCommissionSetting.bind(this)}/>
            </antd_1.Tabs.TabPane>
          </antd_1.Tabs>
        </page_1.default>
      </react_1.Fragment>);
    }
}
exports.default = PerformerCreate;
