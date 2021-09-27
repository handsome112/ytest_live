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
/* eslint-disable camelcase */
/* eslint-disable dot-notation */
const react_1 = __importStar(require("react"));
const head_1 = __importDefault(require("next/head"));
const antd_1 = require("antd");
const react_redux_1 = require("react-redux");
const services_1 = require("src/services");
const publisher_1 = __importDefault(require("@components/streaming/publisher"));
const socket_1 = require("src/socket");
const actions_1 = require("@redux/stream-chat/actions");
const actions_2 = require("@redux/performer/actions");
const constants_1 = require("src/antmedia/constants");
const chat_box_1 = __importDefault(require("@components/stream-chat/chat-box"));
const streaming_status_update_form_1 = __importDefault(require("@components/performer/streaming-status-update-form"));
const router_1 = __importDefault(require("next/router"));
const utils_1 = require("@lib/utils");
require("./index.less");
// eslint-disable-next-line no-shadow
var EVENT_NAME;
(function (EVENT_NAME) {
    EVENT_NAME["ROOM_INFORMATIOM_CHANGED"] = "public-room-changed";
    EVENT_NAME["USER_LEFT_ROOM"] = "USER_LEFT_ROOM";
})(EVENT_NAME || (EVENT_NAME = {}));
class PerformerLivePage extends react_1.PureComponent {
    constructor(props) {
        super(props);
        this.onbeforeunload = () => {
            this.leavePublicRoom();
        };
        this.state = {
            loading: false,
            initialized: false,
            publish_started: false,
            sessionId: '',
            total: 0,
            members: []
        };
    }
    componentDidMount() {
        this.socket = this.context;
        this.joinPublicRoom();
        window.addEventListener('beforeunload', this.onbeforeunload);
        router_1.default.events.on('routeChangeStart', this.onbeforeunload);
    }
    componentDidUpdate(prevProps) {
        const { updateSuccess, updateError } = this.props;
        if (prevProps.updateSuccess !== updateSuccess && updateSuccess) {
            antd_1.message.success('Update Status Success.');
        }
        if (prevProps.updateError !== updateError && updateError) {
            antd_1.message.error(utils_1.getResponseError(updateError));
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
            this.setState({ total, members });
        }
    }
    handleUpdateStatusForm(data) {
        const { updateStreamingStatus: dispatchUpdateStreamingStatus } = this.props;
        dispatchUpdateStreamingStatus(data);
    }
    async start() {
        try {
            this.setState({ loading: true });
            const resp = await services_1.streamService.goLive();
            const { sessionId } = resp.data;
            this.setState({ sessionId });
            this.publisherRef && this.publisherRef.start();
        }
        catch (e) {
            const error = await Promise.resolve(e);
            antd_1.message.error(utils_1.getResponseError(error));
        }
        finally {
            this.setState({ loading: false });
        }
    }
    callback(info) {
        const { activeConversation } = this.props;
        const { sessionId } = this.state;
        if (activeConversation && activeConversation.data) {
            this.socket = this.context;
            if (info === constants_1.WEBRTC_ADAPTOR_INFORMATIONS.INITIALIZED) {
                this.setState({ initialized: true });
                // window['webRTCAdaptor'].publish(sessionId);
                this.publisherRef && this.publisherRef.publish(sessionId);
            }
            else if (info === constants_1.WEBRTC_ADAPTOR_INFORMATIONS.PUBLISH_STARTED) {
                this.setState({ publish_started: true, loading: false });
                this.socket.emit('public-stream/live', {
                    conversationId: activeConversation.data._id
                });
            }
            else if (info === constants_1.WEBRTC_ADAPTOR_INFORMATIONS.PUBLISH_FINISHED) {
                this.setState({ loading: false, publish_started: false });
            }
            else if (info === constants_1.WEBRTC_ADAPTOR_INFORMATIONS.CLOSED) {
                this.setState({
                    loading: false,
                    initialized: false,
                    publish_started: false
                });
            }
        }
    }
    async joinPublicRoom() {
        const { loadStreamMessages: dispatchLoadStreamMessages, getStreamConversationSuccess: dispatchGetStreamConversationSuccess } = this.props;
        try {
            this.setState({ loading: true });
            const resp = await services_1.streamService.goLive();
            const { conversation } = resp.data;
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
        }
        catch (e) {
            const error = await Promise.resolve(e);
            antd_1.message.error(utils_1.getResponseError(error));
        }
        finally {
            this.setState({ loading: false });
        }
    }
    leavePublicRoom() {
        const { activeConversation, resetStreamMessage: reset } = this.props;
        if (this.socket && activeConversation && activeConversation.data) {
            const conversation = Object.assign({}, activeConversation.data);
            this.socket.emit('public-stream/leave', {
                conversationId: conversation._id
            });
            reset();
        }
    }
    userLeftRoomHandle({ username, conversationId }) {
        var _a;
        const { activeConversation } = this.props;
        if (((_a = activeConversation === null || activeConversation === void 0 ? void 0 : activeConversation.data) === null || _a === void 0 ? void 0 : _a._id) === conversationId) {
            const { total, members } = this.state;
            this.setState({
                total: total - 1,
                members: members.filter((m) => m.username !== username)
            });
        }
    }
    async removeAllMessage() {
        const { activeConversation, performer, resetAllStreamMessage: dispatchResetAllMessage } = this.props;
        if (!activeConversation.data
            || performer._id !== activeConversation.data.performerId) {
            return;
        }
        try {
            if (!window.confirm('Are you sure you want to remove chat history?')) {
                return;
            }
            await services_1.messageService.deleteAllMessageInConversation(activeConversation.data._id);
            dispatchResetAllMessage({ conversationId: activeConversation.data._id });
        }
        catch (e) {
            const error = await Promise.resolve(e);
            antd_1.message.error(utils_1.getResponseError(error));
        }
    }
    render() {
        const { performer, activeConversation, updating } = this.props;
        const { loading, initialized, publish_started, members, total } = this.state;
        return (<>
        <head_1.default>
          <title>Go Live</title>
        </head_1.default>

        <socket_1.Event event={EVENT_NAME.ROOM_INFORMATIOM_CHANGED} handler={this.handler.bind(this)}/>
        <socket_1.Event event={EVENT_NAME.USER_LEFT_ROOM} handler={this.userLeftRoomHandle.bind(this)}/>

        <antd_1.Row>
          <antd_1.Col xs={24} sm={24} md={12}>
            <streaming_status_update_form_1.default status={performer.streamingTitle} updating={updating} submit={this.handleUpdateStatusForm.bind(this)}/>
            {(!initialized || !publish_started) && (<antd_1.Button type="primary" onClick={this.start.bind(this)} loading={loading} block>
                Start Streaming
              </antd_1.Button>)}
            <publisher_1.default {...this.props} participantId={performer._id} 
        // eslint-disable-next-line no-return-assign
        ref={(ref) => (this.publisherRef = ref)} callback={this.callback.bind(this)} configs={{
                debug: true,
                bandwidth: 900,
                localVideoId: 'publisher'
            }}/>
          </antd_1.Col>
          <antd_1.Col xs={24} sm={24} md={12}>
            <chat_box_1.default {...this.props} members={members} totalParticipant={total} currentPerformer={performer}/>
            {(activeConversation === null || activeConversation === void 0 ? void 0 : activeConversation.data) && (<div style={{ margin: '10px' }}>
                <antd_1.Button type="primary" onClick={this.removeAllMessage.bind(this)}>
                  Clear message history
                </antd_1.Button>
              </div>)}
          </antd_1.Col>
        </antd_1.Row>
      </>);
    }
}
PerformerLivePage.authenticate = true;
PerformerLivePage.contextType = socket_1.SocketContext;
const mapStateToProps = (state) => (Object.assign(Object.assign({}, state.streaming), { performer: state.performer.current, updating: state.performer.updating, updateSuccess: state.performer.updateSuccess, updateError: state.performer.updateError, activeConversation: state.streamMessage.activeConversation, loggedIn: state.auth.loggedIn }));
const mapDispatchs = {
    updateStreamingStatus: actions_2.updateStreamingStatus,
    getStreamConversationSuccess: actions_1.getStreamConversationSuccess,
    loadStreamMessages: actions_1.loadStreamMessages,
    resetStreamMessage: actions_1.resetStreamMessage,
    resetAllStreamMessage: actions_1.resetAllStreamMessage
};
exports.default = react_redux_1.connect(mapStateToProps, mapDispatchs)(PerformerLivePage);
