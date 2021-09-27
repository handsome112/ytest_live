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
const table_list_payment_information_1 = require("@components/payment/table-list-payment-information");
const services_1 = require("src/services");
const lodash_1 = require("lodash");
const { Item } = antd_1.Descriptions;
const invisibleField = [
    '_id',
    '__v',
    'sourceType',
    'sourceInfo',
    'sourceId',
    'type',
    'createdAt',
    'updatedAt'
];
class PaymentInformationPage extends react_1.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            modalVisible: false,
            data: [],
            info: null,
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
    componentDidUpdate(_, prevState) {
        const { sort, filter, offset } = this.state;
        if (filter !== prevState.filter || sort !== prevState.sort || offset !== prevState.offset) {
            this.getList();
        }
    }
    async getList() {
        const { filter, offset, pagination, sort, } = this.state;
        try {
            this.setState({ loading: true });
            const resp = await services_1.paymentService.paymentInformationSearch(Object.assign(Object.assign(Object.assign({}, filter), sort), { offset, limit: pagination.pageSize }));
            this.setState({
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
    async onHandleTabChange(pagination, filters, sorter) {
        const { sort } = this.state;
        if (filters && filters.length) {
        }
        this.setState({
            offset: (pagination.current - 1) * this.state.pagination.pageSize,
            sort: Object.assign(Object.assign({}, sort), { sortBy: sorter.field, sorter: sorter.order === 'ascend' ? 'asc' : 'desc' })
        });
    }
    async handleFilter({ performerId, studioId }) {
        if (performerId) {
            this.setState({ filter: { sourceId: performerId, sourceType: 'performer' } });
        }
        else if (studioId) {
            this.setState({ filter: { sourceId: studioId, sourceType: 'studio' } });
        }
        else {
            this.setState({ filter: {} });
        }
    }
    async showDetailPaymentInformation(id) {
        try {
            const { info } = this.state;
            if (info && info._id === id) {
                this.setState({ modalVisible: true });
                return;
            }
            const resp = await services_1.paymentService.detail(id);
            this.setState({ info: resp.data, modalVisible: true });
        }
        catch (e) {
            this.showError(e);
        }
    }
    render() {
        const { data, loading, pagination, modalVisible, info } = this.state;
        const modalContent = <antd_1.Descriptions column={1}>
      {(info === null || info === void 0 ? void 0 : info.sourceInfo) && <Item label="Username">{info.sourceInfo.username}</Item>}
      {info && Object.keys(lodash_1.omit(info, invisibleField)).map(field => <Item label={field}>{info[field]}</Item>)}
    </antd_1.Descriptions>;
        return (<>
        <head_1.default>
          <title>Payment Information</title>
        </head_1.default>
        <common_1.BreadcrumbComponent breadcrumbs={[{ title: 'Payment Information' }]}/>
        <page_1.default>
          <search_filter_1.SearchFilter notWithKeyWord={true} searchWithPerformer={true} searchWithStudio={true} onSubmit={this.handleFilter.bind(this)}/>
          <div style={{ marginBottom: '20px' }}></div>
          {data ? (<table_list_payment_information_1.TableListPaymentInformation dataSource={data} loading={loading} rowKey="_id" pagination={pagination} onChange={this.onHandleTabChange.bind(this)} onViewDeital={this.showDetailPaymentInformation.bind(this)}/>) : (<p>No data found.</p>)}
          <antd_1.Modal width={900} visible={modalVisible} onCancel={() => this.setState({ modalVisible: false })} okButtonProps={{ hidden: true }}>
            {modalContent}
          </antd_1.Modal>
        </page_1.default>
      </>);
    }
}
exports.default = PaymentInformationPage;
