"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const link_1 = __importDefault(require("next/link"));
const icons_1 = require("@ant-design/icons");
require("./index.less");
const react_1 = __importDefault(require("react"));
const PurchasedVideoCard = ({ video, performer, onClick }) => {
    var _a;
    const { title, thumbnail, _id } = video;
    return (<div className="purchased-video-card">
      <div className="purchased-video-card-thumb">
        <span>
          <icons_1.PlayCircleOutlined onClick={onClick}/>
        </span>
        <img src={thumbnail || ((_a = video.video) === null || _a === void 0 ? void 0 : _a.thumbnails[0])} alt=""/>
      </div>
      <div className="purchased-video-card-name">
        <link_1.default href={{
            pathname: '/videos/detail',
            query: { id: _id, data: JSON.stringify(Object.assign(Object.assign({}, video), { performer })) }
        }} as={`/video/${_id}`}>
          <a>{title}</a>
        </link_1.default>
      </div>
    </div>);
};
exports.default = PurchasedVideoCard;
