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
const react_1 = __importStar(require("react"));
const head_1 = __importDefault(require("next/head"));
const router_1 = __importDefault(require("next/router"));
const antd_1 = require("antd");
const group_streaming_container_1 = __importDefault(require("@components/streaming/group-streaming-container"));
const services_1 = require("src/services");
const react_redux_1 = require("react-redux");
const actions_1 = require("@redux/stream-chat/actions");
const socket_1 = require("src/socket");
const next_cookies_1 = __importDefault(require("next-cookies"));
const header_1 = __importDefault(require("@components/streaming/header"));
const footer_1 = __importDefault(require("@components/streaming/footer"));
const chat_box_1 = __importDefault(require("@components/stream-chat/chat-box"));
const utils_1 = require("@lib/utils");
const actions_2 = require("@redux/user/actions");
require("./index.less");
const http_status_codes_1 = require("http-status-codes");
// eslint-disable-next-line no-shadow
var STREAM_EVENT;
(function (STREAM_EVENT) {
    STREAM_EVENT["JOIN_ROOM"] = "JOIN_ROOM";
    STREAM_EVENT["LEAVE_ROOM"] = "LEAVE_ROOM";
    STREAM_EVENT["JOINED_THE_ROOM"] = "JOINED_THE_ROOM";
    STREAM_EVENT["STREAM_INFORMATION_CHANGED"] = "private-stream/streamInformationChanged";
    STREAM_EVENT["SEND_PAID_TOKEN"] = "SEND_PAID_TOKEN";
})(STREAM_EVENT || (STREAM_EVENT = {}));
const ListItem = ({ description, title }) => (<antd_1.List.Item>
    <antd_1.Row style={{ width: '100%' }}>
      <antd_1.Col className="light-text" sm={{ span: 6 }} xs={{ span: 12 }}>
        {title}
      </antd_1.Col>
      <antd_1.Col style={{ fontWeight: 'bold' }} sm={{ span: 18 }} xs={{ span: 12 }}>
        {description}
      </antd_1.Col>
    </antd_1.Row>
  </antd_1.List.Item>);
