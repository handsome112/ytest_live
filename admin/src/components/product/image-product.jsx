"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ImageProduct = void 0;
const react_1 = require("react");
class ImageProduct extends react_1.PureComponent {
    render() {
        const { image } = this.props.product;
        const url = image ? image : '/product.png';
        return <img src={url} style={this.props.style || { width: 70 }}/>;
    }
}
exports.ImageProduct = ImageProduct;
