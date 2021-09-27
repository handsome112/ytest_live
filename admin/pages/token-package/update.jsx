"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const antd_1 = require("antd");
const icons_1 = require("@ant-design/icons");
const page_1 = __importDefault(require("@components/common/layout/page"));
const loader_1 = __importDefault(require("@components/common/base/loader"));
const head_1 = __importDefault(require("next/head"));
const link_1 = __importDefault(require("next/link"));
const react_1 = require("react");
const services_1 = require("src/services");
const router_1 = __importDefault(require("next/router"));
const utils_1 = require("@lib/utils");
const form_1 = require("src/components/token-package/form");
class TokenPackageUpdatePage extends react_1.PureComponent {
    static async getInitialProps({ ctx }) {
        return ctx.query;
    }
    constructor(props) {
        super(props);
        this.state = { submitting: false, loading: true, tokenPackage: {} };
    }
    componentDidMount() {
        if (!this.props.id) {
            antd_1.message.error("Package not found!");
            router_1.default.push("/token-package");
        }
        this.getData();
    }
    async getData() {
        const resp = await services_1.tokenPackageService.findOne(this.props.id);
        await this.setState({ loading: false, tokenPackage: resp.data });
    }
    handleUpdate(data) {
        console.log(data);
        this.setState({ submitting: true });
        services_1.tokenPackageService.update(this.props.id, data).then(() => {
            antd_1.message.success("Updated successfully");
            router_1.default.push("/token-package");
        }).catch((e) => {
            const err = Promise.resolve(e);
            antd_1.message.error(utils_1.getResponseError(err));
            this.setState({ submitting: false });
        });
    }
    render() {
        const { loading, tokenPackage } = this.state;
        return (<>
        <head_1.default>
          <title>Update Token Package</title>
        </head_1.default>
        <div style={{ marginBottom: '16px' }}>
          <antd_1.Breadcrumb>
            <antd_1.Breadcrumb.Item href="/dashboard">
              <icons_1.HomeOutlined />
            </antd_1.Breadcrumb.Item>
            <antd_1.Breadcrumb.Item>
              <link_1.default href={'/token-package'}>
                <a>{'Token Packages'}</a>
              </link_1.default>
            </antd_1.Breadcrumb.Item>
            <antd_1.Breadcrumb.Item>Update Token Package</antd_1.Breadcrumb.Item>
          </antd_1.Breadcrumb>
        </div>
        <page_1.default>
        {loading ? <loader_1.default /> : <form_1.FormTokenPackage onFinish={this.handleUpdate.bind(this)} submitting={this.state.submitting} tokenPackage={tokenPackage} {...this.props}/>}

        </page_1.default>
      </>);
    }
}
exports.default = TokenPackageUpdatePage;
