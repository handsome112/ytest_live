"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable no-return-assign */
/* eslint-disable react/react-in-jsx-scope */
const antd_1 = require("antd");
const utils_1 = require("@lib/utils");
const head_1 = __importDefault(require("next/head"));
const page_header_1 = __importDefault(require("@components/common/layout/page-header"));
const actions_1 = require("@redux/products/actions");
const actions_2 = require("@redux/user/actions");
const react_redux_1 = require("react-redux");
const react_1 = require("react");
const product_card_1 = __importDefault(require("src/components/products/product-card"));
const router_1 = require("next/router");
const services_1 = require("src/services");
const react_infinite_scroller_1 = __importDefault(require("react-infinite-scroller"));
const modal_buy_assets_1 = __importDefault(require("src/components/performer-assets/common/modal-buy-assets"));
class ProductsPage extends react_1.PureComponent {
    constructor(props) {
        super(props);
        this.state = { limit: 12, offset: 0 };
    }
    static async getInitialProps({ ctx }) {
        const { query } = ctx;
        try {
            if (query.performer) {
                return {
                    performer: JSON.parse(query.performer)
                };
            }
            if (query.username) {
                const resp = await services_1.performerService.details(query.username);
                return {
                    performer: resp.data
                };
            }
        }
        catch (error) {
            return {};
        }
        return {};
    }
    componentDidMount() {
        this.getProducts();
    }
    onPurchaseSuccess(data, id) {
        actions_2.updateCurrentUserBalance(-data.data.totalPrice);
        actions_1.purchaseProductSuccess(id);
    }
    async getProducts() {
        const { router, performer, getPerformerProducts: dispatchGetPerformerProducts } = this.props;
        const performerId = performer ? performer._id : '';
        await dispatchGetPerformerProducts(Object.assign(Object.assign(Object.assign({}, router.query), this.state), { performerId }));
    }
    async infinityScroll() {
        try {
            const { limit } = this.state;
            let { offset } = this.state;
            offset = limit + offset;
            const { router, performer, loadMorePerformerProduct: dispatchLoadMorePerformerProduct } = this.props;
            const performerId = performer ? performer._id : '';
            const resp = await services_1.productService.search(Object.assign(Object.assign({}, router.query), { limit,
                offset,
                performerId }));
            dispatchLoadMorePerformerProduct(resp.data.data);
            this.setState({ offset });
        }
        catch (e) {
            const err = await Promise.resolve(e);
            antd_1.message.error(utils_1.getResponseError(err));
        }
    }
    purchase(item) {
        if (item.type === 'digital' && item.isBought) {
            return antd_1.message.success('You have bought this product, please check your email to get link.');
        }
        this.ref.showModalBuyAssets(item, 'product');
        return {};
    }
    render() {
        const { data, total, searching, success, performer, router: { query }, ids } = this.props;
        const hasMore = ids.length < total;
        const username = performer && performer.username;
        return (<>
        <head_1.default>
          <title>
            {' '}
            {username || ''}
            {' '}
            Products
          </title>
        </head_1.default>
        <div className="main-container">
          <page_header_1.default title={`${username || ''} Products`}/>
          {success && (<div className="products-page">
              {query.username && !performer && (<antd_1.Alert message="Performer not found." banner/>)}
              {searching ? (<p>Loading...</p>) : (<react_infinite_scroller_1.default loadMore={this.infinityScroll.bind(this)} hasMore={hasMore} loader={<p key={0}>Loading...</p>}>
                  <antd_1.Row gutter={20}>
                    {ids && ids.length > 0 ? (ids.map((id) => (<antd_1.Col xl={4} md={6} sm={8} xs={24} key={id}>
                          <product_card_1.default product={data[id]} onHandlePurchase={this.purchase.bind(this)}/>
                        </antd_1.Col>))) : (<p className="no-items-found">No product found.</p>)}
                  </antd_1.Row>
                </react_infinite_scroller_1.default>)}
            </div>)}
          <modal_buy_assets_1.default {...this.props} ref={(ref) => (this.ref = ref)} onSucess={this.onPurchaseSuccess.bind(this)}/>
        </div>
      </>);
    }
}
ProductsPage.authenticate = false;
ProductsPage.layout = 'public';
const mapStates = (state) => (Object.assign(Object.assign({}, state.product), { loggedIn: state.auth.loggedIn }));
const mapDispatch = {
    getPerformerProducts: actions_1.getPerformerProducts,
    loadMorePerformerProduct: actions_1.loadMorePerformerProduct,
    updateCurrentUserBalance: actions_2.updateCurrentUserBalance,
    purchaseProductSuccess: actions_1.purchaseProductSuccess
};
exports.default = router_1.withRouter(react_redux_1.connect(mapStates, mapDispatch)(ProductsPage));
