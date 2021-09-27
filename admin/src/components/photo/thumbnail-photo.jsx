"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ThumbnailPhoto = void 0;
const react_1 = require("react");
class ThumbnailPhoto extends react_1.PureComponent {
    render() {
        const { photo } = this.props.photo;
        const urlThumb = photo && photo.thumbnails && photo.thumbnails.length > 0
            ? photo.thumbnails[0]
            : '/camera.png';
        return <img src={urlThumb} style={this.props.style || { width: 90 }}/>;
    }
}
exports.ThumbnailPhoto = ThumbnailPhoto;
