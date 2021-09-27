"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable no-nested-ternary */
const head_1 = __importDefault(require("next/head"));
const react_1 = require("react");
const antd_1 = require("antd");
const page_1 = __importDefault(require("@components/common/layout/page"));
const banner_service_1 = require("@services/banner.service");
const search_filter_1 = require("@components/common/search-filter");
const table_list_1 = require("@components/banner/table-list");
const common_1 = require("@components/common");
class Banners extends react_1.PureComponent {
    constructor() {
        // static async getInitialProps({ ctx }) {
        //   return ctx.query;
        // }
        super(...arguments);
        this.state = {
            pagination: {},
            searching: false,
            list: [],
            limit: 10,
            filter: {},
            sortBy: 'createdAt',
            sort: 'desc'
        };
        this.handleTableChange = (paginate, filters, sorter) => {
            const { pagination } = this.state;
            const pager = Object.assign({}, pagination);
            pager.current = paginate.current;
            this.setState({
                pagination: pager,
                sortBy: sorter.field || 'createdAt',
                sort: sorter.order ? (sorter.order === 'descend' ? 'desc' : 'asc') : 'desc'
            });
            this.search(pager.current);
        };
    }
    async componentDidMount() {
        this.search();
    }
    async handleFilter(filter) {
        await this.setState({ filter });
        this.search();
    }
    async search(page = 1) {
        const { filter, sort, sortBy, limit, pagination } = this.state;
        try {
            await this.setState({ searching: true });
            const resp = await banner_service_1.bannerService.search(Object.assign(Object.assign({}, filter), { limit: filter, offset: (page - 1) * limit, sort,
                sortBy }));
            await this.setState({
                searching: false,
                list: resp.data.data,
                pagination: Object.assign(Object.assign({}, pagination), { total: resp.data.total, pageSize: limit })
            });
        }
        catch (e) {
            antd_1.message.error('An error occurred, please try again!');
            await this.setState({ searching: false });
        }
    }
    async deleteBanner(id) {
        const { pagination } = this.state;
        if (!window.confirm('Are you sure you want to delete this banner?')) {
            return false;
        }
        try {
            await banner_service_1.bannerService.delete(id);
            antd_1.message.success('Deleted successfully');
            await this.search(pagination.current);
        }
        catch (e) {
            const err = (await Promise.resolve(e)) || {};
            antd_1.message.error(err.message || 'An error occurred, please try again!');
        }
        return undefined;
    }
    render() {
        const { list, searching, pagination } = this.state;
        const statuses = [
            {
                key: '',
                text: 'All'
            },
            {
                key: 'active',
                text: 'Active'
            },
            {
                key: 'inactive',
                text: 'Inactive'
            }
        ];
        return (<>
        <head_1.default>
          <title>Banners</title>
        </head_1.default>
        <common_1.BreadcrumbComponent breadcrumbs={[{ title: 'Banners' }]}/>
        <page_1.default>
          <search_filter_1.SearchFilter statuses={statuses} onSubmit={this.handleFilter.bind(this)}/>
          <div style={{ marginBottom: '20px' }}/>
          <table_list_1.TableListBanner dataSource={list} rowKey="_id" loading={searching} pagination={pagination} onChange={this.handleTableChange.bind(this)} deleteBanner={this.deleteBanner.bind(this)}/>
        </page_1.default>
      </>);
    }
}
exports.default = Banners;
