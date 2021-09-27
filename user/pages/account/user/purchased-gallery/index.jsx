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
const antd_1 = require("antd");
const page_header_1 = __importDefault(require("@components/common/layout/page-header"));
const head_1 = __importDefault(require("next/head"));
const react_1 = __importStar(require("react"));
const purchased_gallery_card_1 = __importDefault(require("src/components/galleries/purchased-gallery-card"));
const services_1 = require("src/services");
const lib_1 = require("src/lib");
const lodash_1 = require("lodash");
class PurchasedGalleriesPage extends react_1.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            limit: 12,
            offset: 0,
            sortBy: 'createdAt',
            sort: 'desc',
            data: [],
            total: 0,
            loading: false
        };
    }
    componentDidMount() {
        this.loadData();
    }
    async loadData() {
        const query = lodash_1.omit(this.state, ['data', 'total', 'loading']);
        await this.setState({ loading: true });
        try {
            await this.setState({ loading: true });
            const resp = await services_1.galleryService.purchased(Object.assign({}, query));
            await this.setState({ data: resp.data.data, total: resp.data.total });
        }
        catch (error) {
            this.showError(error);
        }
        finally {
            await this.setState({ loading: false });
        }
    }
    async showError(e) {
        const err = await Promise.resolve(e);
        antd_1.message.error(lib_1.getResponseError(err));
    }
    async pageChange(page) {
        const { limit } = this.state;
        await this.setState({ offset: (page - 1) * limit });
        this.loadData();
    }
    render() {
        const { data, loading, total, limit } = this.state;
        return (<>
        <head_1.default>
          <title>My Purchased Galleries</title>
        </head_1.default>
        <div className="main-profile-background">
          <page_header_1.default title="Purchased Gallery"/>
          <div className="purchased-videos-page pad40">
            {!loading && (data === null || data === void 0 ? void 0 : data.length) ? (<antd_1.Row>
                {data.map((gallery) => (<antd_1.Col lg={6} md={8} sm={12} xs={24} key={gallery._id} style={{ padding: '0 10px' }}>
                    <purchased_gallery_card_1.default gallery={gallery.targetInfo}/>
                  </antd_1.Col>))}
                {total > limit && (<antd_1.Col sm={24} style={{ textAlign: 'center' }}>
                  <antd_1.Pagination onChange={this.pageChange.bind(this)} defaultCurrent={1} pageSize={limit} total={total}/>
                </antd_1.Col>)}
              </antd_1.Row>) : (<div className="pad20">
                You have not purchased any galleries yet.
              </div>)}
          </div>
        </div>
      </>);
    }
}
PurchasedGalleriesPage.authenticate = true;
PurchasedGalleriesPage.layout = 'primary';
exports.default = PurchasedGalleriesPage;
