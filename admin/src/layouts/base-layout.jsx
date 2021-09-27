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
const React = __importStar(require("react"));
const primary_layout_1 = __importDefault(require("./primary-layout"));
const public_layout_1 = __importDefault(require("./public-layout"));
const head_1 = __importDefault(require("next/head"));
const LayoutMap = {
    primary: primary_layout_1.default,
    public: public_layout_1.default
};
class BaseLayout extends React.PureComponent {
    render() {
        const { children, layout, appConfig } = this.props;
        const Container = layout && LayoutMap[layout] ? LayoutMap[layout] : LayoutMap.primary;
        return (<React.Fragment>
        <head_1.default>
          <link href="/css/antd.min.css" rel="stylesheet" key="antd"/>
        </head_1.default>
        <Container>{children}</Container>
      </React.Fragment>);
    }
}
exports.default = BaseLayout;
