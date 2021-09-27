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
const antd_1 = require("antd");
const head_1 = __importDefault(require("next/head"));
const react_1 = __importStar(require("react"));
const purchased_video_card_1 = __importDefault(require("src/components/videos/purchased-video-card"));
const services_1 = require("src/services");
const popup_video_1 = __importDefault(require("src/components/videos/popup-video"));
const lib_1 = require("src/lib");
const page_header_1 = __importDefault(require("@components/common/layout/page-header"));
const loader_1 = __importDefault(require("@components/common/base/loader"));
class PurchasedVideoPage extends react_1.PureComponent {
    constructor(props) {
        super(props);
        this.popupRef = react_1.createRef();
        this.state = {
            limit: 12,
            offset: 0,
            transactions: [],
            loading: false,
            success: false,
            total: 0
        };
    }
    componentDidMount() {
        this.loadData();
    }
    async loadData() {
        const { limit, offset } = this.state;
        try {
            this.setState({ loading: true });
            const resp = await services_1.videoService.purchased({
                limit,
                offset
            });
            this.setState({
                transactions: resp.data.data,
                success: true,
                total: resp.data.total
            });
        }
        catch (error) {
            this.showError(error);
        }
        finally {
            this.setState({ loading: false });
        }
    }
    async pageChange(page) {
        const { limit } = this.state;
        await this.setState({ offset: (page - 1) * limit });
        this.loadData();
    }
    async showError(e) {
        const err = await Promise.resolve(e);
        antd_1.message.error(lib_1.getResponseError(err));
    }
    async playVideo(videoId) {
        var _a, _b, _c, _d;
        const video = await services_1.videoService.userFindVideoById(videoId);
        this.popupRef.showModalBuyAssets((_b = (_a = video.data) === null || _a === void 0 ? void 0 : _a.video) === null || _b === void 0 ? void 0 : _b.url);
        if ((_d = (_c = video.data) === null || _c === void 0 ? void 0 : _c.video) === null || _d === void 0 ? void 0 : _d.url) {
            services_1.videoService.increaseView(videoId);
        }
        return true;
    }
    render() {
        const { transactions, success, total, limit, loading } = this.state;
        return (<>
        <head_1.default>
          <title>My Purchased Videos</title>
        </head_1.default>
        <div className="main-profile-background">
          <page_header_1.default title="Purchased Videos"/>
          <div className="purchased-videos-page pad40">
            {loading && <loader_1.default spinning fullScreen/>}
            {success && transactions.length > 0 ? (<>
                <antd_1.Row>
                  {transactions.map((transaction) => (<antd_1.Col lg={6} md={8} sm={12} xs={24} key={transaction._id} style={{ padding: '0 10px' }}>
                      <purchased_video_card_1.default video={transaction.targetInfo} performer={transaction.sellerInfo} onClick={() => this.playVideo(transaction.targetId)}/>
                    </antd_1.Col>))}
                  {total > limit && (<antd_1.Col sm={24} style={{ textAlign: 'center' }}>
                    <antd_1.Pagination onChange={this.pageChange.bind(this)} defaultCurrent={1} pageSize={limit} total={total}/>
                  </antd_1.Col>)}
                </antd_1.Row>
              </>) : (<div className="pad20">
                You have not purchased any videos yet.
              </div>)}
          </div>
        </div>
        <div className="popup-video">
          <popup_video_1.default ref={(ref) => (this.popupRef = ref)}/>
        </div>
      </>);
    }
}
PurchasedVideoPage.authenticate = true;
PurchasedVideoPage.layout = 'primary';
exports.default = PurchasedVideoPage;
