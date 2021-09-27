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
const head_1 = __importDefault(require("next/head"));
const react_1 = require("react");
const page_1 = __importDefault(require("@components/common/layout/page"));
const dynamic_1 = __importDefault(require("next/dynamic"));
const antd_1 = require("antd");
const icons_1 = require("@ant-design/icons");
const loader_1 = __importDefault(require("@components/common/base/loader"));
const email_template_service_1 = require("@services/email-template.service");
const WYSIWYG = dynamic_1.default(() => Promise.resolve().then(() => __importStar(require('@components/wysiwyg'))), {
    ssr: false
});
class EmailTemplateUpdate extends react_1.PureComponent {
    constructor() {
        super(...arguments);
        this._content = '';
        this.state = {
            submitting: false,
            fetching: true,
            template: null
        };
    }
    static async getInitialProps({ ctx }) {
        const { query } = ctx;
        return query;
    }
    async componentDidMount() {
        try {
            const { id } = this.props;
            const resp = await email_template_service_1.emailTemplateService.findById(id);
            this._content = resp.data.content;
            this.setState({ template: resp.data });
        }
        catch (e) {
            antd_1.message.error('Email template not found!');
        }
        finally {
            this.setState({ fetching: false });
        }
    }
    async submit(data) {
        try {
            this.setState({ submitting: true });
            const { id } = this.props;
            const submitData = Object.assign(Object.assign({}, data), { content: this._content });
            await email_template_service_1.emailTemplateService.update(id, submitData);
            antd_1.message.success('Updated successfully');
            this.setState({ submitting: false });
        }
        catch (e) {
            // TODO - check and show error here
            antd_1.message.error('Something went wrong, please try again!');
            this.setState({ submitting: false });
        }
    }
    contentChange(content) {
        this._content = content.html;
    }
    render() {
        const { template, fetching, submitting } = this.state;
        return (<>
        <head_1.default>
          <title>Update template</title>
        </head_1.default>
        <div style={{ marginBottom: '16px' }}>
          <antd_1.Breadcrumb>
            <antd_1.Breadcrumb.Item href="/dashboard">
              <icons_1.HomeOutlined />
            </antd_1.Breadcrumb.Item>
            <antd_1.Breadcrumb.Item href="/email-templates">
              <span>Email templates</span>
            </antd_1.Breadcrumb.Item>
            <antd_1.Breadcrumb.Item>{template === null || template === void 0 ? void 0 : template.name}</antd_1.Breadcrumb.Item>
            <antd_1.Breadcrumb.Item>Update</antd_1.Breadcrumb.Item>
          </antd_1.Breadcrumb>
        </div>

        <page_1.default>
          {!template || fetching ? (<loader_1.default />) : (<antd_1.Form onFinish={this.submit.bind(this)} initialValues={template} labelCol={{ span: 4 }} wrapperCol={{ span: 20 }}>
              <antd_1.Form.Item name="subject" rules={[{ required: true, message: 'Please enter subject!' }]} label="Subject">
                <antd_1.Input placeholder="Enter your title"/>
              </antd_1.Form.Item>

              <antd_1.Form.Item label="Content">
                <WYSIWYG onChange={this.contentChange.bind(this)} html={this._content}/>
                <p><i>{template === null || template === void 0 ? void 0 : template.description}</i></p>
              </antd_1.Form.Item>
              <antd_1.Form.Item name="layout" label="Layout">
                <antd_1.Select>
                  <antd_1.Select.Option value="layouts/default">Default</antd_1.Select.Option>
                  <antd_1.Select.Option value="blank">Blank</antd_1.Select.Option>
                </antd_1.Select>
              </antd_1.Form.Item>

              <antd_1.Form.Item wrapperCol={{ offset: 4 }}>
                <antd_1.Button type="primary" htmlType="submit" style={{ float: 'right' }} loading={submitting}>
                  Submit
                </antd_1.Button>
              </antd_1.Form.Item>
            </antd_1.Form>)}
        </page_1.default>
      </>);
    }
}
exports.default = EmailTemplateUpdate;
