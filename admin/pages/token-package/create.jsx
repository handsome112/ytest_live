"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const antd_1 = require("antd");
const icons_1 = require("@ant-design/icons");
const page_1 = __importDefault(require("@components/common/layout/page"));
const head_1 = __importDefault(require("next/head"));
const link_1 = __importDefault(require("next/link"));
const react_1 = require("react");
const services_1 = require("src/services");
const router_1 = __importDefault(require("next/router"));
const utils_1 = require("@lib/utils");
const form_1 = require("src/components/token-package/form");
const react_redux_1 = require("react-redux");
class TokenPackageCreatePage extends react_1.PureComponent {
    constructor(props) {
        super(props);
        this.state = { submitting: false };
    }
    handleCreate(data) {
        this.setState({ submitting: true });
        services_1.tokenPackageService.create(data).then(() => {
            antd_1.message.success("Created successfully");
            router_1.default.push("/token-package");
        }).catch((e) => {
            const err = Promise.resolve(e);
            antd_1.message.error(utils_1.getResponseError(err));
            this.setState({ submitting: false });
        });
    }
    render() {
        console.log(this.props.settings);
        return (<>
        <head_1.default>
          <title>Create Token Package</title>
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
            <antd_1.Breadcrumb.Item>Create Token</antd_1.Breadcrumb.Item>
          </antd_1.Breadcrumb>
        </div>
        <page_1.default>
          <form_1.FormTokenPackage onFinish={this.handleCreate.bind(this)} submitting={this.state.submitting} {...this.props}/>
        </page_1.default>
      </>);
    }
}
const mapStates = (state) => ({
    settings: state.settings
});
exports.default = react_redux_1.connect(mapStates)(TokenPackageCreatePage);
