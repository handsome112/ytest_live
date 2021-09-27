"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const head_1 = __importDefault(require("next/head"));
const link_1 = __importDefault(require("next/link"));
const react_1 = require("react");
const react_redux_1 = require("react-redux");
const antd_1 = require("antd");
const page_1 = __importDefault(require("@components/common/layout/page"));
const index_1 = require("@services/index");
const search_filter_1 = require("@components/user/search-filter");
const icons_1 = require("@ant-design/icons");
const date_1 = require("@lib/date");
const utils_1 = require("@lib/utils");
class Users extends react_1.PureComponent {
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
        return ctx.query;
    }
    componentDidMount() {
        this.search();
    }
    componentDidUpdate(prevProps) {
        if (this.props !== prevProps) {
            this.search();
        }
    }
    async search(page = 1) {
        try {
            const { status } = this.props;
            let { filter } = this.state;
            await this.setState({ searching: true });
            const query = Object.assign(Object.assign({}, filter), { limit: this.state.limit, offset: (page - 1) * this.state.limit, sort: this.state.sort, sortBy: this.state.sortBy });
            if (status) {
                query.status = status;
            }
            const resp = await index_1.userService.search(query);
            if (status) {
                filter = Object.assign(Object.assign({}, filter), { status });
            }
            await this.setState({
                filter,
                searching: false,
                list: resp.data.data,
                pagination: Object.assign(Object.assign({}, this.state.pagination), { total: resp.data.total })
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
    async onExportCsv(filter) {
        try {
            const page = 1;
            await this.setState({ filter });
            const url = index_1.userService.exportCsv(Object.assign(Object.assign({ limit: this.state.limit, offset: (page - 1) * this.state.limit }, this.state.filter), { sort: this.state.sort, sortBy: this.state.sortBy }));
            const resp = (await utils_1.downloadCsv(url, 'users_export.csv'));
            if (resp && resp.success) {
                return antd_1.message.success('Downloading, please check in Download folder');
            }
        }
        catch (error) {
            return antd_1.message.error('An error occurred, please try again!');
        }
    }
    render() {
        const { list, searching, pagination } = this.state;
        const columns = [
            {
                title: 'First name',
                dataIndex: 'firstName',
                sorter: true,
                fixed: 'left'
            },
            {
                title: 'Last name',
                dataIndex: 'lastName',
                sorter: true,
                fixed: 'left'
            },
            {
                title: 'Username',
                dataIndex: 'username',
                sorter: true
            },
            {
                title: 'Email',
                dataIndex: 'email',
                sorter: true
            },
            {
                title: 'Roles',
                dataIndex: 'roles',
                render(roles, record) {
                    return <>{roles.map(role => {
                            switch (role) {
                                case 'admin': return <antd_1.Tag color="red" key={`admin-${record._id}`}>{role}</antd_1.Tag>;
                                case 'user': return <antd_1.Tag color="geekblue" key={record._id}>{role}</antd_1.Tag>;
                                default: return <antd_1.Tag color="default" key={record._id}>{role}</antd_1.Tag>;
                            }
                        })}</>;
                }
            },
            {
                title: 'Gender',
                dataIndex: 'gender'
            },
            {
                title: 'Amount spent',
                dataIndex: '_id',
                render(_, record) {
                    var _a;
                    return <span>{(_a = record === null || record === void 0 ? void 0 : record.stats) === null || _a === void 0 ? void 0 : _a.totalTokenSpent}</span>;
                }
            },
            {
                title: 'Balance',
                dataIndex: 'balance',
                sorter: true
            },
            {
                title: 'Email Verified',
                dataIndex: 'emailVerified',
                render(emailVerified) {
                    switch (emailVerified) {
                        case true:
                            return <antd_1.Tag color="green">Y</antd_1.Tag>;
                        case false:
                            return <antd_1.Tag color="red">N</antd_1.Tag>;
                    }
                    return <antd_1.Tag color="default">{emailVerified}</antd_1.Tag>;
                }
            },
            {
                title: 'Status',
                dataIndex: 'status',
                render(status) {
                    switch (status) {
                        case 'active':
                            return <antd_1.Tag color="green">Active</antd_1.Tag>;
                        case 'inactive':
                            return <antd_1.Tag color="red">Inactive</antd_1.Tag>;
                        case 'pending-email-confirmation':
                            return <antd_1.Tag color="default">Pending</antd_1.Tag>;
                    }
                    return <antd_1.Tag color="default">{status}</antd_1.Tag>;
                }
            },
            {
                title: 'Total view stream time (HH:mm:ss)',
                dataIndex: '_id',
                render(data, record) {
                    var _a, _b;
                    return (<span>
              {((_a = record === null || record === void 0 ? void 0 : record.stats) === null || _a === void 0 ? void 0 : _a.totalViewTime) &&
                            date_1.convertMiliSecsToSecs(((_b = record === null || record === void 0 ? void 0 : record.stats) === null || _b === void 0 ? void 0 : _b.totalViewTime) || 0)}
            </span>);
                }
            },
            {
                title: 'Total online time (HH:mm)',
                dataIndex: 'totalOnlineTime',
                render(time) {
                    return <span>{date_1.convertMiliSecsToSecs(time || 0)}</span>;
                }
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
                                pathname: '/users/update',
                                query: { id }
                            }} as={`/users/update?id=${id}`}>
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
          <title>Users</title>
        </head_1.default>
        <page_1.default>
          <search_filter_1.SearchFilter onSubmit={this.handleFilter.bind(this)} onExportCsv={this.onExportCsv.bind(this)}/>
          <div style={{ marginBottom: '20px' }}></div>
          <antd_1.Table dataSource={list} columns={columns} rowKey="_id" loading={searching} pagination={pagination} onChange={this.handleTableChange.bind(this)} scroll={{ x: 1500, y: 650 }}/>
        </page_1.default>
      </react_1.Fragment>);
    }
}
const mapStates = (state) => ({
    currentUser: state.user.current
});
exports.default = react_redux_1.connect(mapStates)(Users);
