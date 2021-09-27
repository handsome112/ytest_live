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
const react_1 = __importStar(require("react"));
const antd_1 = require("antd");
const lib_1 = require("src/lib");
require("./index.less");
const numberformat_1 = __importDefault(require("@components/common/layout/numberformat"));
class GalleryCard extends react_1.PureComponent {
    render() {
        const { gallery, onHandlePurchase } = this.props;
        const { isSale, token, coverPhoto, name, numOfItems } = gallery;
        // To-do: Should create separate component
        const renderPriceTag = () => ((isSale && token) ? (<antd_1.Tag color={lib_1.defaultColor.primaryColor}>
        <numberformat_1.default value={token} suffix=" tokens"/>
      </antd_1.Tag>) : (<antd_1.Tag>
        FREE
      </antd_1.Tag>));
        return (<div className="gallery-card" aria-hidden onClick={() => {
                onHandlePurchase(gallery, 'gallery');
            }}>
        <div className="gallery-thumb">
          <span className="value">{renderPriceTag()}</span>
          <img src={(coverPhoto === null || coverPhoto === void 0 ? void 0 : coverPhoto.thumbnails[0]) || '/no-image.jpg'} alt=""/>
          <span className="count">
            Images:
            {' '}
            {numOfItems}
          </span>
        </div>
        <div className="gallery-info">
          <span className="name">{name}</span>
        </div>
      </div>);
    }
}
exports.default = GalleryCard;
