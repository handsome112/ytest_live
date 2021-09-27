"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("./index.less");
const react_1 = require("react");
const head_1 = __importDefault(require("next/head"));
const antd_1 = require("antd");
const group_streaming_container_1 = __importDefault(require("@components/streaming/group-streaming-container"));
const services_1 = require("src/services");
const react_redux_1 = require("react-redux");
const actions_1 = require("@redux/stream-chat/actions");
const socket_1 = require("src/socket");
const chat_box_1 = __importDefault(require("@components/stream-chat/chat-box"));
const router_1 = __importDefault(require("next/router"));
const streaming_1 = require("@components/streaming");
const utils_1 = require("@lib/utils");
// eslint-disable-next-line no-shadow
var STREAM_EVENT;
(function (STREAM_EVENT) {
    STREAM_EVENT["JOINED_THE_ROOM"] = "JOINED_THE_ROOM";
    STREAM_EVENT["JOIN_ROOM"] = "JOIN_ROOM";
    STREAM_EVENT["LEAVE_ROOM"] = "LEAVE_ROOM";
    STREAM_EVENT["RECEIVED_PAID_TOKEN"] = "RECEIVED_PAID_TOKEN";
    STREAM_EVENT["STREAM_INFORMATION_CHANGED"] = "private-stream/streamInformationChanged";
})(STREAM_EVENT || (STREAM_EVENT = {}));
class PerformerGroupChat extends react_1.PureComponent {
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
            processing: false,
            roomJoined: false,
            total: 0,
            receivedToken: 0,
            members: []
        };
    }
    componentDidMount() {
        this.socket = this.context;
        window.addEventListener('beforeunload', this.onbeforeunload);
        router_1.default.events.on('routeChangeStart', this.onbeforeunload);
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
    leaveSession() {
        var _a;
        const { activeConversation, resetStreamMessage: dispatchResetStreamMessage } = this.props;
        if (this.socket && ((_a = activeConversation === null || activeConversation === void 0 ? void 0 : activeConversation.data) === null || _a === void 0 ? void 0 : _a._id)) {
            this.socket.emit(STREAM_EVENT.LEAVE_ROOM, {
                conversationId: activeConversation.data._id
            });
            this.socket.off(STREAM_EVENT.RECEIVED_PAID_TOKEN);
            dispatchResetStreamMessage();
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
        const { getStreamConversation: dispatchGetStreamConversation } = this.props;
        try {
            this.setState({ processing: true });
            const resp = await services_1.streamService.startGroupChat();
            if (resp && resp.data) {
                this.socket = this.context;
                this.streamRef
                    && this.streamRef.start(resp.data.sessionId, resp.data.conversation._id);
                dispatchGetStreamConversation({
                    conversation: resp.data.conversation
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
                total,
                members,
                roomJoined: true
            });
        }
    }
    render() {
        const { user } = this.props;
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
              <group_streaming_container_1.default {...this.props} participantId={user._id} 
        // eslint-disable-next-line no-return-assign
        ref={(ref) => (this.streamRef = ref)} processing={processing} sessionId="" configs={{ localVideoId: 'localVideoId' }} onClick={this.startConversation.bind(this)} btnText="Start Conversation"/>
              <streaming_1.Description roomJoined={roomJoined} receivedToken={receivedToken}/>
            </antd_1.Col>
            <antd_1.Col md={12} xs={24}>
              <chat_box_1.default {...this.props} totalParticipant={total} members={members}/>
            </antd_1.Col>
          </antd_1.Row>
        </div>
      </>);
    }
}
PerformerGroupChat.authenticate = true;
PerformerGroupChat.onlyPerformer = true;
PerformerGroupChat.contextType = socket_1.SocketContext;
const mapStateToProps = (state) => (Object.assign(Object.assign({}, state.streaming), { user: state.user.current, loggedIn: state.auth.loggedIn, activeConversation: state.streamMessage.activeConversation }));
const mapDispatchs = {
    getStreamConversation: actions_1.getStreamConversation,
    resetStreamMessage: actions_1.resetStreamMessage
};
exports.default = react_redux_1.connect(mapStateToProps, mapDispatchs)(PerformerGroupChat);
