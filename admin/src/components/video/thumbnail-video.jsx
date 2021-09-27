"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ThumbnailVideo = void 0;
const react_1 = require("react");
class ThumbnailVideo extends react_1.PureComponent {
    render() {
        const { thumbnail, video } = this.props.video;
        const url = thumbnail
            ? thumbnail
            : video && video.thumbnails && video.thumbnails.length > 0
                ? video.thumbnails[0]
                : '/video.png';
        return <img src={url} style={this.props.style || { width: 90 }}/>;
    }
}
exports.ThumbnailVideo = ThumbnailVideo;
