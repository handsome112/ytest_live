"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CoverGallery = void 0;
const react_1 = require("react");
class CoverGallery extends react_1.PureComponent {
    render() {
        const { coverPhoto } = this.props.gallery;
        const url = coverPhoto && coverPhoto.thumbnails && coverPhoto.thumbnails.length > 0
            ? coverPhoto.thumbnails[0]
            : '/gallery.png';
        return <img src={url} style={this.props.style || { width: 90 }}/>;
    }
}
exports.CoverGallery = CoverGallery;
