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
const antd_1 = require("antd");
const router_1 = __importStar(require("next/router"));
const services_1 = require("src/services");
const react_redux_1 = require("react-redux");
const socket_1 = require("src/socket");
const chat_box_1 = __importDefault(require("@components/stream-chat/chat-box"));
const actions_1 = require("@redux/stream-chat/actions");
const publisher_1 = __importDefault(require("src/components/streaming/webrtc/groupchat/publisher"));
const subscriber_1 = __importDefault(require("src/components/streaming/webrtc/groupchat/subscriber"));
const utils_1 = require("@lib/utils");
const streaming_1 = require("@components/streaming");
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
        this.localVideoId = 'group-publisher';
        this.remoteVideoContainerClassname = 'group-video-container';
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
    componentDidMount() {
        window.addEventListener('beforeunload', this.onbeforeunload);
        router_1.default.events.on('routeChangeStart', this.onbeforeunload);
        this.socket = this.context;
        this.publisherRef = react_1.default.createRef();
        this.subscriberRef = react_1.default.createRef();
    }
    componentDidUpdate(prevProps) {
        var _a;
        const { activeConversation } = this.props;
        if (((_a = activeConversation === null || activeConversation === void 0 ? void 0 : activeConversation.data) === null || _a === void 0 ? void 0 : _a._id) && activeConversation !== prevProps.activeConversation) {
            this.initSocketEvent();
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
    handleRemoteVideo(event) {
        const { srcObject } = event.target;
        this.mainVideoRef.current.srcObject = srcObject;
        this.mainVideoRef.current.hidden = false;
        this.mainVideoRef.current.play();
    }
    initSocketEvent() {
        this.socket = this.context;
        this.socket.on(JOINED_THE_ROOM, ({ streamId, streamList, conversationId }) => {
            const { activeConversation } = this.props;
            if (conversationId !== activeConversation.data._id)
                return;
            this.streamId = streamId;
            this.streamList = streamList;
            this.publisherRef.current && this.publisherRef.current.publish(streamId);
            if (streamList.length) {
                this.subscriberRef.current && this.subscriberRef.current.play(streamList);
            }
        });
        this.socket.on(STREAM_JOINED, (data) => {
            if (this.streamId !== data.streamId) {
                this.subscriberRef.current && this.subscriberRef.current.play([data.streamId]);
            }
        });
        this.socket.on(STREAM_LEAVED, (data) => {
            this.streamList = this.streamList.filter((id) => id !== data.streamId);
            if (this.streamId !== data.streamId) {
                this.subscriberRef.current && this.subscriberRef.current.close(data.streamId);
            }
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
        }
        this.setState({
            processing: false,
            roomJoined: false,
            total: 0,
            receivedToken: 0,
            members: []
        });
    }
    async startConversation() {
        const { getStreamConversationSuccess: dispatchGetStreamConversationSuccess } = this.props;
        try {
            this.setState({ processing: true });
            const resp = await services_1.streamService.startGroupChat();
            if (resp && resp.data) {
                const { sessionId, conversation } = resp.data;
                this.socket = this.context;
                this.publisherRef.current && this.publisherRef.current.start(conversation._id, sessionId);
                dispatchGetStreamConversationSuccess({
                    data: conversation
                });
                this.socket
                    && this.socket.emit(STREAM_EVENT.JOIN_ROOM, {
                        conversationId: resp.data.conversation._id
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
    render() {
        // const { user } = this.props;
        const { processing, total, members, roomJoined, receivedToken } = this.state;
        return (<>
        <head_1.default>
          <title>Group Chat</title>
        </head_1.default>

        <socket_1.Event event={STREAM_EVENT.STREAM_INFORMATION_CHANGED} handler={this.handler.bind(this)}/>
        <socket_1.Event event={STREAM_EVENT.JOINED_THE_ROOM} handler={this.roomJoinedHandler.bind(this)}/>
        <socket_1.Event event={STREAM_EVENT.RECEIVED_PAID_TOKEN} handler={this.receivedPaidTokenHandler.bind(this)}/>

        <div className="container">
          <antd_1.Row>
            <antd_1.Col md={12} xs={24}>
              {!roomJoined
                ? (<antd_1.Button type="primary" onClick={this.startConversation.bind(this)} loading={processing} block>
                    Start Conversation
                  </antd_1.Button>)
                : (<antd_1.Button type="primary" onClick={this.leave.bind(this)} block disabled={processing}>
                    Stop Streaming
                  </antd_1.Button>)}
              <div style={{ display: 'flex', justifyContent: 'center' }}>
                <video id="subscriber" ref={this.mainVideoRef} hidden controls/>
              </div>
              <antd_1.Row className={this.remoteVideoContainerClassname}>
                <publisher_1.default {...this.props} id={this.localVideoId} containerClassName={this.remoteVideoContainerClassname} classNames="ant-col ant-col-6" ref={this.publisherRef} configs={{
                localVideoId: this.localVideoId
            }}/>
                <subscriber_1.default {...this.props} ref={this.subscriberRef} containerClassName={this.remoteVideoContainerClassname} classNames="ant-col ant-col-6" configs={{
                isPlayMode: true
            }}/>
              </antd_1.Row>
              <streaming_1.Description roomJoined={roomJoined} receivedToken={receivedToken}/>
            </antd_1.Col>
            <antd_1.Col xs={24} md={12}>
              <chat_box_1.default {...this.props} totalParticipant={total} members={members}/>
            </antd_1.Col>
          </antd_1.Row>
        </div>
      </>);
    }
}
ModelPrivateChat.authenticate = true;
ModelPrivateChat.onlyPerformer = true;
ModelPrivateChat.contextType = socket_1.SocketContext;
const mapStateToProps = (state) => (Object.assign({ user: state.user.current, loggedIn: state.auth.loggedIn, activeConversation: state.streamMessage.activeConversation }, state.streaming));
const mapDispatchs = {
    getStreamConversationSuccess: actions_1.getStreamConversationSuccess,
    resetStreamMessage: actions_1.resetStreamMessage
};
exports.default = react_redux_1.connect(mapStateToProps, mapDispatchs)(router_1.withRouter(ModelPrivateChat));
