"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const moment_1 = __importDefault(require("moment"));
require("../stream-chat/Message.less");
function Message(props) {
    const { data, isMine, startsSequence, endsSequence, showTimestamp } = props;
    const friendlyTimestamp = moment_1.default(data.createdAt).format('LLLL');
    return (<div className={[
            'message',
            `${isMine ? 'mine' : ''}`,
            `${startsSequence ? 'start' : ''}`,
            `${endsSequence ? 'end' : ''}`
        ].join(' ')}>
      {data.text && (<div className="bubble-container">
        <div className="bubble" title={friendlyTimestamp}>
          {!data.imageUrl && data.text}
          {' '}
          {data.imageUrl && (<a title="Click to view full content" href={data.imageUrl} target="_blank" rel="noreferrer">
            <img src={data.imageUrl} width="180px" alt=""/>
          </a>)}
        </div>
      </div>)}
      {showTimestamp && <div className="timestamp">{friendlyTimestamp}</div>}
    </div>);
}
exports.default = Message;
