"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FormMenu = void 0;
const react_1 = require("react");
const antd_1 = require("antd");
const menu_tree_select_1 = require("./common/menu-tree.select");
const select_post_dropdown_1 = require("@components/post/select-post-dropdown");
const string_1 = require("@lib/string");
const link_1 = __importDefault(require("next/link"));
const icons_1 = require("@ant-design/icons");
class FormMenu extends react_1.PureComponent {
    constructor() {
        super(...arguments);
        this.state = {
            isPage: false,
            isInternal: false,
            path: ''
        };
    }
    componentDidMount() {
        if (!this.formRef)
            this.formRef = react_1.createRef();
        const { menu } = this.props;
        if (menu) {
            this.setState({
                isPage: menu.isPage,
                isInternal: menu.internal,
                path: menu.path
            });
        }
    }
    setFormVal(field, val) {
        const instance = this.formRef.current;
        instance.setFieldsValue({
            [field]: val
        });
    }
    render() {
        if (!this.formRef)
            this.formRef = react_1.createRef();
        const { menu, onFinish, submitting } = this.props;
        return (<antd_1.Form ref={this.formRef} onFinish={onFinish.bind(this)} initialValues={menu
                ? menu
                : {
                    title: '',
                    path: '',
                    help: '',
                    public: false,
                    internal: false,
                    parentId: null,
                    section: 'footer',
                    ordering: 0,
                    isPage: false,
                    isNewTab: false
                }} labelCol={{ span: 4 }} wrapperCol={{ span: 20 }}>
        <antd_1.Form.Item name="internal" label={<react_1.Fragment>
              <antd_1.Popover content={<p>
                    Using system website Static Page as menu item or external
                    link
                  </p>}>
                <a style={{ marginRight: '5px' }}>
                  <icons_1.QuestionCircleOutlined />
                </a>
              </antd_1.Popover>
              From sytem page?
            </react_1.Fragment>} valuePropName="checked">
          <antd_1.Switch defaultChecked={false} onChange={(val) => {
                this.setState({ isInternal: val });
                if (!val) {
                    this.setFormVal('path', '');
                    this.setFormVal('isPage', false);
                    this.setState({ isPage: false, path: '' });
                }
            }}/>
        </antd_1.Form.Item>
        <antd_1.Form.Item name="isNewTab" label="Is new tab?" valuePropName="checked">
          <antd_1.Switch defaultChecked={false}/>
        </antd_1.Form.Item>
        {/* {this.state.isInternal && (
              <Form.Item
                name="isPage"
                label={
                  <Fragment>
                    <Popover
                      content={<p>Checked if menu item system website Static Page and vice versa.</p>}>
                      <a style={{ marginRight: '5px' }}>
                        <QuestionCircleOutlined />
                      </a>
                    </Popover>
                    Is Page?
                  </Fragment>
                }
                valuePropName="checked">
                <Switch
                  defaultChecked={false}
                  onChange={val => {
                    this.setState({ isPage: val });
                    if (!val) {
                      this.setFormVal('path', '');
                      this.setState({ path: '' });
                    }
                  }}
                />
              </Form.Item>
            )} */}
        {this.state.isInternal && (<antd_1.Form.Item label={<react_1.Fragment>
                <antd_1.Popover content={<p>
                      If there is no data, please create a page at{' '}
                      <link_1.default href="/posts/create">
                        <a>here</a>
                      </link_1.default>
                    </p>} title="Pages listing">
                  <a style={{ marginRight: '5px' }}>
                    <icons_1.QuestionCircleOutlined />
                  </a>
                </antd_1.Popover>
                Page
              </react_1.Fragment>}>
            <select_post_dropdown_1.SelectPostDropdown defaultValue={this.state.path && this.state.path.replace('/page/', '')} onSelect={(val) => {
                    this.setFormVal('path', val ? '/page/' + val : '');
                }}/>
          </antd_1.Form.Item>)}
        <antd_1.Form.Item name="title" rules={[{ required: true, message: 'Please input title of menu!' }]} label="Title">
          <antd_1.Input placeholder="Enter menu title"/>
        </antd_1.Form.Item>
        {this.state.isInternal ? (<antd_1.Form.Item name="path" rules={[
                    { required: true, message: 'Please input path of menu!' },
                    {
                        validator: (rule, value) => {
                            if (!value)
                                return Promise.resolve();
                            const isUrlValid = string_1.isUrl(value);
                            if (this.state.isInternal && isUrlValid) {
                                return Promise.reject('The path is not valid');
                            }
                            else if (!this.state.isInternal && !isUrlValid) {
                                return Promise.reject('The url is not valid');
                            }
                            return Promise.resolve();
                        }
                    }
                ]} label="Path">
            <antd_1.Input placeholder="Enter menu path" disabled={this.state.isPage}/>
          </antd_1.Form.Item>) : (<antd_1.Form.Item name="path" rules={[
                    { required: true, message: 'Please input url of menu!' },
                    {
                        validator: (rule, value) => {
                            if (!value)
                                return Promise.resolve();
                            const isUrlValid = string_1.isUrl(value);
                            if (this.state.isInternal && isUrlValid) {
                                return Promise.reject('The path is not valid');
                            }
                            else if (!this.state.isInternal && !isUrlValid) {
                                return Promise.reject('The url is not valid');
                            }
                            return Promise.resolve();
                        }
                    }
                ]} label="Url">
            <antd_1.Input placeholder="Enter menu url" disabled={this.state.isPage}/>
          </antd_1.Form.Item>)}
        {/* <Form.Item name="help" label="Help">
              <Input placeholder="Help" />
            </Form.Item> */}
        <antd_1.Form.Item name="section" label="Section" rules={[{ required: true, message: 'Please select menu section!' }]}>
          <antd_1.Select disabled>
            <antd_1.Select.Option key="main" value="main">
              Main
            </antd_1.Select.Option>
            <antd_1.Select.Option key="header" value="header">
              Header
            </antd_1.Select.Option>
            <antd_1.Select.Option key="footer" value="footer">
              Footer
            </antd_1.Select.Option>
          </antd_1.Select>
        </antd_1.Form.Item>
        <antd_1.Form.Item name="parentId" label="Parent">
          <menu_tree_select_1.SelectMenuTreeDropdown defaultValue={menu && menu.parentId} onSelect={(val) => this.setFormVal('parentId', val)} menu={menu || null}/>
        </antd_1.Form.Item>
        {/* <Form.Item name="public" label="Public" valuePropName="checked">
              <Switch defaultChecked={true} />
            </Form.Item> */}
        <antd_1.Form.Item name="ordering" label="Ordering">
          <antd_1.InputNumber type="number" placeholder="Enter ordering of menu item"/>
        </antd_1.Form.Item>
        <antd_1.Form.Item wrapperCol={{ span: 20, offset: 4 }}>
          <antd_1.Button type="primary" htmlType="submit" loading={submitting}>
            Submit
          </antd_1.Button>
        </antd_1.Form.Item>
      </antd_1.Form>);
    }
}
exports.FormMenu = FormMenu;
