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
const router_1 = __importDefault(require("next/router"));
const dynamic_1 = __importDefault(require("next/dynamic"));
const antd_1 = require("antd");
const icons_1 = require("@ant-design/icons");
const post_service_1 = require("@services/post.service");
const WYSIWYG = dynamic_1.default(() => Promise.resolve().then(() => __importStar(require('@components/wysiwyg'))), {
    ssr: false
});
class PostCreate extends react_1.PureComponent {
    constructor() {
        super(...arguments);
        this._content = '';
        this.state = {
            submitting: false
        };
    }
    static async getInitialProps({ ctx }) {
        const query = ctx.query;
        if (!query.type) {
            query.type = 'post';
        }
        return query;
    }
    async submit(data) {
        try {
            this.setState({ submitting: true });
            const submitData = Object.assign(Object.assign({}, data), { content: this._content, type: this.props.type });
            const resp = await post_service_1.postService.create(submitData);
            antd_1.message.success('Created successfully');
            // TODO - redirect
            this.setState({ submitting: false }, () => {
                window.setTimeout(() => {
                    router_1.default.push({
                        pathname: '/posts',
                        query: {
                            id: resp.data._id
                        }
                    }, `/posts`);
                }, 1000);
            });
        }
        catch (e) {
            // TODO - check and show error here
            antd_1.message.error('Something went wrong, please try again!');
            this.setState({ submitting: false });
        }
        finally {
            this.setState({ submitting: false });
        }
    }
    contentChange(content) {
        this._content = content.html;
    }
    render() {
        return (<react_1.Fragment>
        <head_1.default>
          <title>Create new post</title>
        </head_1.default>
        <div style={{ marginBottom: '16px' }}>
          <antd_1.Breadcrumb>
            <antd_1.Breadcrumb.Item href="/dashboard">
              <icons_1.HomeOutlined />
            </antd_1.Breadcrumb.Item>
            <antd_1.Breadcrumb.Item href="/posts">
              <span>Posts</span>
            </antd_1.Breadcrumb.Item>
            <antd_1.Breadcrumb.Item>Create new post</antd_1.Breadcrumb.Item>
          </antd_1.Breadcrumb>
        </div>

        <page_1.default>
          <antd_1.Form onFinish={this.submit.bind(this)} initialValues={{
                title: '',
                shortDescription: '',
                status: 'published'
            }} labelCol={{ span: 4 }} wrapperCol={{ span: 20 }}>
            <antd_1.Form.Item name="title" rules={[{ required: true, message: 'Please input title!' }]} label="Title">
              <antd_1.Input placeholder="Enter your title"/>
            </antd_1.Form.Item>

            <antd_1.Form.Item name="slug" label="Slug">
              <antd_1.Input placeholder="Custom friendly slug"/>
            </antd_1.Form.Item>

            <antd_1.Form.Item name="shortDescription" label="Short description">
              <antd_1.Input.TextArea rows={3}/>
            </antd_1.Form.Item>
            <antd_1.Form.Item label="Content">
              <WYSIWYG onChange={this.contentChange.bind(this)} html={this._content}/>
            </antd_1.Form.Item>
            <antd_1.Form.Item name="status" label="Status" rules={[{ required: true }]}>
              <antd_1.Select>
                <antd_1.Select.Option value="published">Publish</antd_1.Select.Option>
                <antd_1.Select.Option value="draft">Draft</antd_1.Select.Option>
              </antd_1.Select>
            </antd_1.Form.Item>
            <antd_1.Form.Item wrapperCol={{ offset: 4 }}>
              <antd_1.Button type="primary" htmlType="submit" style={{ float: 'right' }} loading={this.state.submitting}>
                Submit
              </antd_1.Button>
            </antd_1.Form.Item>
          </antd_1.Form>
        </page_1.default>
      </react_1.Fragment>);
    }
}
exports.default = PostCreate;
