"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const link_1 = __importDefault(require("next/link"));
const antd_1 = require("antd");
const icons_1 = require("@ant-design/icons");
const lib_1 = require("src/lib");
const numberformat_1 = __importDefault(require("@components/common/layout/numberformat"));
const generateToken = (token, isSale) => (<antd_1.Tag color={isSale ? lib_1.defaultColor.primaryColor : lib_1.defaultColor.successColor}>
    {isSale ? <numberformat_1.default value={token} suffix=" tokens"/> : 'FREE'}
  </antd_1.Tag>);
exports.default = ({ video }) => {
    var _a;
    return (<div className="item">
    <div className="item-image" style={{ backgroundImage: `url(${video.thumbnail || ((_a = video === null || video === void 0 ? void 0 : video.video) === null || _a === void 0 ? void 0 : _a.thumbnails[0]) || '/no-image.jpg'})` }}>
      <div className="value">
        {generateToken(video.token, video.isSaleVideo)}
      </div>

      {video.isSaleVideo && !video.isBought && (<div className="item-lock">
          <icons_1.LockOutlined />
        </div>)}
      {video.video && video.video.duration && (<div className="item-duration ant-tag ant-tag-has-color">
          {lib_1.formatDuration(video.video.duration)}
        </div>)}
      <link_1.default shallow={false} href={{
            pathname: '/videos/detail',
            query: { id: video._id, data: JSON.stringify(video) }
        }} as={`/video/${video._id}`}>
        <a>
          <icons_1.PlayCircleOutlined className="icon-play"/>
        </a>
      </link_1.default>
    </div>
    <div className="item-title">
      <span className="item-name">{video.title}</span>
    </div>
  </div>);
};
