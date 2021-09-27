"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const moment_1 = __importDefault(require("moment"));
const icons_1 = require("@ant-design/icons");
const antd_1 = require("antd");
const utils_1 = require("@lib/utils");
require("./Message.less");
function Message(dataProps) {
    const { data, 
    // isMine,
    // startsSequence,
    // endsSequence,
    showTimestamp, isOwner, canDelete, onDelete
    // data: { type }
     } = dataProps;
    const friendlyTimestamp = moment_1.default(data.timestamp).format('LLLL');
    // const randomColor = Math.floor(Math.random() * 16777215).toString(16);
    const menu = (<antd_1.Menu>
      <antd_1.Menu.Item onClick={onDelete}>
        <a>delete</a>
      </antd_1.Menu.Item>
    </antd_1.Menu>);
    return (<div className={utils_1.chatBoxMessageClassName(dataProps)}>
      {data.text && !data.isSystem && (<div className="bubble-container">
          <div className="bubble" title={friendlyTimestamp}>
            {canDelete && (<antd_1.Dropdown overlay={menu} placement="topRight">
                <span>
                  <icons_1.InfoCircleOutlined />
                  {' '}
                </span>
              </antd_1.Dropdown>)}
            {data.senderInfo && (<span className="u-name">
                {isOwner && <icons_1.CrownTwoTone twoToneColor="#eb2f96"/>}
                {data.senderInfo.username}
                {data.type !== 'tip' ? ': ' : ' '}
              </span>)}
            {!data.imageUrl && data.text}
            {' '}
            {data.imageUrl && (<a title="Click to view full content" href={data.imageUrl.indexOf('http') === -1 ? '#' : data.imageUrl} target="_blank" rel="noreferrer">
                <img src={data.imageUrl} width="180px" alt=""/>
              </a>)}
          </div>
        </div>)}
      {data.text && data.isSystem && (<p style={{ textAlign: 'center', fontSize: '14px' }}>{data.text}</p>)}
      {showTimestamp && !data.isSystem && (<div className="timestamp">{friendlyTimestamp}</div>)}
    </div>);
}
exports.default = Message;
