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
require("./index.less");
const lib_1 = require("src/lib");
const numberformat_1 = __importDefault(require("@components/common/layout/numberformat"));
class ProductCard extends react_1.PureComponent {
    render() {
        const { product, onHandlePurchase } = this.props;
        const generateToken = (token) => token && (<antd_1.Tag color={token > 0 ? lib_1.defaultColor.primaryColor : '#ccc'}>
      {token > 0 ? <numberformat_1.default value={token} suffix=" tokens"/> : 'FREE'}
    </antd_1.Tag>);
        return (<div className="product-card" aria-hidden onClick={() => onHandlePurchase(product)}>
        <div className="product-thumb">
          {product.type === 'physical' && (<div className="stock ant-tag ant-tag-has-color">
              Stock:
              {product.stock}
            </div>)}
          <span className="value">{generateToken(product.token)}</span>
          {product.type === 'digital' && <span className="type-digital">Digital</span>}
          {product.type === 'physical' && <span className="type-digital">Physical</span>}
          <div className="hover-pointer">
            <img alt="" src={(product === null || product === void 0 ? void 0 : product.image) || '/no-image.jpg'}/>
          </div>
        </div>
        <div className="product-name">{product.name}</div>
      </div>);
    }
}
exports.default = ProductCard;
