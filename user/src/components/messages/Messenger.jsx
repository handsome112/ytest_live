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
require("../stream-chat/Messenger.less");
const react_redux_1 = require("react-redux");
const actions_1 = require("@redux/message/actions");
const antd_1 = require("antd");
const ConversationList_1 = __importDefault(require("./ConversationList"));
const MessageList_1 = __importDefault(require("./MessageList"));
class Messenger extends react_1.PureComponent {
    onClose() {
        const { deactiveConversation: dispatchDeactiveConversation } = this.props;
        dispatchDeactiveConversation();
    }
    render() {
        const { toSource, toId, activeConversation } = this.props;
        return (<div className="messenger">
        <div className={!activeConversation._id ? 'sidebar' : 'sidebar active'}>
          <ConversationList_1.default toSource={toSource} toId={toId}/>
        </div>
        <div className={!activeConversation._id ? 'chat-content' : 'chat-content active'}>
          <antd_1.Button onClick={this.onClose.bind(this)} className="close-btn">close</antd_1.Button>
          <MessageList_1.default />
        </div>
      </div>);
    }
}
const mapStates = (state) => {
    const { activeConversation } = state.conversation;
    return {
        activeConversation
    };
};
const mapDispatch = { deactiveConversation: actions_1.deactiveConversation };
exports.default = react_redux_1.connect(mapStates, mapDispatch)(Messenger);
