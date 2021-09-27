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
/* eslint-disable dot-notation */
const react_1 = __importStar(require("react"));
const head_1 = __importDefault(require("next/head"));
const antd_1 = require("antd");
const interfaces_1 = require("src/interfaces");
const react_redux_1 = require("react-redux");
const services_1 = require("src/services");
const socket_1 = require("src/socket");
const next_cookies_1 = __importDefault(require("next-cookies"));
const modal_buy_assets_1 = __importDefault(require("@components/performer-assets/common/modal-buy-assets"));
const product_carousel_1 = __importDefault(require("@components/performer-assets/product-carousel"));
const video_carousel_1 = __importDefault(require("@components/performer-assets/video-carousel"));
const gallery_carousel_1 = __importDefault(require("@components/performer-assets/gallery-carousel"));
const profile_card_1 = __importDefault(require("@components/performer/profile-card"));
const performer_carousel_1 = __importDefault(require("@components/performer/performer-carousel"));
const header_1 = __importDefault(require("@components/streaming/header"));
const footer_1 = __importDefault(require("@components/streaming/footer"));
const router_1 = __importDefault(require("next/router"));
const chat_box_1 = __importDefault(require("@components/stream-chat/chat-box"));
const subscriber_1 = __importDefault(require("src/components/streaming/subscriber"));
const actions_1 = require("@redux/stream-chat/actions");
const actions_2 = require("@redux/performer/actions");
const actions_3 = require("@redux/user/actions");
const utils_1 = require("@lib/utils");
const http_status_codes_1 = require("http-status-codes");
require("./index.less");
const selectors_1 = require("@redux/selectors");
// eslint-disable-next-line no-shadow
var PERFORMER_ASSETS_TYPE;
(function (PERFORMER_ASSETS_TYPE) {
    PERFORMER_ASSETS_TYPE["PRODUCT"] = "product";
    PERFORMER_ASSETS_TYPE["GALLERY"] = "gallery";
    PERFORMER_ASSETS_TYPE["VIDEO"] = "video";
})(PERFORMER_ASSETS_TYPE || (PERFORMER_ASSETS_TYPE = {}));
// eslint-disable-next-line no-shadow
var STREAM_EVENT;
(function (STREAM_EVENT) {
    STREAM_EVENT["JOIN_BROADCASTER"] = "join-broadcaster";
    STREAM_EVENT["MODEL_LEFT"] = "model-left";
    STREAM_EVENT["ROOM_INFORMATIOM_CHANGED"] = "public-room-changed";
    STREAM_EVENT["MODEL_UPDATE_STREAMING_STATUS"] = "modelUpdateStreamingStatus";
    STREAM_EVENT["USER_LEFT_ROOM"] = "USER_LEFT_ROOM";
})(STREAM_EVENT || (STREAM_EVENT = {}));
// eslint-disable-next-line no-shadow
var EVENT;
(function (EVENT) {
    EVENT["BLOCK_USERS"] = "nofify_users_block";
})(EVENT || (EVENT = {}));
const DEFAULT_OFFLINE_IMAGE_URL = '/offline.png';
const DEFAULT_PRIVATE_IMAGE_URL = '/private.png';
const DEFAULT_GROUP_IMAGE_URL = '/group.png';
const DEFAULT_ONLINE_IMAGE_URL = '';
class LivePage extends react_1.PureComponent {
    constructor(props) {
        super(props);
        this.onbeforeunload = () => {
            this.leavePublicRoom();
        };
        this.state = {
            poster: '',
            total: 0,
            members: []
        };
    }
    static async getInitialProps({ ctx }) {
        try {
            const { query } = ctx;
            if (process.browser && query.performer) {
                return {
                    performer: JSON.parse(query.performer)
                };
            }
            const { token } = next_cookies_1.default(ctx);
            const headers = { Authorization: token };
            const resp = await services_1.performerService.details(query.username, headers);
            const performer = resp.data;
            if (performer.isBlocked) {
                throw http_status_codes_1.StatusCodes.FORBIDDEN;
            }
            return {
                performer
            };
        }
        catch (e) {
            // const err = await PromisePurchaseItemModelresolve(e);
            if (process.browser) {
                return router_1.default.push('/');
            }
            ctx.res.writeHead && ctx.res.writeHead(302, { Location: '/' });
            ctx.res.end && ctx.res.end();
            return {};
        }
    }
    componentDidMount() {
        this.subscrbierRef = react_1.default.createRef();
        this.buyAssetsRef = react_1.default.createRef();
        const { performer, user } = this.props;
        if (!performer) {
            router_1.default.push('/');
            return;
        }
        if (user && user.role === 'performer') {
            router_1.default.push('/live');
            return;
        }
        if (user && user.role === 'studio') {
            router_1.default.push('/studio/account-settings');
            return;
        }
        this.socket = this.context;
        router_1.default.events.on('routeChangeStart', this.onbeforeunload);
        window.addEventListener('beforeunload', this.onbeforeunload);
        this.initProfilePage();
    }
    componentDidUpdate(prevProps, prevState) {
        var _a;
        const { poster } = this.state;
        const { performer, data, activeConversation } = this.props;
        if (poster !== prevState.poster) {
            window['player'] && window['player'].poster(poster);
        }
        if (data && data.isBlocked) {
            router_1.default.push('/403');
            return;
        }
        if (performer && performer._id !== prevProps.performer._id) {
            this.initProfilePage();
        }
        if (prevProps.activeConversation !== activeConversation) {
            ((_a = prevProps.activeConversation) === null || _a === void 0 ? void 0 : _a._id)
                && this.socket.emit('public-stream/leave', {
                    conversationId: prevProps.activeConversation._id
                });
        }
    }
    componentWillUnmount() {
        window.removeEventListener('beforeunload', this.onbeforeunload);
        router_1.default.events.off('routeChangeStart', this.onbeforeunload);
    }
    onChange({ total, members, conversationId }) {
        var _a;
        const { activeConversation } = this.props;
        if (((_a = activeConversation === null || activeConversation === void 0 ? void 0 : activeConversation.data) === null || _a === void 0 ? void 0 : _a._id) === conversationId) {
            this.setState({ total, members });
        }
    }
    onBoughtAssetSuccess(type, id, payload) {
        const { updatePerformerAsset: dispatchUpdatePerformerAsset } = this.props;
        dispatchUpdatePerformerAsset({ type, id, payload });
    }
    setPoster(status) {
        const { settings } = this.props;
        switch (status) {
            case 'private':
                this.setState({
                    poster: settings.defaultPrivateCallImage || DEFAULT_PRIVATE_IMAGE_URL
                });
                break;
            case 'offline':
                window['player'] && window['player'].controls(false);
                window['player'] && window['player'].reset();
                this.setState({
                    poster: settings.defaultOfflineModelImage || DEFAULT_OFFLINE_IMAGE_URL
                });
                break;
            case 'public':
                this.setState({ poster: DEFAULT_ONLINE_IMAGE_URL });
                break;
            case 'group':
                this.setState({
                    poster: settings.defaultGroupChatImage || DEFAULT_GROUP_IMAGE_URL
                });
                break;
            default:
                this.setState({
                    poster: settings.defaultOfflineModelImage || DEFAULT_OFFLINE_IMAGE_URL
                });
                break;
        }
    }
    async joinPeformerPublicRoom() {
        const { performer, loadStreamMessages: dispatchLoadStreamMessages, getStreamConversationSuccess: dispatchGetStreamConversationSuccess } = this.props;
        if (performer) {
            try {
                // this.setState({ loading: true })
                const resp = await services_1.messageService.findPublicConversationPerformer(performer._id);
                const conversation = resp.data;
                if (conversation && conversation._id) {
                    dispatchGetStreamConversationSuccess({ data: conversation });
                    dispatchLoadStreamMessages({
                        conversationId: conversation._id,
                        limit: 25,
                        offset: 0,
                        type: conversation.type
                    });
                    this.socket = this.context;
                    this.socket
                        && this.socket.emit('public-stream/join', {
                            conversationId: conversation._id
                        });
                }
                else {
                    throw new Promise((resolve) => resolve('No available broadcast. Try again later'));
                }
            }
            catch (e) {
                const error = await Promise.resolve(e);
                antd_1.message.error(utils_1.getResponseError(error));
            }
            finally {
                // this.setState({ loading: false});
            }
        }
    }
    initProfilePage() {
        var _a;
        const { performer, performer: { streamingStatus }, getPerformerDetails: dispatchGetPerformerDetail } = this.props;
        (_a = this.subscrbierRef.current) === null || _a === void 0 ? void 0 : _a.resetPlaybackVideo();
        this.setPoster(streamingStatus);
        const content = document.querySelector('.content');
        content.scroll({ top: 0, behavior: 'auto' });
        dispatchGetPerformerDetail(performer);
        this.inscreaseView();
        this.joinPeformerPublicRoom();
    }
    async subscribe({ performerId }) {
        var _a, _b;
        try {
            const { settings: { optionForBroadcast }, performer } = this.props;
            if (performer._id !== performerId) {
                return;
            }
            const resp = await services_1.streamService.joinPublicChat(performerId);
            const { sessionId } = resp.data;
            if (optionForBroadcast === interfaces_1.HLS) {
                (_a = this.subscrbierRef.current) === null || _a === void 0 ? void 0 : _a.playHLS(sessionId);
            }
            else if (optionForBroadcast === interfaces_1.WEBRTC) {
                (_b = this.subscrbierRef.current) === null || _b === void 0 ? void 0 : _b.play(sessionId);
            }
        }
        catch (err) {
            const error = await Promise.resolve(err);
            antd_1.message.error(utils_1.getResponseError(error));
        }
    }
    leavePublicRoom() {
        var _a;
        if (window['player']) {
            window['player'].reset();
            window['player'].poster('');
        }
        const { activeConversation, resetStreamMessage: dispatchResetStreamMessage } = this.props;
        dispatchResetStreamMessage();
        if (this.socket && ((_a = activeConversation === null || activeConversation === void 0 ? void 0 : activeConversation.data) === null || _a === void 0 ? void 0 : _a._id)) {
            this.socket.emit('public-stream/leave', {
                conversationId: activeConversation.data._id
            });
        }
        this.setState({
            poster: '',
            total: 0,
            members: []
        });
    }
    modelLeftHandler({ performerId }) {
        var _a;
        const { performer } = this.props;
        if (performerId !== performer._id) {
            return;
        }
        (_a = this.subscrbierRef.current) === null || _a === void 0 ? void 0 : _a.stop();
        antd_1.message.info('Model has left the room!');
    }
    async showAssetToBuy(type, item) {
        const { isBought, isSale, name, type: itemType } = item;
        switch (type) {
            case 'gallery':
                if (isBought || !isSale) {
                    router_1.default.push({
                        pathname: '/photos',
                        query: {
                            data: JSON.stringify(item),
                            id: item._id
                        }
                    }, `/photos/${item._id}`);
                    return;
                }
                break;
            case 'product':
                if (isBought && itemType === 'digital') {
                    antd_1.message.info(`You have purchased ${name} already. Please check your email!`);
                    return;
                }
                break;
            default:
                break;
        }
        this.buyAssetsRef.showModalBuyAssets(item, type);
    }
    userBlockHandler({ performerId }) {
        const { performer } = this.props;
        if (performerId === performer._id) {
            router_1.default.push('/403');
        }
    }
    modelUpdateStreamingStatusHander({ status, id }) {
        const { performer } = this.props;
        if (id === performer._id) {
            this.setPoster(status);
        }
    }
    async inscreaseView() {
        try {
            const { performer: { _id: id } } = this.props;
            await services_1.performerService.increaseView(id);
            // eslint-disable-next-line no-empty
        }
        catch (_a) { }
    }
    userLeftRoomHandle({ username, conversationId }) {
        var _a;
        const { activeConversation } = this.props;
        if (((_a = activeConversation === null || activeConversation === void 0 ? void 0 : activeConversation.data) === null || _a === void 0 ? void 0 : _a._id) === conversationId) {
            const { total, members } = this.state;
            const leftMemberIndex = members.findIndex((m) => m.username === username);
            if (leftMemberIndex > -1) {
                this.setState({
                    total: total - 1,
                    members: members.splice(leftMemberIndex, 1)
                });
            }
        }
    }
    render() {
        const { performer, data, searching, success, products, videos, galleries, ui } = this.props;
        const { members, total } = this.state;
        return (<>
        <head_1.default>
          <title>{`${ui === null || ui === void 0 ? void 0 : ui.siteName} | ${performer === null || performer === void 0 ? void 0 : performer.username}`}</title>
        </head_1.default>

        <socket_1.Event event={STREAM_EVENT.JOIN_BROADCASTER} handler={this.subscribe.bind(this)}/>
        <socket_1.Event event={STREAM_EVENT.MODEL_LEFT} handler={this.modelLeftHandler.bind(this)}/>
        <socket_1.Event event={STREAM_EVENT.USER_LEFT_ROOM} handler={this.userLeftRoomHandle.bind(this)}/>
        <socket_1.Event event={STREAM_EVENT.ROOM_INFORMATIOM_CHANGED} handler={this.onChange.bind(this)}/>
        <socket_1.Event event={EVENT.BLOCK_USERS} handler={this.userBlockHandler.bind(this)}/>
        <socket_1.Event event={STREAM_EVENT.MODEL_UPDATE_STREAMING_STATUS} handler={this.modelUpdateStreamingStatusHander.bind(this)}/>

        <div className="profile-page">
          <modal_buy_assets_1.default 
        // eslint-disable-next-line no-return-assign
        ref={(ref) => (this.buyAssetsRef = ref)} onSucess={this.onBoughtAssetSuccess.bind(this)} {...this.props}/>

          <header_1.default {...this.props}/>

          <antd_1.Row className="streaming-container">
            <antd_1.Col md={13} xs={24}>
              <subscriber_1.default {...this.props} ref={this.subscrbierRef} configs={{
                isPlayMode: true
            }}/>
              <footer_1.default {...this.props}/>
            </antd_1.Col>
            <antd_1.Col md={11} xs={24}>
              <chat_box_1.default {...this.props} members={members} totalParticipant={total}/>
            </antd_1.Col>
          </antd_1.Row>
          <antd_1.Row gutter={[
                { sm: 25, xs: 0 },
                { sm: 10, xs: 25 }
            ]}>
            <antd_1.Col xs={{ span: 24 }} lg={{ span: 8 }}>
              <profile_card_1.default placeholderAvatarUrl={ui === null || ui === void 0 ? void 0 : ui.placeholderAvatarUrl} performer={data} searching={searching} success={success}/>
            </antd_1.Col>
            <antd_1.Col xs={{ span: 24 }} lg={{ span: 16 }}>
              <product_carousel_1.default performer={data} products={products} searching={searching} success={success} purchaseProduct={this.showAssetToBuy.bind(this, 'product')}/>
              <video_carousel_1.default performer={data} videos={videos} searching={searching} success={success}/>
              <gallery_carousel_1.default performer={data} galleries={galleries} searching={searching} success={success} purchaseGallery={this.showAssetToBuy.bind(this, 'gallery')}/>
              <performer_carousel_1.default performers={data && data.relatedPerformers} {...this.props}/>
            </antd_1.Col>
          </antd_1.Row>
        </div>
      </>);
    }
}
LivePage.authenticate = false;
LivePage.contextType = socket_1.SocketContext;
const mapStateToProps = (state) => (Object.assign(Object.assign(Object.assign({ ui: state.ui }, state.streaming), state.performer.performerDetails), { user: selectors_1.currentUserSelecter(state), loggedIn: state.auth.loggedIn, activeConversation: state.streamMessage.activeConversation }));
const mapDispatch = {
    loadStreamMessages: actions_1.loadStreamMessages,
    getStreamConversationSuccess: actions_1.getStreamConversationSuccess,
    receiveStreamMessageSuccess: actions_1.receiveStreamMessageSuccess,
    resetStreamMessage: actions_1.resetStreamMessage,
    resetAllStreamMessage: actions_1.resetAllStreamMessage,
    updateCurrentUserBalance: actions_3.updateCurrentUserBalance,
    getPerformerDetails: actions_2.getPerformerDetails,
    updatePerformerAsset: actions_2.updatePerformerAsset
};
exports.default = react_redux_1.connect(mapStateToProps, mapDispatch)(LivePage);
