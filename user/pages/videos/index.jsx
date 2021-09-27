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
const head_1 = __importDefault(require("next/head"));
const react_redux_1 = require("react-redux");
const react_1 = __importStar(require("react"));
const actions_1 = require("src/redux/videos/actions");
const router_1 = require("next/router");
const react_infinite_scroller_1 = __importDefault(require("react-infinite-scroller"));
const video_single_card_1 = __importDefault(require("@components/videos/video-single-card"));
const lib_1 = require("src/lib");
const services_1 = require("src/services");
require("./index.less");
const loader_1 = __importDefault(require("@components/common/base/loader"));
class VideosPage extends react_1.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            limit: 12,
            offset: 0
        };
    }
    static async getInitialProps({ ctx }) {
        try {
            const { query } = ctx;
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
        catch (_a) {
            return {};
        }
        return {};
    }
    componentDidMount() {
        const { router, getPerformersVideos: dispatchGetPerformersVideos, performer } = this.props;
        const performerId = performer ? performer._id : '';
        dispatchGetPerformersVideos(Object.assign(Object.assign(Object.assign({}, router.query), this.state), { performerId }));
    }
    async loadMore() {
        try {
            let { offset } = this.state;
            const { limit } = this.state;
            const { router: { query }, performer, addPerformerVideos: dispatchAddPerformerVideos } = this.props;
            const performerId = performer ? performer._id : '';
            offset = limit + offset;
            const resp = await services_1.videoService.search(Object.assign(Object.assign({}, query), { performerId,
                limit,
                offset }));
            dispatchAddPerformerVideos(resp.data.data);
            this.setState({ offset });
        }
        catch (e) {
            this.showError(e);
        }
    }
    async showError(e) {
        const err = await Promise.resolve(e);
        antd_1.message.error(lib_1.getResponseError(err));
    }
    render() {
        const { ids, data, searching, success, error, total, performer, router: { query } } = this.props;
        const username = performer && performer.username;
        const hasMore = ids.length < total;
        return (<>
        <head_1.default>
          <title>
            {`${username}'s ` || ''}
            {' '}
            Videos
            {' '}
          </title>
        </head_1.default>
        {searching && (<loader_1.default spinning fullScreen/>)}
        {error && (<antd_1.Alert type="error" message="Error request" banner/>)}
        {success && (<div className="videos-page">
            {query.username && !performer && (<antd_1.Alert message="Performer not found." banner/>)}
            <react_infinite_scroller_1.default loadMore={this.loadMore.bind(this)} hasMore={hasMore} loader={<p key={0}>Loading...</p>}>
              <antd_1.Card title={`${username || ''} Videos`} bordered={false} hoverable={false}>
                {ids.length > 0
                    && ids.map((id) => (<antd_1.Card.Grid hoverable={false}>
                    <video_single_card_1.default {...data[id]} key={id} video={data[id]}/>
                  </antd_1.Card.Grid>))}
              </antd_1.Card>
            </react_infinite_scroller_1.default>
          </div>)}

      </>);
    }
}
VideosPage.authentica = false;
VideosPage.layout = 'public';
const mapStateToProps = (state) => (Object.assign({}, state.videos));
const mapDispatchs = { getPerformersVideos: actions_1.getPerformersVideos, addPerformerVideos: actions_1.addPerformerVideos };
exports.default = router_1.withRouter(react_redux_1.connect(mapStateToProps, mapDispatchs)(VideosPage));
