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
const studio_account_form_1 = __importDefault(require("@components/studio/studio-account-form"));
const common_1 = require("@components/common");
const lodash_1 = require("lodash");
class StudioCreate extends react_1.PureComponent {
    constructor() {
        super(...arguments);
        this.state = {
            creating: false,
            fetching: false
        };
        this.customFields = {};
    }
    static async getInitialProps() {
        const [countries, categories] = await Promise.all([
            utils_service_1.utilsService.countriesList(),
            utils_service_1.utilsService.languagesList(),
            index_1.performerCategoryService.search({
                sortBy: 'ordering',
                sort: 'asc',
                limit: 100
            })
        ]);
        return {
            countries: countries.data
        };
    }
    onBeforeUpload(file) {
        this._document = file;
    }
    async submit(data) {
        try {
            if (data.password !== data.rePassword) {
                return antd_1.message.error('Confirm password mismatch!');
            }
            if (!utils_1.validateUsername(data.username)) {
                return antd_1.message.error('Username is invalid!');
            }
            data = lodash_1.omit(data, ['rePassword']);
            this.setState({ creating: true });
            const resp = await index_1.studioService.create(Object.assign(Object.assign({}, data), this.customFields));
            router_1.default.push({
                pathname: '/studios'
            }, `/studios`, {
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
    render() {
        const { creating } = this.state;
        const { countries } = this.props;
        return (<react_1.Fragment>
        <head_1.default>
          <title>Create Studio</title>
        </head_1.default>
        <common_1.BreadcrumbComponent breadcrumbs={[
                { title: 'Studio', href: '/studios' },
                { title: 'Create new Studio' }
            ]}/>
        <page_1.default>
          <antd_1.Tabs defaultActiveKey="basic" tabPosition="left">
            <antd_1.Tabs.TabPane tab={<span>General info</span>} key="basic">
              <studio_account_form_1.default onFinish={this.submit.bind(this)} submiting={creating} countries={countries}/>
            </antd_1.Tabs.TabPane>
          </antd_1.Tabs>
        </page_1.default>
      </react_1.Fragment>);
    }
}
exports.default = StudioCreate;
