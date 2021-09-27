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
/* eslint-disable no-return-assign */
/* eslint-disable no-nested-ternary */
const antd_1 = require("antd");
const page_header_1 = __importDefault(require("@components/common/layout/page-header"));
const head_1 = __importDefault(require("next/head"));
const react_1 = __importStar(require("react"));
const utils_1 = require("@lib/utils");
const services_1 = require("src/services");
const react_redux_1 = require("react-redux");
const router_1 = __importStar(require("next/router"));
const actions_1 = require("@redux/galleries/actions");
const actions_2 = require("@redux/user/actions");
const react_infinite_scroller_1 = __importDefault(require("react-infinite-scroller"));
const modal_buy_assets_1 = __importDefault(require("src/components/performer-assets/common/modal-buy-assets"));
const gallery_card_1 = __importDefault(require("@components/galleries/gallery-card"));
class GalleriesPage extends react_1.PureComponent {
    constructor(props) {
        super(props);
        this.state = { limit: 60, offset: 0 };
    }
    static async getInitialProps({ ctx }) {
        try {
            const { query } = ctx;
            if (query.performer) {
                return { performer: JSON.parse(query.performer) };
            }
            if (query.username) {
                const resp = await services_1.performerService.details(query.username);
                return { performer: resp.data };
            }
            return {};
        }
        catch (error) {
            return {};
        }
    }
    componentDidMount() {
        this.getGalleries();
    }
    onPurchaseSuccess(data, id) {
        const { updateCurrentUserBalance: dispatchUpdateCurrentUserBalance, purchaseGallerySuccess: dispatchPurchaseGallerySuccess } = this.props;
        dispatchUpdateCurrentUserBalance(-data.data.totalPrice);
        dispatchPurchaseGallerySuccess(id);
    }
    async getGalleries() {
        const { performer, router, getPerformerGalleries: dispatchGetPerformerGalleries } = this.props;
        try {
            const performerId = performer ? performer._id : '';
            dispatchGetPerformerGalleries(Object.assign(Object.assign(Object.assign({}, this.state), router.query), { performerId }));
        }
        catch (error) {
            const err = await Promise.resolve(error);
            antd_1.message.error(utils_1.getResponseError(err));
        }
    }
    async loadMore() {
        try {
            let { offset } = this.state;
            const { limit } = this.state;
            const { router: { query }, performer, addPerformerGalleries: dispatchAddPerformerGalleries } = this.props;
            const performerId = performer ? performer._id : '';
            offset = limit + offset;
            const resp = await services_1.galleryService.search(Object.assign(Object.assign({}, query), { performerId,
                limit,
                offset }), false);
            dispatchAddPerformerGalleries(resp.data.data);
            this.setState({ offset });
        }
        catch (error) {
            const err = await Promise.resolve(error);
            antd_1.message.error(utils_1.getResponseError(err));
        }
    }
    purchase(item) {
        if (item.isBought) {
            return router_1.default.push({
                pathname: '/photos',
                query: {
                    data: JSON.stringify(item),
                    id: item._id
                }
            }, `/photos/${item._id}`);
        }
        this.ref.showModalBuyAssets(item, 'gallery');
        return {};
    }
    render() {
        const { performer, router: { query }, searching, ids, total, data, success } = this.props;
        const hasMore = ids.length < total;
        return (<>
        <head_1.default>
          <title>
            {(performer === null || performer === void 0 ? void 0 : performer.username) ? `${performer === null || performer === void 0 ? void 0 : performer.username}'s ` : ''}
            Galleries
            {' '}
          </title>
        </head_1.default>
        <div className="main-container">
          <page_header_1.default title={`${(performer === null || performer === void 0 ? void 0 : performer.username) ? `${performer === null || performer === void 0 ? void 0 : performer.username}'s ` : ''}
            Galleries`}/>
          {query.username && !performer && (<antd_1.Alert message="Performer not found." banner/>)}
          <div className="galleries-page">
            {searching ? (<p>Loading...</p>) : success ? (<react_infinite_scroller_1.default loadMore={this.loadMore.bind(this)} hasMore={hasMore} loader={<p key={0}>Loading...</p>}>
                <antd_1.Row gutter={20}>
                  {ids && ids.length > 0 ? (ids.map((id) => data[id].numOfItems > 0 && (<antd_1.Col xl={4} md={6} sm={8} xs={24} key={id}>
                        <gallery_card_1.default gallery={data[id]} onHandlePurchase={this.purchase.bind(this)}/>
                      </antd_1.Col>))) : (<p className="no-items-found">No gallery found.</p>)}
                </antd_1.Row>
              </react_infinite_scroller_1.default>) : (<p>Server error</p>)}
          </div>
          <modal_buy_assets_1.default ref={(ref) => (this.ref = ref)} onSucess={this.onPurchaseSuccess.bind(this)} {...this.props}/>
        </div>
      </>);
    }
}
GalleriesPage.authentica = false;
GalleriesPage.layout = 'public';
const mapStates = (state) => (Object.assign(Object.assign({}, state.galleries), { loggedIn: state.auth.loggedIn }));
const mapDispatchs = {
    getPerformerGalleries: actions_1.getPerformerGalleries,
    addPerformerGalleries: actions_1.addPerformerGalleries,
    updateCurrentUserBalance: actions_2.updateCurrentUserBalance,
    purchaseGallerySuccess: actions_1.purchaseGallerySuccess
};
exports.default = router_1.withRouter(react_redux_1.connect(mapStates, mapDispatchs)(GalleriesPage));
