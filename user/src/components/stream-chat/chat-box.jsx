"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const antd_1 = require("antd");
const react_1 = __importDefault(require("react"));
const Messenger_1 = __importDefault(require("@components/stream-chat/Messenger"));
const UserList_1 = __importDefault(require("@components/stream-chat/UserList"));
require("./chat-box.less");
const ChatBox = ({ isPublic, activeConversation, totalParticipant, currentPerformer, loggedIn, members }) => (<div className="conversation-stream">
    <antd_1.Tabs defaultActiveKey="chat_content">
      <antd_1.Tabs.TabPane tab="CHAT" key="chat_content">
        {activeConversation
        && activeConversation.data
        && activeConversation.data.streamId && (<Messenger_1.default isPublic={isPublic} streamId={activeConversation.data.streamId}/>)}
      </antd_1.Tabs.TabPane>
      <antd_1.Tabs.TabPane tab={`USER (${totalParticipant || 0})`} key="chat_user">
        <UserList_1.default currentPerformer={currentPerformer} loggedIn={loggedIn} members={members}/>
      </antd_1.Tabs.TabPane>
    </antd_1.Tabs>
  </div>);
ChatBox.defaultProps = {
    isPublic: false,
    totalParticipant: 0,
    activeConversation: null,
    currentPerformer: null,
    loggedIn: false,
    members: []
};
exports.default = ChatBox;
