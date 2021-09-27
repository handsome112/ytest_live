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
const post_service_1 = require("@services/post.service");
const date_1 = require("@lib/date");
const search_filter_1 = require("@components/post/search-filter");
class Posts extends react_1.PureComponent {
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
        this.handleTableChange = (pagination, filters, sorter) => {
            const pager = Object.assign({}, this.state.pagination);
            pager.current = pagination.current;
            this.setState({
                pagination: pager,
                sortBy: sorter.field || 'updatedAt',
                sort: sorter.order ? (sorter.order === 'descend' ? 'desc' : 'asc') : 'desc'
            });
            this.search(pager.current);
        };
    }
    componentDidMount() {
        this.search();
    }
    async search(page = 1) {
        try {
            await this.setState({ searching: true });
            const resp = await post_service_1.postService.search(Object.assign(Object.assign({}, this.state.filter), { limit: this.state.limit, offset: (page - 1) * this.state.limit, sortBy: this.state.sortBy, sort: this.state.sort }));
            await this.setState({
                searching: false,
                list: resp.data.data,
                pagination: Object.assign(Object.assign({}, this.state.pagination), { total: resp.data.total })
            });
        }
        catch (e) {
            antd_1.message.error('An error occurred, please try again!');
            await this.setState({ searching: false });
        }
    }
    async handleFilter(filter) {
        await this.setState({ filter });
        this.search();
    }
    async deletePost(id) {
        if (!confirm('Are you sure you want to delete this post?')) {
            return false;
        }
        try {
            await post_service_1.postService.delete(id);
            await this.search(this.state.pagination.current);
        }
        catch (e) {
            const err = (await Promise.resolve(e)) || {};
            antd_1.message.error(err.message || 'An error occurred, please try again!');
        }
    }
    render() {
        const { list, searching, pagination } = this.state;
        const columns = [
            {
                title: 'Title',
                dataIndex: 'title',
                sorter: true,
                render(data, record) {
                    return (<react_1.Fragment>
              <link_1.default href={{
                            pathname: '/posts/update',
                            query: {
                                id: record._id
                            }
                        }}>
                <a style={{ fontWeight: 'bold' }}>{record.title}</a>
              </link_1.default>
              {/* <small>{record.shortDescription}</small> */}
            </react_1.Fragment>);
                }
            },
            {
                title: 'Status',
                dataIndex: 'status',
                sorter: true,
                render(status) {
                    let color = 'default';
                    switch (status) {
                        case 'published':
                            color = 'green';
                            break;
                    }
                    return (<antd_1.Tag color={color} key={status}>
              {status.toUpperCase()}
            </antd_1.Tag>);
                }
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
                render: (id) => {
                    return (<antd_1.Dropdown overlay={<antd_1.Menu>
                  <antd_1.Menu.Item key="edit">
                    <link_1.default href={{
                                pathname: '/posts/update',
                                query: { id }
                            }} as={`/posts/update?id=${id}`}>
                      <a>
                        <icons_1.EditOutlined /> Update
                      </a>
                    </link_1.default>
                  </antd_1.Menu.Item>
                  <antd_1.Menu.Item key="delete" onClick={this.deletePost.bind(this, id)}>
                    <span>
                      <icons_1.DeleteOutlined /> Delete
                    </span>
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
          <title>Posts</title>
        </head_1.default>
        <div style={{ marginBottom: '16px' }}>
          <antd_1.Breadcrumb>
            <antd_1.Breadcrumb.Item href="/dashboard">
              <icons_1.HomeOutlined />
            </antd_1.Breadcrumb.Item>
            <antd_1.Breadcrumb.Item>Posts</antd_1.Breadcrumb.Item>
          </antd_1.Breadcrumb>
        </div>
        <page_1.default>
          <search_filter_1.SearchFilter onSubmit={this.handleFilter.bind(this)}/>
          <div style={{ marginBottom: '20px' }}></div>
          <antd_1.Table dataSource={list} columns={columns} rowKey="_id" loading={searching} pagination={pagination} onChange={this.handleTableChange.bind(this)}/>
        </page_1.default>
      </react_1.Fragment>);
    }
}
exports.default = Posts;
