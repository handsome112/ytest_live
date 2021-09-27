"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const classnames_1 = __importDefault(require("classnames"));
require("./loader.less");
const Loader = ({ spinning = false, fullScreen = false }) => (<div className={classnames_1.default('loader', {
        hidden: !spinning,
        fullScreen
    })}>
    <div className="warpper">
      {/* <div className="inner" /> */}
      <div className="text"><img src="/loading-ico.gif" width="65px" alt=""/></div>
    </div>
  </div>);
exports.default = Loader;
