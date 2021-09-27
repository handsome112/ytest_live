"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const antd_1 = require("antd");
const react_1 = __importDefault(require("react"));
const lib_1 = require("src/lib");
const link_1 = __importDefault(require("next/link"));
require("./index.less");
const numberformat_1 = __importDefault(require("@components/common/layout/numberformat"));
const generateToken = (token, isSale) => token && (<antd_1.Tag color={token > 0 ? lib_1.defaultColor.primaryColor : '#ccc'}>
  {isSale && token > 0 ? <numberformat_1.default value={token} suffix=" tokens"/> : 'FREE'}
</antd_1.Tag>);
const VideoSingleCard = ({ video }) => {
    const { token, title, thumbnail, isSaleVideo, _id } = video;
    return (<div className="video-single-card">
      <div className="video-single-card-thumb">
        <div className="value">{generateToken(token, isSaleVideo)}</div>
        <link_1.default href={{
            pathname: '/videos/detail',
            query: { id: _id, data: JSON.stringify(video) }
        }} as={`/video/${_id}`}>
          <a>
            <img src={(thumbnail && thumbnail !== 'null' && thumbnail) || video.video.thumbnails[0]} alt=""/>
          </a>
        </link_1.default>
      </div>
      <div className="info">{title}</div>
    </div>);
};
exports.default = VideoSingleCard;
