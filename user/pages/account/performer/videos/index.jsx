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
const react_1 = __importStar(require("react"));
const antd_1 = require("antd");
const page_header_1 = __importDefault(require("@components/common/layout/page-header"));
const head_1 = __importDefault(require("next/head"));
const react_redux_1 = require("react-redux");
const actions_1 = require("@redux/performer/actions");
const services_1 = require("src/services");
const utils_1 = require("@lib/utils");
const video_grid_1 = __importDefault(require("@components/videos/video-grid"));
const router_1 = __importDefault(require("next/router"));
const popup_video_1 = __importDefault(require("@components/videos/popup-video"));
require("./index.less");
const loader_1 = __importDefault(require("@components/common/base/loader"));
class PerformerVideosPage extends react_1.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            limit: 12,
            offset: 0
        };
    }
    componentDidMount() {
        this.loadVideos();
    }
    async onRemove(id) {
        const { removeMyVideo: dispatchRemoveMyVideo } = this.props;
        try {
            await services_1.videoService.removeMyVideo(id);
            antd_1.message.success('Removed!');
            dispatchRemoveMyVideo(id);
        }
        catch (e) {
            this.showError(e);
        }
    }
    async addVideos() {
        const { addMyVideos: dispatchAddMyVideos } = this.props;
        try {
            const { limit } = this.state;
            let { offset } = this.state;
            offset = limit + offset;
            const resp = await services_1.videoService.myVideos(Object.assign(Object.assign({}, this.state), { offset }));
            dispatchAddMyVideos(resp.data.data);
            this.setState({ offset });
        }
        catch (e) {
            this.showError(e);
        }
    }
    loadVideos() {
        const { getMyVideos: dispatchGetMyVideos } = this.props;
        dispatchGetMyVideos(Object.assign(Object.assign({}, this.state), { offset: 0 }));
    }
    async showError(e) {
        const err = await Promise.resolve(e);
        antd_1.message.error(utils_1.getResponseError(err));
    }
    render() {
        const { data, searching, total, success } = this.props;
        return (<>
        <head_1.default>
          <title>My Videos</title>
        </head_1.default>
        <div className="performer-videos-page">
          <page_header_1.default title="Videos" extra={(<antd_1.Button type="primary" onClick={() => router_1.default.push('/account/performer/videos/add')}>
                Upload Video
              </antd_1.Button>)}/>
          <loader_1.default spinning={searching}/>
          <video_grid_1.default success={success} addVideos={this.addVideos.bind(this)} remove={this.onRemove.bind(this)} data={data} hasMore={!searching && data.length < total} title="" onViewVideo={(video) => this.ref.showModalBuyAssets(video.video.url || '')}/>
          <popup_video_1.default ref={(ref) => (this.ref = ref)}/>
        </div>
      </>);
    }
}
PerformerVideosPage.authenticate = true;
PerformerVideosPage.layout = 'primary';
const mapStateToProps = (state) => (Object.assign({}, state.performer.assets.videos));
const mapDispatch = { getMyVideos: actions_1.getMyVideos, removeMyVideo: actions_1.removeMyVideo, addMyVideos: actions_1.addMyVideos };
exports.default = react_redux_1.connect(mapStateToProps, mapDispatch)(PerformerVideosPage);