class UserGroupChat extends react_1.PureComponent {
    constructor(props) {
        super(props);
        this.onbeforeunload = () => {
            this.leaveSession();
        };
        this.state = {
            // sessionId: undefined,
            processing: false,
            roomJoined: false,
            callTime: 0,
            total: 0,
            paidToken: 0,
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
            // const error = await Promise.resolve(e);
            if (process.browser) {
                return router_1.default.push('/');
            }
            ctx.res.writeHead && ctx.res.writeHead(302, { Location: '/' });
            ctx.res.end && ctx.res.end();
            return {};
        }
    }
    componentDidMount() {
        this.streamRef = react_1.default.createRef();
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
        const { activeConversation, resetStreamMessage: dispatchResetStreamMessage } = this.props;
        dispatchResetStreamMessage();
        if (this.socket && activeConversation && activeConversation.data) {
            this.socket.emit(STREAM_EVENT.LEAVE_ROOM, {
                conversationId: activeConversation.data._id
            });
        }
        if (this.interval) {
            clearInterval(this.interval);
        }
        this.setState({
            processing: false,
            roomJoined: false,
            total: 0,
            members: []
        });
    }
    async joinGroupChat() {
        const { performer, getStreamConversation: dispatchGetStreamConversation } = this.props;
        try {
            this.setState({ processing: true });
            const resp = await services_1.streamService.joinGroupChat(performer._id);
            if (resp && resp.data) {
                this.socket = this.context;
                this.streamRef
                    && this.streamRef.start(resp.data.sessionId, resp.data.conversation._id);
                await dispatchGetStreamConversation({
                    conversation: resp.data.conversation
                });
                antd_1.message.success('Success');
                this.socket.emit(STREAM_EVENT.JOIN_ROOM, {
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
    stopBroadcast() {
        this.streamRef && this.streamRef.stop();
        setTimeout(() => {
            window.location.href = '/';
        }, 10 * 1000);
    }
    roomJoinedHandler({ total, members, conversationId }) {
        var _a;
        const { activeConversation, performer, user } = this.props;
        if (((_a = activeConversation === null || activeConversation === void 0 ? void 0 : activeConversation.data) === null || _a === void 0 ? void 0 : _a._id) === conversationId) {
            this.interval = setInterval(() => {
                const { callTime } = this.state;
                if (user.balance < performer.groupCallPrice) {
                    antd_1.message.warn('Your balance is not enough token.');
                    setTimeout(() => window.location.reload(), 10 * 1000);
                    return;
                }
                this.setState({ callTime: callTime + 1 });
                this.sendPaidToken(conversationId);
            }, 60 * 1000);
            this.setState({
                total,
                members,
                roomJoined: true,
                callTime: 0
            });
        }
    }
    async sendPaidToken(conversationId) {
        try {
            const { performer, updateCurrentUserBalance: dispatchUpdateBalance } = this.props;
            const { paidToken } = this.state;
            await services_1.transactionService.sendPaidToken(conversationId);
            const newState = { paidToken: paidToken + performer.groupCallPrice };
            this.setState(newState);
            dispatchUpdateBalance(performer.groupCallPrice * -1);
        }
        catch (err) {
            const error = await Promise.resolve(err);
            if (error.statusCode === 400) {
                antd_1.message.error('Your tokens do not enough, please buy more.');
                clearInterval(this.interval);
                this.stopBroadcast();
            }
        }
    }
    render() {
        const { user, performer } = this.props;
        const { processing, total, members, roomJoined, callTime, paidToken } = this.state;
        const dataSource = [
            {
                title: 'Call time',
                description: `${callTime} minute(s)`
            },
            {
                title: 'Status',
                description: roomJoined ? 'Live' : ''
            },
            {
                title: 'Paid Token',
                description: `${paidToken} token(s)`
            },
            {
                title: 'Token per minute',
                description: `${performer.groupCallPrice} token(s)` || 'N/A'
            }
        ];
        return (<>
        <head_1.default>
          <title>Group Chat</title>
        </head_1.default>
        <socket_1.Event event={STREAM_EVENT.STREAM_INFORMATION_CHANGED} handler={this.handler.bind(this)}/>
        <socket_1.Event event={STREAM_EVENT.JOINED_THE_ROOM} handler={this.roomJoinedHandler.bind(this)}/>
        <>
          <header_1.default {...this.props}/>
          <antd_1.Row>
            <antd_1.Col lg={12} md={12} xs={24}>
              <group_streaming_container_1.default {...this.props} participantId={user._id} 
        // eslint-disable-next-line no-return-assign
        ref={(ref) => (this.streamRef = ref)} sessionId="" processing={processing} configs={{ localVideoId: 'localVideoId' }} onClick={this.joinGroupChat.bind(this)} btnText="Join Conversation"/>
              <footer_1.default {...this.props} inGroupChat/>
              <antd_1.List dataSource={dataSource} renderItem={(item) => (<ListItem description={item.description} title={item.title}/>)}/>
            </antd_1.Col>
            <antd_1.Col lg={12} md={12} xs={24}>
              <chat_box_1.default {...this.props} totalParticipant={total} members={members}/>
            </antd_1.Col>
          </antd_1.Row>
        </>
      </>);
    }
}
UserGroupChat.authenticate = true;
UserGroupChat.contextType = socket_1.SocketContext;
const mapStateToProps = (state) => (Object.assign(Object.assign({}, state.streaming), { ui: state.ui, user: state.user.current, loggedIn: state.auth.loggedIn, activeConversation: state.streamMessage.activeConversation }));
const mapDispatchs = {
    getStreamConversation: actions_1.getStreamConversation,
    resetStreamMessage: actions_1.resetStreamMessage,
    updateCurrentUserBalance: actions_2.updateCurrentUserBalance
};
exports.default = react_redux_1.connect(mapStateToProps, mapDispatchs)(UserGroupChat);
