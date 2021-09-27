"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importStar(require("react"));
const antd_1 = require("antd");
const page_header_1 = __importDefault(require("@components/common/layout/page-header"));
const router_1 = __importDefault(require("next/router"));
const head_1 = __importDefault(require("next/head"));
const react_redux_1 = require("react-redux");
const actions_1 = require("@redux/performer/actions");
const products_table_1 = __importDefault(require("@components/products/products-table"));
const perfomer_service_1 = require("@services/perfomer.service");
const utils_1 = require("@lib/utils");
require("./index.less");
class PerformerProductsPage extends react_1.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            limit: 5,
            offset: 0,
            sortBy: 'createdAt',
            sort: 'desc',
            filter: {}
        };
    }
    componentDidMount() {
        const { getMyProducts: dispatchGetMyProducts } = this.props;
        dispatchGetMyProducts(Object.assign({}, this.state));
    }
    componentDidUpdate(prevProps, prevStates) {
        const { getMyProducts: dispatchGetMyProducts } = this.props;
        if (prevStates !== this.state) {
            dispatchGetMyProducts(Object.assign({}, this.state));
        }
    }
    onChange(pagination, filters, sorter) {
        const oldState = this.state;
        this.setState(utils_1.getSearchData(pagination, filters, sorter, oldState));
    }
    async onRemove(id) {
        const { removeMyProduct: dispatchRemoveMyProduct } = this.props;
        if (!window.confirm('Are you sure you want to delete this item?')) {
            return false;
        }
        try {
            await perfomer_service_1.performerService.removeProduct(id);
            antd_1.message.success('Removed!');
            dispatchRemoveMyProduct(id);
        }
        catch (e) {
            const err = await Promise.resolve(e);
            antd_1.message.error(utils_1.getResponseError(err));
        }
        return {};
    }
    render() {
        const { data, searching, total } = this.props;
        const { limit } = this.state;
        return (<>
        <head_1.default>
          <title>My Products</title>
        </head_1.default>
        <div className="performer-products-page">
          <div className="ant-page-header">
            <page_header_1.default title="My Product" extra={(<antd_1.Button type="primary" onClick={() => router_1.default.push('/account/performer/products/add')}>
                  Add new Product
                </antd_1.Button>)}/>

          </div>
          <products_table_1.default products={data} searching={searching} total={total} onChange={this.onChange.bind(this)} pageSize={limit} remove={this.onRemove.bind(this)}/>
        </div>
      </>);
    }
}
PerformerProductsPage.authenticate = true;
PerformerProductsPage.layout = 'primary';
const mapStateToProps = (state) => (Object.assign({}, state.performer.assets.products));
const mapDispatch = { getMyProducts: actions_1.getMyProducts, removeMyProduct: actions_1.removeMyProduct };
exports.default = react_redux_1.connect(mapStateToProps, mapDispatch)(PerformerProductsPage);
