"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ThumbnailBanner = void 0;
const react_1 = require("react");
class ThumbnailBanner extends react_1.PureComponent {
    render() {
        const { banner, style } = this.props;
        const { photo } = banner;
        const urlThumb = photo ? photo.url : '/camera.png';
        return <img src={urlThumb} style={style || { width: 100 }} alt="thumb"/>;
    }
}
exports.ThumbnailBanner = ThumbnailBanner;
