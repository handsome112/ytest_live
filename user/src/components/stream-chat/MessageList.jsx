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
/* eslint-disable no-nested-ternary */
const react_1 = __importStar(require("react"));
const react_redux_1 = require("react-redux");
const moment_1 = __importDefault(require("moment"));
const link_1 = __importDefault(require("next/link"));
require("./MessageList.less");
const actions_1 = require("@redux/stream-chat/actions");
const socket_1 = require("src/socket");
const router_1 = __importDefault(require("next/router"));
const Compose_1 = __importDefault(require("./Compose"));
const Message_1 = __importDefault(require("./Message"));
class MessageList extends react_1.PureComponent {
    constructor() {
        super(...arguments);
        this.state = {
            page: 1,
            onloadmore: false
        };
        this.onbeforeunload = () => {
            const { conversation, resetStreamMessage: dispatchResetStreamMessage } = this.props;
            if (conversation && conversation._id) {
                dispatchResetStreamMessage();
            }
        };
        this.onMessage = (message, type) => {
            const { receiveStreamMessageSuccess: dispatchReceiveStreamMessageSuccess, deleteMessageSuccess: dispatchDeleteMessageSuccess } = this.props;
            if (!message) {
                return;
            }
            type === 'created' && dispatchReceiveStreamMessageSuccess(message);
            type === 'deleted' && dispatchDeleteMessageSuccess(message);
        };
        this.onDelete = (messageId) => {
            const { deleteMessage: dispatchDeleteMessage } = this.props;
            if (!messageId)
                return;
            dispatchDeleteMessage({ messageId });
        };
        this.renderMessages = () => {
            const { message, currentUser, currentPerformer, conversation, loggedIn } = this.props;
            const messages = message.items;
            const { fetching } = message;
            let i = 0;
            const messageCount = messages && messages.length;
            if (!messages.length && !fetching) {
                const text = loggedIn ? ('There are no chat!') : (<>
          There are no chat, please
          <link_1.default href="/auth/register">
            <a> register </a>
          </link_1.default>
          or
          <link_1.default href="/auth/login">
            <a> login </a>
          </link_1.default>
          to send message!
        </>);
                return <Message_1.default data={{ isSystem: true, text }}/>;
            }
            const tempMessages = [];
            while (i < messageCount) {
                const previous = messages[i - 1];
                const current = messages[i];
                const next = messages[i + 1];
                const userId = currentUser && currentUser._id
                    ? currentUser._id
                    : currentPerformer && currentPerformer._id
                        ? currentPerformer._id
                        : null;
                const isMine = current.senderId === userId;
                const currentMoment = moment_1.default(current.createdAt);
                let prevBySameAuthor = false;
                let nextBySameAuthor = false;
                let startsSequence = true;
                let endsSequence = true;
                let showTimestamp = true;
                const isOwner = conversation && conversation.performerId === current.senderId;
                const canDelete = (!current.isDeleted
                    && currentPerformer
                    && currentPerformer._id === conversation.performerId)
                    || (!current.isDeleted && currentUser._id === current.senderId)
                    || (!current.isDeleted
                        && currentUser.roles
                        && currentUser.roles.includes('admin'));
                if (previous) {
                    const previousMoment = moment_1.default(previous.createdAt);
                    const previousDuration = moment_1.default.duration(currentMoment.diff(previousMoment));
                    prevBySameAuthor = previous.senderId === current.senderId;
                    if (prevBySameAuthor && previousDuration.as('hours') < 1) {
                        startsSequence = false;
                    }
                    if (previousDuration.as('hours') < 1) {
                        showTimestamp = false;
                    }
                }
                if (next) {
                    const nextMoment = moment_1.default(next.createdAt);
                    const nextDuration = moment_1.default.duration(nextMoment.diff(currentMoment));
                    nextBySameAuthor = next.senderId === current.senderId;
                    if (nextBySameAuthor && nextDuration.as('hours') < 1) {
                        endsSequence = false;
                    }
                }
                if (current._id) {
                    tempMessages.push(<Message_1.default onDelete={this.onDelete.bind(this, current._id)} canDelete={canDelete} isOwner={isOwner} key={i} isMine={isMine} startsSequence={startsSequence} endsSequence={endsSequence} showTimestamp={showTimestamp} data={current}/>);
                }
                // Proceed to the next message.
                i += 1;
            }
            this.scrollToBottom();
            return tempMessages;
        };
        this.rejoin = () => {
            const { conversation } = this.props;
            if (conversation && conversation._id) {
                const socket = this.context;
                conversation.type === 'stream_public'
                    && socket.emit('public-stream/rejoin', {
                        conversationId: conversation._id
                    });
                (conversation.type === 'stream_group'
                    || conversation.type === 'stream_private')
                    && socket.emit('REJOIN_ROOM', {
                        conversationId: conversation._id
                    });
            }
        };
    }
    async componentDidMount() {
        if (!this.messagesRef)
            this.messagesRef = react_1.createRef();
        const { conversation } = this.props;
        const socket = this.context;
        if (conversation && conversation._id) {
            socket
                && socket.on
                && socket.on(`message_created_conversation_${conversation._id}`, (data) => {
                    this.onMessage(data, 'created');
                });
            socket
                && socket.on
                && socket.on(`message_deleted_conversation_${conversation._id}`, (data) => {
                    this.onMessage(data, 'deleted');
                });
        }
        router_1.default.events.on('routeChangeStart', this.onbeforeunload);
        window.addEventListener('beforeunload', this.onbeforeunload);
        this.reconnect();
    }
    componentWillUnmount() {
        const { conversation } = this.props;
        const socket = this.context;
        socket && socket.off(`message_created_conversation_${conversation._id}`);
        socket && socket.off(`message_deleted_conversation_${conversation._id}`);
        socket && socket.off('reconnect', this.rejoin);
        router_1.default.events.on('routeChangeStart', this.onbeforeunload);
        window.addEventListener('beforeunload', this.onbeforeunload);
    }
    async handleScroll(conversation, event) {
        const { message, isPublic, loadMoreStreamMessages: dispatchLoadMoreStreamMessages } = this.props;
        const { page } = this.state;
        const { fetching, items, total } = message;
        const canloadmore = total > items.length;
        const ele = event.target;
        if (!canloadmore)
            return;
        if (ele.scrollTop === 0 && conversation._id && !fetching && canloadmore) {
            await this.setState({ page: page + 1, onloadmore: true });
            dispatchLoadMoreStreamMessages({
                conversationId: conversation._id,
                type: conversation.type,
                limit: 25,
                offset: page * 25,
                isPublic
            });
        }
    }
    scrollToBottom() {
        const { onloadmore } = this.state;
        if (onloadmore) {
            return;
        }
        if (this.messagesRef && this.messagesRef.current) {
            const ele = this.messagesRef.current;
            window.setTimeout(() => {
                ele.scroll({
                    top: ele.scrollHeight,
                    behavior: 'smooth'
                });
            }, 200);
        }
    }
    reconnect() {
        const socket = this.context;
        if (socket) {
            socket.on('reconnect', this.rejoin);
        }
    }
    render() {
        const { conversation, isPublic, message } = this.props;
        const { fetching } = message;
        if (!this.messagesRef)
            this.messagesRef = react_1.createRef();
        return (<div className="message-list" onScroll={this.handleScroll.bind(this, conversation)}>
        {conversation && conversation._id && (<>
            <div className="message-list-container" ref={this.messagesRef}>
              {fetching && <p className="text-center">fetching...</p>}
              {this.renderMessages()}
            </div>
            <Compose_1.default conversation={conversation} isPublic={isPublic}/>
          </>)}
      </div>);
    }
}
MessageList.contextType = socket_1.SocketContext;
const mapStates = (state) => {
    const { conversationMap, activeConversation } = state.streamMessage;
    const messages = activeConversation.data && conversationMap[activeConversation.data._id]
        ? conversationMap[activeConversation.data._id].items || []
        : [];
    const totalMessages = activeConversation.data && conversationMap[activeConversation.data._id]
        ? conversationMap[activeConversation.data._id].total || 0
        : 0;
    const fetching = activeConversation.data && conversationMap[activeConversation.data._id]
        ? conversationMap[activeConversation.data._id].fetching || false
        : false;
    return {
        message: {
            items: messages,
            total: totalMessages,
            fetching
        },
        conversation: activeConversation.data,
        currentUser: state.user.current,
        currentPerformer: state.performer.current,
        loggedIn: state.auth.loggedIn
    };
};
const mapDispatch = {
    loadMoreStreamMessages: actions_1.loadMoreStreamMessages,
    receiveStreamMessageSuccess: actions_1.receiveStreamMessageSuccess,
    deleteMessage: actions_1.deleteMessage,
    deleteMessageSuccess: actions_1.deleteMessageSuccess,
    resetStreamMessage: actions_1.resetStreamMessage
};
exports.default = react_redux_1.connect(mapStates, mapDispatch)(MessageList);
