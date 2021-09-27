"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const head_1 = __importDefault(require("next/head"));
const react_1 = require("react");
const react_redux_1 = require("react-redux");
const antd_1 = require("antd");
const page_1 = __importDefault(require("@components/common/layout/page"));
const performer_service_1 = require("@services/performer.service");
const common_1 = require("@components/common");
const lib_1 = require("src/lib");
class Performers extends react_1.PureComponent {
    constructor() {
        super(...arguments);
        this.state = {
            searching: false,
            list: [],
            pagination: {},
            query: {
                limit: 10,
                sortBy: 'updatedAt',
                sort: 'desc',
            }
        };
    }
    static async getInitialProps({ ctx }) {
        return ctx.query;
    }
    componentDidMount() {
        this.search();
    }
    async search(page = 1, pagination = {}, sorter = {}) {
        try {
            this.setState({ searching: true });
            let query = Object.assign({}, this.state.query);
            query = Object.assign(Object.assign({}, query), { offset: (page - 1) * query.limit });
            if (sorter) {
                query.sortBy = sorter.field || 'updatedAt';
                query.sort = sorter.order ? (sorter.order === 'descend' ? 'desc' : 'asc') : 'desc';
            }
            const resp = await performer_service_1.performerService.searchOnline(query);
            this.setState({
                query,
                list: resp.data.data,
                pagination: Object.assign(Object.assign({}, pagination), { total: resp.data.total })
            });
        }
        catch (e) {
            antd_1.message.error('An error occurred, please try again!');
        }
        finally {
            this.setState({ searching: false });
        }
    }
    async handleTableChange(pagination, filters, sorter) {
        this.search(pagination.current, pagination, sorter);
    }
    render() {
        const { list, searching, pagination, } = this.state;
        const columns = [
            {
                title: 'ID',
                dataIndex: '_id',
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
                title: 'Last Streaming Time',
                dataIndex: 'lastStreamingTime',
                render: (lastStreamingTime) => lastStreamingTime && lib_1.getDiffToNow(lastStreamingTime),
                sorter: true
            },
            {
                title: 'Watching',
                dataIndex: 'watching',
            }
        ];
        return (<react_1.Fragment>
        <head_1.default>
          <title>Manage Performers</title>
        </head_1.default>
        <common_1.BreadcrumbComponent breadcrumbs={[{ title: 'Performers', href: '/performer' }, { title: 'Models online' }]}/>
        <page_1.default>
          <antd_1.Table dataSource={list} columns={columns} rowKey="_id" loading={searching} pagination={pagination} onChange={this.handleTableChange.bind(this)} scroll={{ x: 700, y: 650 }}/>
        </page_1.default>
      </react_1.Fragment>);
    }
}
const mapStates = (state) => ({
    currentUser: state.user.current
});
exports.default = react_redux_1.connect(mapStates)(Performers);
