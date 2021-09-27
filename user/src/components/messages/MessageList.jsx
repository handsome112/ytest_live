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
const react_redux_1 = require("react-redux");
const moment_1 = __importDefault(require("moment"));
require("../stream-chat/MessageList.less");
const actions_1 = require("@redux/message/actions");
const Compose_1 = __importDefault(require("./Compose"));
const Message_1 = __importDefault(require("./Message"));
class MessageList extends react_1.PureComponent {
    constructor() {
        super(...arguments);
        this.state = {
            offset: 1,
            onloadmore: false
        };
        this.renderMessages = () => {
            const { message, currentUser, currentPerformer } = this.props;
            const messages = message.items;
            let i = 0;
            const messageCount = messages.length;
            const tempMessages = [];
            while (i < messageCount) {
                const previous = messages[i - 1];
                const current = messages[i];
                const next = messages[i + 1];
                const isMine = current.senderId
                    === ((currentUser && currentUser._id)
                        || (currentPerformer && currentPerformer._id));
                const currentMoment = moment_1.default(current.createdAt);
                let prevBySameAuthor = false;
                let nextBySameAuthor = false;
                let startsSequence = true;
                let endsSequence = true;
                let showTimestamp = true;
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
                    tempMessages.push(<Message_1.default key={i} isMine={isMine} startsSequence={startsSequence} endsSequence={endsSequence} showTimestamp={showTimestamp} data={current}/>);
                }
                // Proceed to the next message.
                i += 1;
            }
            this.scrollToBottom();
            return tempMessages;
        };
    }
    async componentDidMount() {
        if (!this.messagesRef)
            this.messagesRef = react_1.createRef();
    }
    async componentDidUpdate(prevState) {
        const { conversation } = this.props;
        if (prevState
            && prevState.conversation
            && prevState.conversation._id !== conversation._id) {
            this.setOffset();
        }
    }
    async handleScroll(conversation, event) {
        const { message, loadMoreMessages: dispatchLoadMoreMessages } = this.props;
        const { fetching, items, total } = message;
        const { offset } = this.state;
        const canloadmore = total > items.length;
        const ele = event.target;
        if (!canloadmore)
            return;
        if (ele.scrollTop === 0 && conversation._id && !fetching && canloadmore) {
            await this.setState({ offset: offset + 1, onloadmore: true });
            dispatchLoadMoreMessages({
                conversationId: conversation._id,
                limit: 20,
                offset: (offset - 1) * 20
            });
        }
    }
    async setOffset() {
        this.setState({ offset: 1 });
    }
    scrollToBottom() {
        const { onloadmore } = this.state;
        if (onloadmore) {
            return;
        }
        if (this.messagesRef && this.messagesRef.current) {
            const ele = this.messagesRef.current;
            window.setTimeout(() => {
                ele.scrollTop = ele.scrollHeight;
            }, 300);
        }
    }
    render() {
        const { conversation, message } = this.props;
        const { fetching } = message;
        if (!this.messagesRef)
            this.messagesRef = react_1.createRef();
        return (<div className="message-list custom">
        {conversation && conversation._id ? (<>
            <div className="message-list-container" ref={this.messagesRef} onScroll={this.handleScroll.bind(this, conversation)}>
              {fetching && <p className="text-center">fetching...</p>}
              {this.renderMessages()}
            </div>

            <Compose_1.default conversation={conversation}/>
          </>) : (<div className="start-conversation">
            <p>Click conversation to start</p>
          </div>)}
      </div>);
    }
}
const mapStates = (state) => {
    const { conversationMap } = state.message;
    const { activeConversation } = state.conversation;
    const messages = conversationMap[activeConversation._id]
        ? conversationMap[activeConversation._id].items || []
        : [];
    const totalMessages = conversationMap[activeConversation._id]
        ? conversationMap[activeConversation._id].total || 0
        : 0;
    const fetching = conversationMap[activeConversation._id]
        ? conversationMap[activeConversation._id].fetching || false
        : false;
    return {
        message: {
            items: messages,
            total: totalMessages,
            fetching
        },
        conversation: activeConversation,
        currentUser: state.user.current,
        currentPerformer: state.performer.current
    };
};
const mapDispatch = { loadMoreMessages: actions_1.loadMoreMessages };
exports.default = react_redux_1.connect(mapStates, mapDispatch)(MessageList);
