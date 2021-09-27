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
const antd_1 = require("antd");
const icons_1 = require("@ant-design/icons");
const router_1 = __importDefault(require("next/router"));
const video_item_1 = __importDefault(require("./video-item"));
require("./index.less");
exports.default = ({ performer, videos, searching, success }) => {
    const ref = React.useRef(null);
    const [paddleShowing, setPaddleShowing] = React.useState(false);
    React.useEffect(() => {
        const videoListElement = document.querySelector('.video-list');
        if (!videoListElement) {
            return;
        }
        if (videoListElement.clientWidth < videoListElement.scrollWidth) {
            setPaddleShowing(true);
        }
    }, [performer]);
    const scrollTo = (width) => {
        const e = ref.current;
        e.scroll({ left: width, behavior: 'smooth' });
    };
    return (!searching
        && success
        && performer.videos.length > 0 && (<div className="video-carousel">
        <div className="video-header">
          <span className="shop-name">{`${performer.username}'s Videos`}</span>
          <antd_1.Button type="primary" onClick={() => {
            router_1.default.push(`/videos?username=${performer.username}`);
        }}>
            See all Items
          </antd_1.Button>
        </div>
        <icons_1.LeftCircleFilled className="left-paddle paddle" hidden={!paddleShowing} onClick={() => scrollTo(-ref.current.clientWidth)}/>
        <div className="video-list" ref={ref}>
          {performer.videos.map((id) => (<antd_1.Col xl={6} md={8} sm={10} xs={16} key={id} className="pad12-5">
              <video_item_1.default video={videos[id]} key={id}/>
            </antd_1.Col>))}
        </div>
        <icons_1.RightCircleFilled hidden={!paddleShowing} className="right-paddle paddle" onClick={() => scrollTo(ref.current.clientWidth)}/>
      </div>));
};
