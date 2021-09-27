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
/* eslint-disable no-return-assign */
const react_1 = __importStar(require("react"));
const react_redux_1 = require("react-redux");
const actions_1 = require("@redux/message/actions");
const icons_1 = require("@ant-design/icons");
const antd_1 = require("antd");
// import { ImageMessageUpload } from '@components/messages/uploadPhoto';
// import { authService } from '@services/index';
const emotions_1 = __importDefault(require("./emotions"));
require("../stream-chat/Compose.less");
class Compose extends react_1.PureComponent {
    constructor(props) {
        super(props);
        this.state = { text: '' };
        this.onKeyDown = (evt) => {
            if (evt.keyCode === 13) {
                this.send();
            }
        };
        this.onChange = (evt) => {
            this.setState({ text: evt.target.value });
        };
        this.onEmojiClick = (emojiObject) => {
            const { text } = this.state;
            this.setMessage(text + emojiObject.emoji);
        };
        this.onPhotoUploaded = (data) => {
            const { sentFileSuccess: handleSendFile } = this.props;
            if (!data || !data.response) {
                return;
            }
            const imageUrl = (data.response.data && data.response.data.imageUrl) || data.base64;
            handleSendFile(Object.assign(Object.assign({}, data.response.data), { imageUrl }));
        };
        this.uploadRef = react_1.default.createRef();
    }
    componentDidMount() {
        if (!this.uploadRef)
            this.uploadRef = react_1.default.createRef();
        if (!this._input)
            this._input = react_1.default.createRef();
    }
    componentDidUpdate(previousProps) {
        const { sendMessageStatus } = this.props;
        if (sendMessageStatus.success !== previousProps.sendMessageStatus.success) {
            this.setMessage('');
            this._input && this._input.focus();
        }
    }
    setMessage(msg) {
        this.setState({ text: msg });
    }
    send() {
        const { text } = this.state;
        if (!text)
            return;
        const { conversation, sendMessage: handleSend } = this.props;
        handleSend({
            conversationId: conversation._id,
            data: {
                text
            }
        });
    }
    render() {
        const { text } = this.state;
        const { sendMessageStatus: status, conversation } = this.props;
        // const uploadHeaders = {
        //   authorization: authService.getToken()
        // };
        if (!this.uploadRef)
            this.uploadRef = react_1.default.createRef();
        if (!this._input)
            this._input = react_1.default.createRef();
        return (<div className="compose">
        <antd_1.Input value={text} className="compose-input" placeholder="Type a message" onKeyDown={this.onKeyDown} onChange={this.onChange} disabled={status.sending || !conversation._id} ref={(c) => this._input = c}/>
        <div className="grp-icons">
          <icons_1.SendOutlined onClick={this.send.bind(this)} disabled={status.sending} style={{ fontSize: '25px', marginRight: '10px', color: '#fe26b3' }}/>
          <div className="grp-emotions">
            <img src="/emotion-ico.png" width="25px" alt=""/>
            <emotions_1.default onEmojiClick={this.onEmojiClick.bind(this)}/>
          </div>
        </div>

        {/* <div className="grp-icons">
              <div className="grp-file-icon">
                <ImageMessageUpload
                  headers={uploadHeaders}
                  uploadUrl={messageService.getMessageUploadUrl()}
                  onUploaded={this.onPhotoUploaded}
                  options={{ fieldName: 'message-photo' }}
                  messageData={{
                    text: 'sent a photo',
                    conversationId: conversation && conversation._id,
                    recipientId: conversation && conversation.recipientInfo && conversation.recipientInfo._id,
                    recipientType: currentUser && currentUser._id ? 'performer' : 'user'
                  }}
                />
              </div>
            </div> */}
      </div>);
    }
}
const mapStates = (state) => ({
    sendMessageStatus: state.message.sendMessage,
    currentUser: state.user.current
});
const mapDispatch = { sendMessage: actions_1.sendMessage, sentFileSuccess: actions_1.sentFileSuccess };
exports.default = react_redux_1.connect(mapStates, mapDispatch)(Compose);
