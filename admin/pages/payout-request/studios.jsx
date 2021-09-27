"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const antd_1 = require("antd");
const head_1 = __importDefault(require("next/head"));
const react_1 = require("react");
const search_filter_1 = require("@components/common/search-filter");
const common_1 = require("@components/common");
const page_1 = __importDefault(require("@components/common/layout/page"));
const utils_1 = require("src/lib/utils");
const table_list_1 = __importDefault(require("@components/payout-request/table-list"));
const services_1 = require("src/services");
class StudiosPayoutRequestPage extends react_1.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            data: [],
            offset: 0,
            pagination: {
                total: 0,
                pageSize: 10
            },
            sort: {
                sortBy: 'createAt',
                sorter: 'desc'
            },
            filter: {},
            sourceType: 'studio'
        };
    }
    componentDidMount() {
        this.getList();
    }
    async getList() {
        const { filter, offset, data, pagination, sort, query, sourceType } = this.state;
        try {
            const resp = await services_1.payoutRequestService.search(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign({}, filter), sort), { offset }), query), { limit: pagination.pageSize, sourceType }));
            await this.setState({
                data: resp.data.data,
                pagination: Object.assign(Object.assign({}, pagination), { total: resp.data.total })
            });
        }
        catch (e) {
            this.showError(e);
        }
        finally {
            this.setState({ loading: false });
        }
    }
    async showError(e) {
        const err = await Promise.resolve(e);
        antd_1.message.error(utils_1.getResponseError(err));
    }
    async updateStatus(id, value) {
        await services_1.payoutRequestService.update(id, { status: value });
        this.getList();
    }
    async onHandleTabChange(pagination, filters, sorter) {
        const { sort } = this.state;
        if (filters && filters.length) {
        }
        await this.setState({
            offset: (pagination.current - 1) * this.state.pagination.pageSize,
            sort: Object.assign(Object.assign({}, sort), { sortBy: sorter.field, sorter: sorter.order === 'ascend' ? 'asc' : 'desc' })
        });
        this.getList();
    }
    async handleFilter(filter) {
        await this.setState({ filter: filter });
        this.getList();
    }
    async setDateRanger(_, dateStrings) {
        if (!dateStrings[0] && !dateStrings[1]) {
            await this.setState({
                query: {},
                sort: { sortBy: 'createdAt', sorter: 'desc' }
            });
            this.getList();
        }
        if (dateStrings[0] && dateStrings[1]) {
            await this.setState({
                query: { fromDate: dateStrings[0], toDate: dateStrings[1] }
            });
            this.getList();
        }
        else {
            return;
        }
    }
    render() {
        const { data, loading, pagination } = this.state;
        const statuses = [
            { text: 'All', key: '' },
            { text: 'Pending', key: 'pending' },
            { text: 'Resolved', key: 'resolved' },
            { text: 'Rejected', key: 'rejected' },
            { text: 'Done', key: 'done' }
        ];
        return (<>
        <head_1.default>
          <title>payout request</title>
        </head_1.default>
        <common_1.BreadcrumbComponent breadcrumbs={[{ title: 'Payout Request' }]}/>
        <page_1.default>
          <search_filter_1.SearchFilter notWithKeyWord={true} statuses={statuses} onSubmit={this.handleFilter.bind(this)} searchWithPerformer={true} withDatePicker={true} setDateRanger={this.setDateRanger.bind(this)}/>
          <div style={{ marginBottom: '20px' }}></div>
          {data ? (<table_list_1.default data={data} loading={loading} rowKey="_id" pagination={pagination} onChange={this.onHandleTabChange.bind(this)} updateStatus={this.updateStatus.bind(this)}/>) : (<p>No request found.</p>)}
        </page_1.default>
      </>);
    }
}
exports.default = StudiosPayoutRequestPage;
