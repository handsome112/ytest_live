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
const table_list_1 = __importDefault(require("@components/refund-request/table-list"));
const services_1 = require("src/services");
const utils_1 = require("src/lib/utils");
class RefundRequestPage extends react_1.PureComponent {
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
            filter: {}
        };
    }
    componentDidMount() {
        this.getList();
    }
    async onHandleTabChange(pagination, filters, sorter) {
        const { sort } = this.state;
        await this.setState({
            offset: (pagination.current - 1) * this.state.pagination.pageSize,
            sort: Object.assign(Object.assign({}, sort), { sortBy: sorter.field, sorter: sorter.order === 'ascend' ? 'asc' : 'desc' })
        });
        this.getList();
    }
    async updateStatus(id, value) {
        await services_1.refundRequestService.update(id, { status: value });
        this.getList();
    }
    async getList() {
        const { filter, offset, data, pagination, sort } = this.state;
        try {
            const resp = await services_1.refundRequestService.search(Object.assign(Object.assign(Object.assign({}, filter), sort), { offset, limit: pagination.pageSize }));
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
    async handleFilter(filter) {
        await this.setState({ filter: filter });
        this.getList();
    }
    render() {
        const { data, loading, pagination } = this.state;
        return (<>
        <head_1.default>
          <title>Refund request</title>
        </head_1.default>
        <common_1.BreadcrumbComponent breadcrumbs={[{ title: 'Products' }]}/>
        <page_1.default>
          <search_filter_1.SearchFilter notWithKeyWord={true} onSubmit={this.handleFilter.bind(this)} searchWithPerformer={true}/>
          <div style={{ marginBottom: '20px' }}></div>
          {data ? (<table_list_1.default data={data} loading={loading} rowKey="_id" pagination={pagination} onChange={this.onHandleTabChange.bind(this)} updateStatus={this.updateStatus.bind(this)}/>) : (<p>No request found.</p>)}
        </page_1.default>
      </>);
    }
}
exports.default = RefundRequestPage;
