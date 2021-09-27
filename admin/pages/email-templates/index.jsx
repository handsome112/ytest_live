"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const head_1 = __importDefault(require("next/head"));
const link_1 = __importDefault(require("next/link"));
const react_1 = require("react");
const antd_1 = require("antd");
const icons_1 = require("@ant-design/icons");
const page_1 = __importDefault(require("@components/common/layout/page"));
const date_1 = require("@lib/date");
const email_template_service_1 = require("@services/email-template.service");
class EmailTemplates extends react_1.PureComponent {
    constructor() {
        super(...arguments);
        this.state = {
            searching: false,
            list: []
        };
    }
    componentDidMount() {
        this.search();
    }
    async search() {
        try {
            await this.setState({ searching: true });
            const resp = await email_template_service_1.emailTemplateService.findAll();
            await this.setState({
                searching: false,
                list: resp.data
            });
        }
        catch (e) {
            antd_1.message.error('An error occurred, please try again!');
            await this.setState({ searching: false });
        }
    }
    render() {
        const { list, searching } = this.state;
        const columns = [
            {
                title: 'Key',
                dataIndex: 'key'
            },
            {
                title: 'Name',
                dataIndex: 'name',
                render(data, record) {
                    return (<>
              <link_1.default href={{
                            pathname: '/email-templates/update',
                            query: {
                                id: record._id
                            }
                        }}>
                <a style={{ fontWeight: 'bold' }}>{record.name}</a>
              </link_1.default>
              <br />
              <small>{record.description}</small>
            </>);
                }
            },
            {
                title: 'Subject',
                dataIndex: 'subject'
            },
            {
                title: 'Last update',
                dataIndex: 'updatedAt',
                sorter: true,
                render(date) {
                    return <span>{date_1.formatDate(date)}</span>;
                }
            },
            {
                title: 'Actions',
                dataIndex: '_id',
                render: (id) => (<antd_1.Dropdown overlay={(<antd_1.Menu>
                <antd_1.Menu.Item key="edit">
                  <link_1.default href={{
                            pathname: '/email-templates/update',
                            query: { id }
                        }} as={`/email-templates/update?id=${id}`}>
                    <a>
                      <icons_1.EditOutlined />
                      {' '}
                      Update
                    </a>
                  </link_1.default>
                </antd_1.Menu.Item>
              </antd_1.Menu>)}>
            <antd_1.Button>
              Actions
              {' '}
              <icons_1.DownOutlined />
            </antd_1.Button>
          </antd_1.Dropdown>)
            }
        ];
        return (<>
        <head_1.default>
          <title>Email templates</title>
        </head_1.default>
        <div style={{ marginBottom: '16px' }}>
          <antd_1.Breadcrumb>
            <antd_1.Breadcrumb.Item href="/dashboard">
              <icons_1.HomeOutlined />
            </antd_1.Breadcrumb.Item>
            <antd_1.Breadcrumb.Item>Email templates</antd_1.Breadcrumb.Item>
          </antd_1.Breadcrumb>
        </div>
        <page_1.default>
          <antd_1.Table dataSource={list} columns={columns} rowKey="_id" loading={searching}/>
        </page_1.default>
      </>);
    }
}
exports.default = EmailTemplates;
