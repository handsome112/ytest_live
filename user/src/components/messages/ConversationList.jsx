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
require("./ConversationList.less");
const actions_1 = require("@redux/message/actions");
const socket_1 = require("src/socket");
const lodash_1 = require("lodash");
const message_service_1 = require("@services/message.service");
const ConversationSearch_1 = __importDefault(require("./ConversationSearch"));
const ConversationListItem_1 = __importDefault(require("./ConversationListItem"));
class ConversationList extends react_1.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            conversationPage: 1,
            keyword: ''
        };
        this.onMessage = async (message) => {
            if (!message) {
                return;
            }
            const { conversation, currentPerformer, currentUser, getConversationDetail: getConversationDetailHandler, receiveMessageSuccess: receiveMessageSuccessHandler, updateLastMessage: handleUpdateLastMessage } = this.props;
            const { mapping } = conversation;
            const { conversationId, text } = message;
            if (!mapping[message.conversationId]) {
                getConversationDetailHandler({
                    id: message.conversationId
                });
            }
            receiveMessageSuccessHandler(message);
            handleUpdateLastMessage({ conversationId, lastMessage: text });
            await message_service_1.messageService.readAllInConversation(conversationId, currentUser._id ? currentUser._id : currentPerformer._id);
        };
        this.onSearchConversation = lodash_1.debounce(async (e) => {
            const { value } = e.target;
            const { searchConversations: getConversationsHandler } = this.props;
            await this.setState({ keyword: value, conversationPage: 0 });
            if (value) {
                return getConversationsHandler({
                    keyword: value, limit: 25, offset: 0, type: 'private'
                });
            }
            return getConversationsHandler({ limit: 25, offset: 0, type: 'private' });
        }, 500);
        this.handleScroll = async (event) => {
            const { conversation, getConversations: getConversationsHandler } = this.props;
            const { requesting, data, total } = conversation.list;
            const { conversationPage, keyword } = this.state;
            const canloadmore = total > data.length;
            const ele = event.target;
            if (!canloadmore)
                return;
            if (ele.scrollHeight - ele.scrollTop === ele.clientHeight && !requesting && canloadmore) {
                this.setState({ conversationPage: conversationPage + 1 }, () => {
                    getConversationsHandler({
                        keyword, limit: 25, offset: conversationPage * 25, type: 'private'
                    });
                });
            }
        };
        this.setActive = (conversationId) => {
            const { setActiveConversation: setActiveConversationHandler, currentPerformer, currentUser } = this.props;
            setActiveConversationHandler({ conversationId, recipientId: currentUser._id ? currentUser._id : currentPerformer._id });
        };
    }
    async componentDidMount() {
        if (!this.conversationsRef)
            this.conversationsRef = react_1.createRef();
        const { getConversations: getConversationsHandler, setActiveConversation: setActiveConversationHandler, toSource, toId, currentUser, currentPerformer } = this.props;
        const { conversationPage, keyword } = this.state;
        getConversationsHandler({
            limit: 25, offset: conversationPage * 25, type: 'private', keyword
        });
        if (toSource && toId) {
            setTimeout(() => {
                setActiveConversationHandler({
                    source: toSource,
                    sourceId: toId,
                    recipientId: currentUser._id ? currentUser._id : currentPerformer._id
                });
            }, 1000);
        }
    }
    render() {
        const { conversation } = this.props;
        const { data: conversations, requesting } = conversation.list;
        const { mapping, activeConversation = {} } = conversation;
        if (!this.conversationsRef)
            this.conversationsRef = react_1.createRef();
        return (<div className="conversation-list" ref={this.conversationsRef} onScroll={this.handleScroll.bind(this)}>
        <socket_1.Event event="message_created" handler={this.onMessage}/>
        <h4 className="text-center" style={{ fontSize: '22px' }}>Messenger</h4>
        <ConversationSearch_1.default onSearch={(e) => {
                e.persist();
                this.onSearchConversation(e);
            }}/>
        {conversations.length > 0
                && conversations.map((conversationId) => (<ConversationListItem_1.default key={conversationId} data={mapping[conversationId]} setActive={this.setActive.bind(this)} selected={activeConversation._id === conversationId}/>))}
        {requesting && (<div className="text-center">
          <img alt="loading" src="/loading-ico.gif" width="50px"/>
        </div>)}
        {!requesting && !conversations.length && <p className="text-center">No conversation found.</p>}
      </div>);
    }
}
const mapStates = (state) => ({
    conversation: state.conversation,
    message: state.message,
    currentUser: state.user.current,
    currentPerformer: state.performer.current
});
const mapDispatch = {
    searchConversations: actions_1.searchConversations,
    getConversations: actions_1.getConversations,
    setActiveConversation: actions_1.setActiveConversation,
    getConversationDetail: actions_1.getConversationDetail,
    receiveMessageSuccess: actions_1.receiveMessageSuccess,
    updateLastMessage: actions_1.updateLastMessage
};
exports.default = react_redux_1.connect(mapStates, mapDispatch)(ConversationList);
