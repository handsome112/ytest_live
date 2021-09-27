"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
// import Link from 'next/link';
const antd_1 = require("antd");
require("./banner.less");
const renderBanner = (banner, styleImage) => {
    const { type, href, _id, photo, contentHTML } = banner;
    if (type === 'html' && contentHTML) {
        // eslint-disable-next-line react/no-danger
        return <div dangerouslySetInnerHTML={{ __html: contentHTML }} style={styleImage || {}}/>;
    }
    return (<a href={href || '#'} target="_blank" rel="noreferrer" key={_id}>
      <img src={photo && photo.url} alt="" style={styleImage || {}}/>
    </a>);
};
const Banner = ({ banners, styleImage, classnames }) => (<div>
    {banners && banners.length > 0 && (<antd_1.Carousel autoplay arrows dots={false} effect="fade" className={classnames}>
        {banners.map((item) => (renderBanner(item, styleImage)))}
      </antd_1.Carousel>)}
  </div>);
Banner.defaultProps = {
    classnames: ''
};
exports.default = Banner;
