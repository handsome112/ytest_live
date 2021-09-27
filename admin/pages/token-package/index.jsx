"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const icons_1 = require("@ant-design/icons");
const head_1 = __importDefault(require("next/head"));
const antd_1 = require("antd");
const page_1 = __importDefault(require("@components/common/layout/page"));
const react_1 = require("react");
const search_filter_1 = require("@components/common/search-filter");
const services_1 = require("src/services");
const table_list_1 = require("src/components/token-package/table-list");
const utils_1 = require("@lib/utils");
const loader_1 = __importDefault(require("@components/common/base/loader"));
class TokenPage extends react_1.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            filter: {
                sortBy: 'updatedAt',
                sort: 'desc'
            },
            packageList: [],
            q: ""
        };
    }
    componentDidMount() {
        this.getData();
    }
    async getData() {
        const resp = await services_1.tokenPackageService.list({
            limit: 100,
            offset: 0,
            q: this.state.q
        });
        await this.setState({ packageList: resp.data.data, loading: false });
    }
    async searchByName(k) {
        console.log(k);
        await this.setState({ q: k.q });
        this.getData();
    }
    handleDelete(id) {
        const { packageList } = this.state;
        services_1.tokenPackageService
            .delete(id)
            .then(() => {
            this.setState({ packageList: packageList.filter(packageId => packageId._id !== id) });
            return antd_1.message.success('Deleted successfully');
        })
            .catch((e) => {
            const err = Promise.resolve(e);
            return antd_1.message.error(utils_1.getResponseError(err));
        });
    }
    render() {
        const { packageList, loading } = this.state;
        return (<>
        <head_1.default>
          <title>Token Packages</title>
        </head_1.default>
        <div style={{ marginBottom: '16px' }}>
          <antd_1.Breadcrumb>
            <antd_1.Breadcrumb.Item href="/dashboard">
              <icons_1.HomeOutlined />
            </antd_1.Breadcrumb.Item>
            <antd_1.Breadcrumb.Item>Token Packages</antd_1.Breadcrumb.Item>
          </antd_1.Breadcrumb>
        </div>
        {loading ? (<loader_1.default />) : (<page_1.default>
            <search_filter_1.SearchFilter onSubmit={this.searchByName.bind(this)}/>
            <table_list_1.TokenPackageTable dataSource={packageList} rowKey="_id" delete={this.handleDelete.bind(this)}/>
          </page_1.default>)}
      </>);
    }
}
exports.default = TokenPage;
