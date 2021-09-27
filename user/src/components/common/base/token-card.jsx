"use strict";
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const antd_1 = require("antd");
const numberformat_1 = __importDefault(require("@components/common/layout/numberformat"));
require("./token-card.less");
const react_1 = __importDefault(require("react"));
const react_redux_1 = require("react-redux");
const TokenCard = (_a) => {
    var { token, price, buying, currencySymbol } = _a, props = __rest(_a, ["token", "price", "buying", "currencySymbol"]);
    return (<div className="token-card">
    <div className="card-image">
      <div className="coin">
        <div className="current-coin">
          <img src="/crown.png" alt=""/>
          <span>
            x
            {token}
          </span>
        </div>
      </div>
    </div>
    {/* <NumberFormat value={}/> */}
    <numberformat_1.default value={token} suffix=" Token for "/>
    <numberformat_1.default value={price} prefix={currencySymbol}/>
    <br />
    <antd_1.Button type="primary" onClick={() => props.onBuyToken()} loading={buying} disabled={buying}>
      Buy Now
    </antd_1.Button>
  </div>);
};
TokenCard.defaultProps = {
    onBuyToken: null,
    buying: false,
    currencySymbol: '$'
};
const mapStateToProps = (state) => (Object.assign({}, state.ui));
exports.default = react_redux_1.connect(mapStateToProps)(TokenCard);
