"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const head_1 = __importDefault(require("next/head"));
const react_1 = require("react");
const page_1 = __importDefault(require("@components/common/layout/page"));
const link_1 = __importDefault(require("next/link"));
const antd_1 = require("antd");
const icons_1 = require("@ant-design/icons");
const perfomer_category_service_1 = require("@services/perfomer-category.service");
const router_1 = __importDefault(require("next/router"));
class CategoryCreate extends react_1.PureComponent {
    constructor() {
        super(...arguments);
        this.state = {
            submitting: false
        };
    }
    async submit(data) {
        try {
            this.setState({ submitting: true });
            const submitData = Object.assign({}, data);
            const resp = await perfomer_category_service_1.performerCategoryService.create(submitData);
            antd_1.message.success('Created successfully');
            router_1.default.back();
            // TODO - redirect
        }
        catch (e) {
            // TODO - check and show error here
            const err = (await Promise.resolve(e)) || {};
            antd_1.message.error(err.message || 'An error occurred, please try again!');
        }
        finally {
            this.setState({ submitting: false });
        }
    }
    render() {
        return (<react_1.Fragment>
        <head_1.default>
          <title>Create new category</title>
        </head_1.default>
        <div style={{ marginBottom: '16px' }}>
          <antd_1.Breadcrumb>
            <antd_1.Breadcrumb.Item href="/dashboard">
              <icons_1.HomeOutlined />
            </antd_1.Breadcrumb.Item>
            <antd_1.Breadcrumb.Item>
              <link_1.default href={'/performer/category'} as={'/performer/category'}>
                <a>{'Categories'}</a>
              </link_1.default>
            </antd_1.Breadcrumb.Item>
            <antd_1.Breadcrumb.Item>Create new category</antd_1.Breadcrumb.Item>
          </antd_1.Breadcrumb>
        </div>

        <page_1.default>
          <antd_1.Form onFinish={this.submit.bind(this)} initialValues={{
                name: '',
                slug: '',
                ordering: 0,
                description: ''
            }} labelCol={{ span: 4 }} wrapperCol={{ span: 20 }}>
            <antd_1.Form.Item name="name" rules={[{ required: true, message: 'Please input name!' }]} label="Name">
              <antd_1.Input placeholder="Enter category name"/>
            </antd_1.Form.Item>

            <antd_1.Form.Item name="slug" label="Slug">
              <antd_1.Input placeholder="Custom friendly slug"/>
            </antd_1.Form.Item>

            <antd_1.Form.Item name="ordering" label="Ordering">
              <antd_1.InputNumber />
            </antd_1.Form.Item>

            <antd_1.Form.Item name="description" label="Description">
              <antd_1.Input.TextArea rows={3}/>
            </antd_1.Form.Item>

            <antd_1.Button type="primary" htmlType="submit" style={{ float: 'right' }} loading={this.state.submitting}>
              Submit
            </antd_1.Button>
          </antd_1.Form>
        </page_1.default>
      </react_1.Fragment>);
    }
}
exports.default = CategoryCreate;
