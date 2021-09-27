"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const head_1 = __importDefault(require("next/head"));
const react_1 = require("react");
const antd_1 = require("antd");
const page_1 = __importDefault(require("@components/common/layout/page"));
const video_service_1 = require("@services/video.service");
const search_filter_1 = require("@components/common/search-filter");
const table_list_1 = require("@components/video/table-list");
const common_1 = require("@components/common");
class Videos extends react_1.PureComponent {
    constructor() {
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
        this.handleTableChange = (pagination, filters, sorter) => {
            const pager = Object.assign({}, this.state.pagination);
            pager.current = pagination.current;
            this.setState({
                pagination: pager,
                sortBy: sorter.field || 'createdAt',
                sort: sorter.order
                    ? sorter.order === 'descend'
                        ? 'desc'
                        : 'asc'
                    : 'desc'
            });
            this.search(pager.current);
        };
    }
    static async getInitialProps({ ctx }) {
        return ctx.query;
    }
    async componentDidMount() {
        if (this.props.performerId) {
            await this.setState({
                filter: Object.assign(Object.assign({}, this.state.filter), { performerId: this.props.performerId })
            });
        }
        this.search();
    }
    async search(page = 1) {
        try {
            await this.setState({ searching: true });
            const resp = await video_service_1.videoService.search(Object.assign(Object.assign({}, this.state.filter), { limit: this.state.limit, offset: (page - 1) * this.state.limit, sort: this.state.sort, sortBy: this.state.sortBy }));
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
    async handleFilter(filter) {
        await this.setState({ filter });
        this.search();
    }
    async deleteVideo(id) {
        if (!confirm('Are you sure you want to delete this video?')) {
            return false;
        }
        try {
            await video_service_1.videoService.delete(id);
            antd_1.message.success('Deleted successfully');
            await this.search(this.state.pagination.current);
        }
        catch (e) {
            const err = (await Promise.resolve(e)) || {};
            antd_1.message.error(err.message || 'An error occurred, please try again!');
        }
    }
    render() {
        const { list, searching, pagination } = this.state;
        const statuses = [
            {
                key: '',
                text: 'All'
            },
            {
                key: 'draft',
                text: 'Draft'
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
        return (<react_1.Fragment>
        <head_1.default>
          <title>Videos</title>
        </head_1.default>
        <common_1.BreadcrumbComponent breadcrumbs={[{ title: 'Videos' }]}/>
        <page_1.default>
          <search_filter_1.SearchFilter searchWithPerformer={true} statuses={statuses} onSubmit={this.handleFilter.bind(this)} performerId={this.props.performerId || ''}/>
          <div style={{ marginBottom: '20px' }}></div>
          <table_list_1.TableListVideo dataSource={list} rowKey="_id" loading={searching} pagination={pagination} onChange={this.handleTableChange.bind(this)} deleteVideo={this.deleteVideo.bind(this)}/>
        </page_1.default>
      </react_1.Fragment>);
    }
}
exports.default = Videos;
