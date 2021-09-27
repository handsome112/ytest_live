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
const React = __importStar(require("react"));
const link_1 = __importDefault(require("next/link"));
const antd_1 = require("antd");
const react_infinite_scroller_1 = __importDefault(require("react-infinite-scroller"));
const icons_1 = require("@ant-design/icons");
const string_1 = require("src/lib/string");
const trash_1 = __importDefault(require("@components/common/base/trash"));
// import Loader from '@components/common/base/loader';
require("./index.less");
const VideoGrid = ({ data, success, title, hasMore, addVideos, remove, onViewVideo }) => (<react_infinite_scroller_1.default pageStart={0} loadMore={addVideos} hasMore={hasMore}>
    <antd_1.Card className="video-grid" title={title} bordered={false}>
      {success && (data.length > 0 ? (data.map((video) => {
        var _a;
        return (<antd_1.Card.Grid className="video-box" key={video._id}>
              <div className="video-thumbnail">
                <img src={video.thumbnail || `${(_a = video === null || video === void 0 ? void 0 : video.video) === null || _a === void 0 ? void 0 : _a.thumbnails[0]}` || '/no-image.jpg'} alt=""/>
                <a className="play-icon">
                  <icons_1.PlayCircleOutlined onClick={() => onViewVideo(video)}/>
                </a>
              </div>
              <div className="video-info">
                <div>
                  Status:
                  {' '}
                  <strong>{string_1.capitalizeFirstLetter(video.status)}</strong>
                </div>
                <antd_1.Space>
                  <link_1.default href={{
                pathname: '/account/performer/videos/update',
                query: { video: JSON.stringify(video) }
            }} as={`/account/performer/videos/${video._id}/update`}>
                    <a>
                      <icons_1.EditOutlined />
                    </a>
                  </link_1.default>
                  <trash_1.default confirm={() => remove(video._id)}/>
                </antd_1.Space>
              </div>
            </antd_1.Card.Grid>);
    })) : (<p>
            There is no videos, click
            {' '}
            <link_1.default href="/account/performer/videos/add">
              <a>here</a>
            </link_1.default>
            {' '}
            to upload
          </p>))}
    </antd_1.Card>
  </react_infinite_scroller_1.default>);
VideoGrid.defaultProps = {
    success: false,
    title: '',
    addVideos: null,
    hasMore: false,
    remove: false,
    onViewVideo: false
};
exports.default = VideoGrid;
