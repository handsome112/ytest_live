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
const perfomer_category_service_1 = require("@services/perfomer-category.service");
const date_1 = require("@lib/date");
const search_filter_1 = require("@components/performer/category/search-filter");
class Categories extends react_1.PureComponent {
    constructor() {
        super(...arguments);
        this.state = {
            pagination: {},
            searching: false,
            list: [],
            limit: 10,
            filter: {},
            sortBy: 'ordering',
            sort: 'asc'
        };
        this.handleTableChange = (pagination, filters, sorter) => {
            const pager = Object.assign({}, this.state.pagination);
            pager.current = pagination.current;
            this.setState({
                pagination: pager,
                sortBy: sorter.field || 'ordering',
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
            const resp = await perfomer_category_service_1.performerCategoryService.search(Object.assign(Object.assign({}, this.state.filter), { limit: this.state.limit, offset: (page - 1) * this.state.limit, sort: this.state.sort, sortBy: this.state.sortBy }));
            await this.setState({
                searching: false,
                list: resp.data.data,
                pagination: Object.assign(Object.assign({}, this.state.pagination), { total: resp.data.total, pageSize: this.state.limit })
            });
        }
        catch (e) {
            antd_1.message.error('An error occurred, please try again!');
            await this.setState({ searching: false });
        }
    }
    async deleteCategory(id) {
        if (!confirm('Are you sure you want to delete this category?')) {
            return false;
        }
        try {
            await perfomer_category_service_1.performerCategoryService.delete(id);
            antd_1.message.success('Deleted successfully');
            await this.search(this.state.pagination.current);
        }
        catch (e) {
            const err = (await Promise.resolve(e)) || {};
            antd_1.message.error(err.message || 'An error occurred, please try again!');
        }
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
                render(data, record) {
                    return (<react_1.Fragment>
              <link_1.default href={{
                            pathname: '/performer/category/update',
                            query: {
                                id: record._id
                            }
                        }}>
                <a style={{ fontWeight: 'bold' }}>{record.name}</a>
              </link_1.default>
            </react_1.Fragment>);
                }
            },
            {
                title: 'Ordering',
                dataIndex: 'ordering',
                sorter: true,
                render(ordering) {
                    return <span>{ordering}</span>;
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
                                pathname: '/performer/category/update',
                                query: { id }
                            }} as={`/performer/category/update?id=${id}`}>
                      <a>
                        <icons_1.EditOutlined /> Update
                      </a>
                    </link_1.default>
                  </antd_1.Menu.Item>
                  <antd_1.Menu.Item key="delete" onClick={this.deleteCategory.bind(this, id)}>
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
          <title>Categories</title>
        </head_1.default>
        <div style={{ marginBottom: '16px' }}>
          <antd_1.Breadcrumb>
            <antd_1.Breadcrumb.Item href="/dashboard">
              <icons_1.HomeOutlined />
            </antd_1.Breadcrumb.Item>
            <antd_1.Breadcrumb.Item>Categories</antd_1.Breadcrumb.Item>
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
exports.default = Categories;
