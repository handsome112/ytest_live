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
const performer_grid_1 = __importDefault(require("./performer-grid"));
require("./performer-carousel.less");
exports.default = ({ performers, searching, success }) => {
    const ref = React.useRef(null);
    const [paddleShowing, setPaddleShowing] = React.useState(false);
    React.useEffect(() => {
        const performerListElement = document.getElementsByClassName('performer-grid');
        if (performerListElement.length
            && performerListElement[0].clientWidth < performerListElement[0].scrollWidth) {
            setPaddleShowing(true);
        }
    }, [performers]);
    const scrollTo = (width) => {
        const e = ref.current;
        e.scroll({ left: width, behavior: 'smooth' });
    };
    return (!searching
        && success && (<div className="performer-carousel">
        <div className="carousel-header">
          <span className="carousel-title">Related Cams</span>
          <antd_1.Button type="primary" onClick={() => router_1.default.push('/')}>
            See all Items
          </antd_1.Button>
        </div>
        <icons_1.LeftCircleFilled className="left-paddle paddle" hidden={!paddleShowing} onClick={() => scrollTo(-ref.current.clientWidth)}/>
        <performer_grid_1.default total={performers ? performers.length : 0} data={performers} success={success} searching={searching}/>
        <icons_1.RightCircleFilled hidden={!paddleShowing} className="right-paddle paddle" onClick={() => scrollTo(ref.current.clientWidth)}/>
      </div>));
};
