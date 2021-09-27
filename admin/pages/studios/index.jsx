"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const head_1 = __importDefault(require("next/head"));
const link_1 = __importDefault(require("next/link"));
const react_1 = require("react");
const antd_1 = require("antd");
const page_1 = __importDefault(require("@components/common/layout/page"));
const index_1 = require("@services/index");
const icons_1 = require("@ant-design/icons");
const date_1 = require("@lib/date");
class Studios extends react_1.PureComponent {
    constructor() {
        super(...arguments);
        this.state = {
            pagination: {},
            searching: false,
            list: [],
            limit: 10,
            filter: {},
            sortBy: 'updatedAt',
            sort: 'desc'
        };
    }
    static async getInitialProps({ ctx }) {
        return Object.assign({}, ctx.query);
    }
    componentDidMount() {
        this.search();
    }
    componentDidUpdate(prevProps) {
        const { status } = this.props;
        if (status !== prevProps.status) {
            this.search();
        }
    }
    async search(page = 1) {
        try {
            await this.setState({ searching: true });
            let { filter } = this.state;
            const { status } = this.props;
            const query = Object.assign(Object.assign({ limit: this.state.limit, offset: (page - 1) * this.state.limit }, filter), { sort: this.state.sort, sortBy: this.state.sortBy });
            if (status) {
                query.status = status;
            }
            const resp = await index_1.studioService.search(query);
            if (status) {
                filter = Object.assign(Object.assign({}, filter), { status });
            }
            await this.setState({
                filter,
                searching: false,
                list: resp.data.data,
                pagination: Object.assign(Object.assign({}, this.state.pagination), { pageSize: this.state.limit, total: resp.data.total })
            });
        }
        catch (e) {
            antd_1.message.error('An error occurred, please try again!');
            this.setState({ searching: false });
        }
    }
    async handleTableChange(pagination, filters, sorter) {
        const pager = Object.assign({}, this.state.pagination);
        pager.current = pagination.current;
        await this.setState({
            pagination: pager,
            sortBy: sorter.field || 'updatedAt',
            sort: sorter.order ? (sorter.order === 'descend' ? 'desc' : 'asc') : 'desc'
        });
        this.search(pager.current);
    }
    async handleFilter(filter) {
        await this.setState({ filter });
        this.search();
    }
    render() {
        const { list, searching, pagination } = this.state;
        const columns = [
            {
                title: 'Name',
                dataIndex: 'name',
                sorter: true,
                fixed: 'left'
            },
            {
                title: 'Username',
                dataIndex: 'username',
                sorter: true,
                fixed: 'left'
            },
            {
                title: 'Email',
                dataIndex: 'email',
                sorter: true
            },
            {
                title: 'Total Models',
                key: 'totalModels',
                render: ({ _id, stats }) => (<link_1.default href={'/performer?studioId=' + _id}>
            <a>View {stats.totalPerformer} model(s)</a>
          </link_1.default>)
            },
            {
                title: 'Status',
                dataIndex: 'status',
                render(status) {
                    switch (status) {
                        case 'active':
                            return <antd_1.Tag color="green">Active</antd_1.Tag>;
                        case 'inactive':
                            return <antd_1.Tag color="red">Suspend</antd_1.Tag>;
                        case 'pending-email-confirmation':
                            return <antd_1.Tag color="default">Pending</antd_1.Tag>;
                    }
                    return <antd_1.Tag color="default">{status}</antd_1.Tag>;
                }
            },
            {
                title: 'Email Verified',
                dataIndex: 'emailVerified',
                render(emailVerified) {
                    switch (emailVerified) {
                        case true:
                            return <antd_1.Tag color="green">Yes</antd_1.Tag>;
                        case false:
                            return <antd_1.Tag color="red">No</antd_1.Tag>;
                    }
                }
            },
            {
                title: 'Balance',
                dataIndex: 'balance',
                key: 'balance',
                render: (balance) => balance.toFixed(2),
                sorter: true
            },
            {
                title: 'CreatedAt',
                dataIndex: 'createdAt',
                sorter: true,
                render(date) {
                    return <span>{date_1.formatDate(date)}</span>;
                }
            },
            {
                title: 'Actions',
                dataIndex: '_id',
                fixed: 'right',
                render(id) {
                    return (<antd_1.Dropdown overlay={<antd_1.Menu>
                  <antd_1.Menu.Item key="edit">
                    <link_1.default href={{
                                pathname: '/studios/update',
                                query: { id }
                            }} as={`/studios/update?id=${id}`}>
                      <a>
                        <icons_1.EditOutlined /> Update
                      </a>
                    </link_1.default>
                  </antd_1.Menu.Item>
                </antd_1.Menu>}>
              <antd_1.Button>
                Actions <icons_1.DownOutlined />
              </antd_1.Button>
            </antd_1.Dropdown>);
                }
            }
        ];
        return (<react_1.Fragment>
        <head_1.default>
          <title>Studios</title>
        </head_1.default>
        <page_1.default>
          {/* <SearchFilter
              onSubmit={this.handleFilter.bind(this)}
              onExportCsv={this.onExportCsv.bind(this)}
            /> */}
          <div style={{ marginBottom: '20px' }}></div>
          <antd_1.Table dataSource={list} columns={columns} rowKey="_id" loading={searching} pagination={pagination} onChange={this.handleTableChange.bind(this)} scroll={{ x: 700, y: 650 }}/>
        </page_1.default>
      </react_1.Fragment>);
    }
}
exports.default = Studios;
