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
const actions_1 = require("@redux/stream-chat/actions");
const antd_1 = require("antd");
const icons_1 = require("@ant-design/icons");
const emotions_1 = __importDefault(require("./emotions"));
require("./Compose.less");
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
            this.setText(evt.target.value);
        };
        this.onEmojiClick = (emojiObject) => {
            const { text } = this.state;
            this.setText(text + emojiObject.emoji);
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
        const { sendMessage } = this.props;
        if (sendMessage.success !== previousProps.sendMessage.success) {
            this.setText('');
            this._input && this._input.focus();
        }
    }
    setText(text) {
        this.setState({ text });
    }
    send() {
        const { text } = this.state;
        const { loggedIn } = this.props;
        if (!loggedIn) {
            antd_1.message.error('Please login');
            return;
        }
        if (!text) {
            return;
        }
        const { conversation, isPublic, sendStreamMessage: dispatchSendStreamMessage } = this.props;
        const { _id, type } = conversation;
        dispatchSendStreamMessage({
            conversationId: _id,
            data: {
                text
            },
            type,
            isPublic
        });
    }
    render() {
        const { loggedIn } = this.props;
        const { text } = this.state;
        const { sendMessage, conversation } = this.props;
        if (!this.uploadRef)
            this.uploadRef = react_1.default.createRef();
        if (!this._input)
            this._input = react_1.default.createRef();
        return (<div className="compose" hidden={!loggedIn || !conversation._id}>
        <antd_1.Input value={text} className="compose-input" placeholder="Enter message here." onKeyDown={this.onKeyDown} onChange={this.onChange} disabled={sendMessage.sending} autoFocus ref={(c) => (this._input = c)}/>
        <div className="grp-icons">
          <icons_1.SendOutlined onClick={this.send.bind(this)} style={{ fontSize: '25px', marginRight: '10px', color: '#fe26b3' }}/>
          <div className="grp-emotions">
            <img src="/emotion-ico.png" width="25px" alt=""/>
            <emotions_1.default onEmojiClick={this.onEmojiClick.bind(this)}/>
          </div>
        </div>
      </div>);
    }
}
const mapStates = (state) => ({
    loggedIn: state.auth.loggedIn,
    sendMessage: state.streamMessage.sendMessage
});
const mapDispatch = { sendStreamMessage: actions_1.sendStreamMessage };
exports.default = react_redux_1.connect(mapStates, mapDispatch)(Compose);
