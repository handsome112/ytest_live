"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const antd_1 = require("antd");
const head_1 = __importDefault(require("next/head"));
const react_1 = require("react");
const page_1 = __importDefault(require("@components/common/layout/page"));
// import { SearchFilter } from '@components/common/search-filter';
const table_list_1 = __importDefault(require("src/components/earning/table-list"));
const services_1 = require("src/services");
const utils_1 = require("src/lib/utils");
const react_redux_1 = require("react-redux");
const search_filter_1 = require("@components/common/search-filter");
require("./earning.less");
class EarningPage extends react_1.PureComponent {
    static async getInitialProps({ ctx }) {
        return ctx.query;
    }
    constructor(props) {
        super(props);
        this.state = {
            offset: 0,
            data: [],
            loading: false,
            pagination: { pageSize: 10, total: 0 },
            filter: {},
            sort: { sortBy: 'createdAt', sorter: 'asc' },
            stats: null,
            target: 'performer'
        };
    }
    componentDidMount() {
        this.loadData();
        this.loadStats();
    }
    async loadData() {
        const { offset, pagination, filter, sort, query, target } = this.state;
        // var query = {};
        // if (fromDate && toDate) {
        //   query = Object.assign(query, fromDate, toDate);
        // }
        try {
            await this.setState({ loading: true });
            const resp = await services_1.earningService.search(Object.assign(Object.assign(Object.assign(Object.assign({ offset, limit: pagination.pageSize }, filter), sort), query), { target }));
            await this.setState({
                data: resp.data.data,
                pagination: Object.assign(Object.assign({}, this.state.pagination), { total: resp.data.total })
            });
        }
        catch (e) {
            this.showError(e);
        }
        finally {
            await this.setState({ loading: false });
        }
    }
    async loadStats() {
        const { query, target, filter } = this.state;
        try {
            const resp = await services_1.earningService.stats(Object.assign(Object.assign({}, query), { target, filter }));
            await this.setState({ stats: resp });
        }
        catch (error) {
            this.showError(error);
        }
    }
    async onHandleTabChange(pagination, filters, sorter) {
        const { sort } = this.state;
        await this.setState({
            offset: (pagination.current - 1) * this.state.pagination.pageSize,
            sort: Object.assign(Object.assign({}, sort), { sortBy: sorter.field, sorter: sorter.order === 'ascend' ? 'asc' : 'desc' })
        });
        this.loadData();
    }
    async handleFilter(filter) {
        await this.setState({ filter });
        this.loadData();
        this.loadStats();
    }
    async setDateRanger(_, dateStrings) {
        if (!dateStrings[0] && !dateStrings[1]) {
            await this.setState({
                query: {},
                sort: { sortBy: 'createdAt', sorter: 'desc' }
            });
            this.loadData();
            this.loadStats();
        }
        if (dateStrings[0] && dateStrings[1]) {
            await this.setState({
                query: { fromDate: dateStrings[0], toDate: dateStrings[1] }
            });
            this.loadData();
            this.loadStats();
        }
        else {
            return;
        }
    }
    async showError(e) {
        const err = await Promise.resolve(e);
        antd_1.message.error(utils_1.getResponseError(err));
    }
    render() {
        const { data, loading, pagination, stats } = this.state;
        const { conversionRate } = this.props;
        // const sourceType = [
        //   { key: '', text: 'All' },
        //   { text: 'Sale Video', key: 'sale_video' },
        //   { text: 'Sale Product', key: 'sale_product' },
        //   { text: 'Sale Photo', key: 'sale_photo' },
        //   { text: 'Tip', key: 'tip' },
        //   { text: 'Private', key: 'private' },
        //   { text: 'Group', key: 'group' }
        // ];
        return (<>
        <head_1.default>
          <title>Earning</title>
        </head_1.default>
        <page_1.default>
          <antd_1.PageHeader title="Model Earning" style={{ padding: 0, marginBottom: 10 }}/>
          <antd_1.Row className="ant-page-header" style={{ padding: 0 }}>
            <antd_1.Col md={12} xs={24}>
              {/* <Space>
              <span>My Balance:</span>
              <span style={{ color: defaultColor.primaryColor }}>
                {performer.balance.toFixed(2)} tokens
              </span>
            </Space> */}
              <div>
                <antd_1.DatePicker.RangePicker disabledDate={() => loading} onCalendarChange={this.setDateRanger.bind(this)}/>
              </div>
            </antd_1.Col>
            <antd_1.Col md={12} xs={24}>
              {!loading && stats && (<antd_1.Space size="large">
                  <div className="space-display">
                  <antd_1.Statistic className="space-custom" title="Paid Tokens" value={stats.data.paidPrice} style={{ marginRight: '30px' }} precision={2}/>
                  <antd_1.Statistic style={{ marginRight: '30px' }} title="Remaining Tokens" value={stats.data.remainingPrice} precision={2}/>
                  <antd_1.Statistic style={{ marginRight: '30px' }} title="Total Tokens" value={stats.data.totalPrice} precision={2}/>
                  <antd_1.Statistic style={{ marginRight: '30px' }} title="Current Conversion Rate" value={conversionRate || 'N/A'} precision={2}/>
                  </div>

                </antd_1.Space>)}
            </antd_1.Col>
          </antd_1.Row>
          {/* <div>
              <span>Type:</span>
              <SearchFilter
                sourceType={sourceType}
                onSubmit={this.handleFilter.bind(this)}
                notWithKeyWord={true}
              />
            </div> */}

          <div style={{ marginBottom: '20px' }}></div>
          {data ? (<div>
              <search_filter_1.SearchFilter onSubmit={this.handleFilter.bind(this)} notWithKeyWord={true} searchWithPerformer={true}/>
              <div style={{ marginBottom: '20px' }}/>
              <table_list_1.default dataSource={data} rowKey="_id" onChange={this.onHandleTabChange.bind(this)} pagination={pagination} loading={loading}/>
            </div>) : (<p>There are no earning at this time.</p>)}
        </page_1.default>
      </>);
    }
}
const mapStateToProps = (state) => (Object.assign({}, state.settings));
exports.default = react_redux_1.connect(mapStateToProps)(EarningPage);
