"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
const classnames_1 = __importDefault(require("classnames"));
require("./Messenger.less");
const react_redux_1 = require("react-redux");
const actions_1 = require("@redux/stream-chat/actions");
const MessageList_1 = __importDefault(require("./MessageList"));
class StreamMessenger extends react_1.PureComponent {
    componentDidMount() {
        const { streamId, activeConversation, getStreamConversation: dispatchGetStreamConversation } = this.props;
        if (!activeConversation && streamId) {
            dispatchGetStreamConversation({ conversation: activeConversation.data, isPublic: true });
        }
    }
    render() {
        const { activeConversation, isPublic, loggedIn } = this.props;
        return (<div className={classnames_1.default('message-stream', loggedIn ? 'user-logged-in' : '')}>
        {activeConversation && activeConversation.data && activeConversation.data.streamId ? <MessageList_1.default isPublic={isPublic}/> : <p>No conversation found.</p>}
      </div>);
    }
}
const mapStates = (state) => ({
    activeConversation: state.streamMessage.activeConversation,
    loggedIn: state.auth.loggedIn
});
const mapDispatchs = { getStreamConversation: actions_1.getStreamConversation };
exports.default = react_redux_1.connect(mapStates, mapDispatchs)(StreamMessenger);
