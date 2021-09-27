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
/* eslint-disable no-console */
const react_1 = __importStar(require("react"));
const head_1 = __importDefault(require("next/head"));
const classnames_1 = __importDefault(require("classnames"));
const antd_1 = require("antd");
const router_1 = __importStar(require("next/router"));
const services_1 = require("src/services");
const react_redux_1 = require("react-redux");
const actions_1 = require("src/redux/streaming/actions");
const socket_1 = require("src/socket");
const chat_box_1 = __importDefault(require("@components/stream-chat/chat-box"));
const actions_2 = require("@redux/stream-chat/actions");
const publisher_1 = __importDefault(require("src/components/streaming/webrtc/privatechat/publisher"));
const subscriber_1 = __importDefault(require("src/components/streaming/webrtc/privatechat/subscriber"));
const utils_1 = require("@lib/utils");
const streaming_1 = require("@components/streaming");
const ant_video_player_1 = __importDefault(require("@components/streaming/ant-video-player"));
// eslint-disable-next-line no-shadow
var STREAM_EVENT;
(function (STREAM_EVENT) {
    STREAM_EVENT["JOINED_THE_ROOM"] = "JOINED_THE_ROOM";
    STREAM_EVENT["JOIN_ROOM"] = "JOIN_ROOM";
    STREAM_EVENT["LEAVE_ROOM"] = "LEAVE_ROOM";
    STREAM_EVENT["RECEIVED_PAID_TOKEN"] = "RECEIVED_PAID_TOKEN";
    STREAM_EVENT["STREAM_INFORMATION_CHANGED"] = "private-stream/streamInformationChanged";
})(STREAM_EVENT || (STREAM_EVENT = {}));
const STREAM_JOINED = 'private-stream/streamJoined';
const STREAM_LEAVED = 'private-stream/streamLeaved';
const JOINED_THE_ROOM = 'JOINED_THE_ROOM';
class ModelPrivateChat extends react_1.PureComponent {
    constructor(props) {
        super(props);
        this.onbeforeunload = () => {
            this.leaveSession();
        };
        this.receivedPaidTokenHandler = ({ token, conversationId }) => {
            var _a;
            const { activeConversation } = this.props;
            const { receivedToken } = this.state;
            if (((_a = activeConversation === null || activeConversation === void 0 ? void 0 : activeConversation.data) === null || _a === void 0 ? void 0 : _a._id) === conversationId) {
                this.setState({
                    receivedToken: receivedToken + token
                });
            }
        };
        this.state = {
            // sessionId: '',
            processing: false,
            roomJoined: false,
            total: 0,
            receivedToken: 0,
            members: []
        };
    }
    static async getInitialProps({ ctx }) {
        if (!ctx.query.id) {
            if (process.browser) {
                router_1.default.push('/');
                return;
            }
            ctx.res.writeHead && ctx.res.writeHead(302, { Location: '/' });
            ctx.res.end && ctx.res.end();
        }
    }
    componentDidMount() {
        const { router, accessPrivateRequest: access } = this.props;
        const { query: { id, streamId } } = router;
        window.addEventListener('beforeunload', this.onbeforeunload);
        router_1.default.events.on('routeChangeStart', this.onbeforeunload);
        this.socket = this.context;
        this.publisherRef = react_1.default.createRef();
        this.subscriberRef = react_1.default.createRef();
        this.previewPlayerRef = react_1.default.createRef();
        this.proccessRequest(streamId);
        access(id);
    }
    componentDidUpdate(prevProps) {
        var _a, _b;
        const { router, activeConversation, accessPrivateRequest: access } = this.props;
        if (prevProps.router.query.id !== router.query.id) {
            const { query: { id, streamId } } = router;
            this.socket = this.context;
            access(id);
            this.previewPlayerRef.current && this.previewPlayerRef.current.stop();
            this.proccessRequest(`${streamId}`);
        }
        if (((_a = activeConversation === null || activeConversation === void 0 ? void 0 : activeConversation.data) === null || _a === void 0 ? void 0 : _a._id)
            && activeConversation !== prevProps.activeConversation) {
            this.initSocketEvent();
            ((_b = prevProps.activeConversation) === null || _b === void 0 ? void 0 : _b._id)
                && this.socket.emit(STREAM_EVENT.LEAVE_ROOM, {
                    conversationId: prevProps.activeConversation._id
                });
        }
    }
    componentWillUnmount() {
        window.removeEventListener('beforeunload', this.onbeforeunload);
        router_1.default.events.off('routeChangeStart', this.onbeforeunload);
    }
    handler({ total, members, conversationId }) {
        var _a;
        const { activeConversation } = this.props;
        if (((_a = activeConversation === null || activeConversation === void 0 ? void 0 : activeConversation.data) === null || _a === void 0 ? void 0 : _a._id) === conversationId) {
            this.setState({
                total,
                members
            });
        }
    }
    initSocketEvent() {
        this.socket = this.context;
        this.socket.on(JOINED_THE_ROOM, ({ streamId, streamList, conversationId }) => {
            const { activeConversation } = this.props;
            if (conversationId !== activeConversation.data._id)
                return;
            this.streamId = streamId;
            this.streamList = streamList;
            this.publisherRef.current
                && this.publisherRef.current.publish(streamId);
            this.previewPlayerRef.current && this.previewPlayerRef.current.stop();
            if (streamList.length) {
                this.subscriberRef.current
                    && this.subscriberRef.current.play(streamList[0]);
            }
        });
        this.socket.on(STREAM_JOINED, (data) => {
            const { activeConversation } = this.props;
            if (data.conversationId !== activeConversation.data._id)
                return;
            if (this.streamId !== data.streamId) {
                this.subscriberRef.current
                    && this.subscriberRef.current.play(data.streamId);
            }
        });
        this.socket.on(STREAM_LEAVED, (data) => {
            const { activeConversation } = this.props;
            if (data.conversationId !== activeConversation.data._id)
                return;
            this.streamList = this.streamList.filter((id) => id !== data.streamId);
            if (this.streamId !== data.streamId) {
                this.subscriberRef.current && this.subscriberRef.current.close();
            }
            antd_1.message.error('Private call has ended.');
            window.setTimeout(() => {
                router_1.default.push('/live');
            }, 1000);
        });
    }
    leaveSession() {
        var _a;
        const { activeConversation, resetStreamMessage: dispatchResetStreamMessage } = this.props;
        dispatchResetStreamMessage();
        if (this.socket && ((_a = activeConversation === null || activeConversation === void 0 ? void 0 : activeConversation.data) === null || _a === void 0 ? void 0 : _a._id)) {
            this.socket.off(JOINED_THE_ROOM);
            this.socket.off(STREAM_JOINED);
            this.socket.off(STREAM_LEAVED);
            this.socket.off(STREAM_EVENT.RECEIVED_PAID_TOKEN);
            this.socket.emit(STREAM_EVENT.LEAVE_ROOM, {
                conversationId: activeConversation.data._id
            });
            this.publisherRef.current && this.publisherRef.current.stop();
            this.subscriberRef.current && this.subscriberRef.current.stop();
            this.previewPlayerRef.current && this.previewPlayerRef.current.stop();
        }
        this.setState({
            processing: false,
            roomJoined: false,
            total: 0,
            receivedToken: 0,
            members: []
        });
    }
    async acceptRequest() {
        const { router, getStreamConversationSuccess: dispatchGetStreamConversationSuccess } = this.props;
        if (!router.query.id)
            return;
        try {
            this.setState({ processing: true });
            const resp = await services_1.streamService.acceptPrivateChat(`${router.query.id}`);
            if (resp && resp.data) {
                this.socket = this.context;
                const { sessionId, conversation } = resp.data;
                this.socket
                    && this.socket.emit(STREAM_EVENT.JOIN_ROOM, {
                        conversationId: conversation._id
                    });
                this.publisherRef.current
                    && this.publisherRef.current.start(conversation._id, sessionId);
                dispatchGetStreamConversationSuccess({
                    data: conversation
                });
            }
        }
        catch (e) {
            const error = await Promise.resolve(e);
            antd_1.message.error(utils_1.getResponseError(error));
        }
        finally {
            this.setState({ processing: false });
        }
    }
    roomJoinedHandler({ total, members, conversationId }) {
        var _a;
        const { activeConversation } = this.props;
        if (((_a = activeConversation === null || activeConversation === void 0 ? void 0 : activeConversation.data) === null || _a === void 0 ? void 0 : _a._id) === conversationId) {
            this.setState({
                roomJoined: true,
                total,
                members
            });
        }
    }
    leave() {
        this.publisherRef.current && this.publisherRef.current.stop();
        this.subscriberRef.current && this.subscriberRef.current.stop();
        setTimeout(() => {
            window.location.href = '/';
        }, 10 * 1000);
    }
    proccessRequest(streamId) {
        const { roomJoined } = this.state;
        if (roomJoined) {
            return;
        }
        if (streamId) {
            setTimeout(() => {
                if (!this.previewPlayerRef.current) {
                    this.proccessRequest(streamId);
                    return;
                }
                this.previewPlayerRef.current.play(streamId);
            }, 1000);
        }
    }
    render() {
        const { settings } = this.props;
        const { processing, total, members, roomJoined, receivedToken } = this.state;
        return (<>
        <head_1.default>
          <title>Private Chat</title>
        </head_1.default>

        <socket_1.Event event={STREAM_EVENT.STREAM_INFORMATION_CHANGED} handler={this.handler.bind(this)}/>
        <socket_1.Event event={STREAM_EVENT.JOINED_THE_ROOM} handler={this.roomJoinedHandler.bind(this)}/>
        <socket_1.Event event={STREAM_EVENT.RECEIVED_PAID_TOKEN} handler={this.receivedPaidTokenHandler.bind(this)}/>

        <antd_1.Row>
          <antd_1.Col md={12} xs={24}>
            {!roomJoined ? (<antd_1.Button type="primary" onClick={this.acceptRequest.bind(this)} loading={processing} block>
                Accept Private Call Request
              </antd_1.Button>) : (<antd_1.Button type="primary" onClick={this.leave.bind(this)} block disabled={processing}>
                Stop Streaming
              </antd_1.Button>)}
            <div className={classnames_1.default('private-streaming-container', !roomJoined ? 'hidden' : '')}>
              <publisher_1.default {...this.props} ref={this.publisherRef} configs={{
                localVideoId: 'private-publisher'
            }}/>
              <subscriber_1.default {...this.props} ref={this.subscriberRef} configs={{
                isPlayMode: true
            }}/>
            </div>
            <ant_video_player_1.default ref={this.previewPlayerRef} settings={settings} configs={{ isPlayMode: true }} containerClassName={roomJoined ? 'hidden' : ''}/>
            <streaming_1.Description roomJoined={roomJoined} receivedToken={receivedToken}/>
          </antd_1.Col>
          <antd_1.Col xs={24} md={12}>
            <chat_box_1.default {...this.props} totalParticipant={total} members={members}/>
          </antd_1.Col>
        </antd_1.Row>
      </>);
    }
}
ModelPrivateChat.authenticate = true;
ModelPrivateChat.onlyPerformer = true;
ModelPrivateChat.contextType = socket_1.SocketContext;
const mapStateToProps = (state) => (Object.assign({ user: state.user.current, loggedIn: state.auth.loggedIn, activeConversation: state.streamMessage.activeConversation }, state.streaming));
const mapDispatchs = {
    accessPrivateRequest: actions_1.accessPrivateRequest,
    getStreamConversationSuccess: actions_2.getStreamConversationSuccess,
    resetStreamMessage: actions_2.resetStreamMessage
};
exports.default = react_redux_1.connect(mapStateToProps, mapDispatchs)(router_1.withRouter(ModelPrivateChat));
