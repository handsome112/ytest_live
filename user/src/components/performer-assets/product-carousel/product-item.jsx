"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
const react_1 = __importDefault(require("react"));
const link_1 = __importDefault(require("next/link"));
const antd_1 = require("antd");
const icons_1 = require("@ant-design/icons");
const icons_2 = require("@components/common/base/icons");
const numberformat_1 = __importDefault(require("@components/common/layout/numberformat"));
const Products = ({ product, purchaseProduct }) => (<div className="item" key={`product-${product.name}`}>
    <link_1.default shallow={false} href={{
        pathname: '/',
        query: {
            product: product._id
        }
    }}>
      <a className="item-image" style={{ backgroundImage: `url(${product.image})` }}>
        <div className="item-token" onClick={(e) => {
        e.preventDefault();
        purchaseProduct(product, 'product');
    }}>
          <span className="text-buy">Buy</span>
          {' '}
          <icons_2.TokensIcon />
          {' '}
          <numberformat_1.default value={product.token}/>
        </div>
      </a>
    </link_1.default>
    <div className="item-title">
      <span className="item-name">{product.name}</span>
      <antd_1.Space className="item-toolbar">
        <icons_1.HeartOutlined />
        <span>0</span>
        <icons_1.EyeOutlined />
        <span>0</span>
      </antd_1.Space>
    </div>
    <div className="item-description">{product.description}</div>
    <div className="item-tags"/>
  </div>);
Products.defaultProps = {
    purchaseProduct: null
};
exports.default = Products;
