"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const antd_1 = require("antd");
const moment_1 = __importDefault(require("moment"));
require("./ConversationListItem.less");
function ConversationListItem(props) {
    const { setActive, selected, data } = props;
    const { recipientInfo, lastMessage, _id, updatedAt, lastMessageCreatedAt, totalNotSeenMessages = 0 } = data;
    const className = selected
        ? 'conversation-list-item active'
        : 'conversation-list-item';
    return (<div aria-hidden="true" className={className} onClick={() => setActive(_id)}>
      <div className="conversation-left-corner">
        <img className="conversation-photo" src={(recipientInfo === null || recipientInfo === void 0 ? void 0 : recipientInfo.avatar) || '/default-user-icon.png'} alt="conversation"/>
      </div>
      <div className="conversation-info">
        <h1 className="conversation-title">{(recipientInfo === null || recipientInfo === void 0 ? void 0 : recipientInfo.username) || 'N/A'}</h1>
        <p className="conversation-snippet">{lastMessage}</p>
        <p className="conversation-time">{moment_1.default(lastMessageCreatedAt || updatedAt).fromNow()}</p>
      </div>
      <antd_1.Badge className="notification-badge" count={totalNotSeenMessages}/>
    </div>);
}
exports.default = ConversationListItem;
