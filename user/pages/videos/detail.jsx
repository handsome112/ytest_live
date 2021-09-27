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
const icons_1 = require("@ant-design/icons");
const head_1 = __importDefault(require("next/head"));
const react_1 = __importStar(require("react"));
require("./index.less");
const actions_1 = require("@redux/user/actions");
const services_1 = require("src/services");
const react_redux_1 = require("react-redux");
const popup_1 = __importDefault(require("src/components/common/base/popup"));
const lib_1 = require("src/lib");
const next_cookies_1 = __importDefault(require("next-cookies"));
const _error_1 = __importDefault(require("pages/_error"));
const loader_1 = __importDefault(require("@components/common/base/loader"));
const numberformat_1 = __importDefault(require("@components/common/layout/numberformat"));
const router_1 = __importDefault(require("next/router"));
const profile_card_1 = __importDefault(require("@components/performer/profile-card"));
class VideoDetailPage extends react_1.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            video: null,
            loading: true,
            success: false
        };
    }
    static async getInitialProps({ ctx }) {
        try {
            const { query } = ctx;
            if (query.data)
                return { data: JSON.parse(query.data), isBrowser: process.browser };
            if (query.id) {
                const { token } = next_cookies_1.default(ctx);
                const headers = { Authorization: token };
                const resp = await services_1.videoService.userFindVideoById(query.id, headers);
                return {
                    data: resp.data,
                    isBrowser: process.browser
                };
            }
        }
        catch (_a) {
            return {};
        }
        return {};
    }
    componentDidMount() {
        const { data, isBrowser } = this.props;
        isBrowser
            ? this.getVideoDetail()
            : this.setState({ video: data, success: true, loading: false });
    }
    async onOk() {
        const { currentUser, data, updateCurrentUserBalance: dispatchUpdateCurrentUserBalance } = this.props;
        try {
            if (!currentUser || !currentUser._id) {
                antd_1.message.error('Please login to buy this video!');
                return router_1.default.push('/auth/login');
            }
            await services_1.purchaseItemService.purchaseVideo(data._id);
            this.popupRef && this.popupRef.setVisible(false);
            this.getVideoDetail();
            const value = -1 * data.token;
            dispatchUpdateCurrentUserBalance(value);
        }
        catch (error) {
            this.responseError(error);
        }
        return undefined;
    }
    async getVideoDetail() {
        const { data } = this.props;
        this.setState({ success: false, loading: true });
        try {
            const resp = await services_1.videoService.userFindVideoById(data._id);
            this.setState({ video: resp.data, success: true });
        }
        catch (error) {
            this.responseError(error);
        }
        finally {
            this.setState({ loading: false });
        }
    }
    purchase() {
        const { loggedIn } = this.props;
        if (!loggedIn)
            return antd_1.message.error('Please login to buy this video!');
        this.popupRef && this.popupRef.setVisible(true);
        return undefined;
    }
    download() {
        const { video } = this.state;
        if (!video)
            return;
        if (video.isBought || !video.isSaleVideo) {
            const e = document.createElement('a');
            e.href = video.video.url;
            e.target = '_blank';
            document.body.appendChild(e);
            e.click();
        }
    }
    async responseError(e) {
        const err = await Promise.resolve(e);
        antd_1.message.error(lib_1.getResponseError(err));
    }
    render() {
        var _a, _b, _c, _d;
        const { video, success, loading } = this.state;
        const { data, ui, loggedIn } = this.props;
        if (!data)
            return <_error_1.default statusCode={404}/>;
        const dataSource = [
            { title: 'Posted by:', description: (_a = data === null || data === void 0 ? void 0 : data.performer) === null || _a === void 0 ? void 0 : _a.username },
            { title: 'Added on:', description: lib_1.formatDate(data.createdAt) },
            { title: 'Duration:', description: lib_1.formatDuration((_b = data.video) === null || _b === void 0 ? void 0 : _b.duration) }
        ];
        data.isSaleVideo
            && dataSource.push({
                title: 'Price: ',
                description: <numberformat_1.default value={data.token} suffix=" Tokens"/>
            });
        return (<>
        <head_1.default>
          <title>{video && video.title ? video.title : 'Video'}</title>
          <meta name="keywords" content={video && video.description}/>
          <meta name="description" content={video && video.description}/>
          {/* OG tags */}
          <meta property="og:title" content={`${ui === null || ui === void 0 ? void 0 : ui.siteName} | ${(video === null || video === void 0 ? void 0 : video.title) || 'Video'}`} key="title"/>
          <meta property="og:image" content={video && video.thumbnail}/>
          <meta property="og:keywords" content={video && video.description}/>
          <meta property="og:description" content={video && video.description}/>
        </head_1.default>
        <>
          <popup_1.default ref={(ref) => (this.popupRef = ref)} title={`Buy Video ${data === null || data === void 0 ? void 0 : data.title}`} content={(<div>
                <strong>Available high quality Video</strong>
                <h3>
                  <numberformat_1.default value={data.token} prefix={`Buy ${lib_1.capitalizeFirstLetter((data === null || data === void 0 ? void 0 : data.title) || '')} For `} suffix=" Tokens"/>
                </h3>
              </div>)} onOk={this.onOk.bind(this)}/>
          <div className="video-detail-page">
            {!loading && success ? (<>
                <div className="video-header">
                  <div className="vid-title">{video === null || video === void 0 ? void 0 : video.title}</div>
                  <div className="vid-duration">
                    <icons_1.HourglassOutlined />
                    &nbsp;
                    {lib_1.formatDuration(((_c = video === null || video === void 0 ? void 0 : video.video) === null || _c === void 0 ? void 0 : _c.duration) || 0)}
                  </div>
                  <div className="vid-duration">
                    <icons_1.ClockCircleOutlined />
                    &nbsp;
                    {lib_1.formatDate(video === null || video === void 0 ? void 0 : video.createdAt)}
                  </div>
                </div>
                <div className="video-player">
                  {(!video.isSaleVideo || video.isBought) && (<video src={(_d = video === null || video === void 0 ? void 0 : video.video) === null || _d === void 0 ? void 0 : _d.url} controls poster={video === null || video === void 0 ? void 0 : video.thumbnail}/>)}
                  {video.isSaleVideo && !video.isBought && video.trailer && (<>
                      <video src={video === null || video === void 0 ? void 0 : video.trailer.url} controls poster={video === null || video === void 0 ? void 0 : video.thumbnail}/>
                      <p style={{ margin: '10px', textAlign: 'center' }}>
                        You&apos;re watching teaser video
                      </p>
                    </>)}
                  {video.isSaleVideo && !video.isBought && !video.trailer && (<img src={video === null || video === void 0 ? void 0 : video.thumbnail} alt=""/>)}
                </div>

                <div className="video-stats">
                  {(video === null || video === void 0 ? void 0 : video.isSaleVideo) && !video.isBought && (<antd_1.Button type="primary" htmlType="button" onClick={this.purchase.bind(this)}>
                      Buy Video
                    </antd_1.Button>)}
                  {((loggedIn && (video === null || video === void 0 ? void 0 : video.isBought))
                    || (loggedIn && !(video === null || video === void 0 ? void 0 : video.isSaleVideo))) && (<antd_1.Button type="dashed" htmlType="button" onClick={this.download.bind(this)}>
                      <icons_1.DownloadOutlined />
                      {' '}
                      Download
                    </antd_1.Button>)}
                </div>
                {(video === null || video === void 0 ? void 0 : video.isSaleVideo) && !(video === null || video === void 0 ? void 0 : video.isBought) && (<div style={{ margin: '10px 0' }}>
                    <antd_1.Alert message="To view full content, please buy this video!" type="error"/>
                  </div>)}
                <div className="video-info">
                  <div className="video-description">
                    {(video === null || video === void 0 ? void 0 : video.description) || 'No video description'}
                  </div>
                </div>
                {(data === null || data === void 0 ? void 0 : data.performer) && (<profile_card_1.default placeholderAvatarUrl={ui === null || ui === void 0 ? void 0 : ui.placeholderAvatarUrl} performer={data.performer} searching={loading} success={success}/>)}
              </>) : (<>
                <loader_1.default spinning/>
              </>)}
          </div>
        </>
      </>);
    }
}
VideoDetailPage.authenticate = false;
VideoDetailPage.layout = 'public';
const mapStates = (state) => ({
    ui: state.ui,
    loggedIn: state.auth.loggedIn,
    currentUser: state.user.current,
    currentPerformer: state.performer.current
});
const mapDispatchs = { updateCurrentUserBalance: actions_1.updateCurrentUserBalance };
exports.default = react_redux_1.connect(mapStates, mapDispatchs)(VideoDetailPage);
