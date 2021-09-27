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
const default_layout_1 = __importDefault(require("./default-layout"));
const auth_layout_1 = __importDefault(require("./auth-layout"));
const maintenance_layout_1 = __importDefault(require("./maintenance-layout"));
const LayoutMap = {
    maintenance: maintenance_layout_1.default,
    primary: primary_layout_1.default,
    public: public_layout_1.default,
    auth: auth_layout_1.default,
    default: default_layout_1.default
};
class BaseLayout extends React.PureComponent {
    render() {
        const { children, layout, maintenanceMode = false } = this.props;
        if (maintenanceMode) {
            return <maintenance_layout_1.default />;
        }
        const Container = layout && LayoutMap[layout] ? LayoutMap[layout] : LayoutMap.public;
        return (<>
        <Container>{children}</Container>
      </>);
    }
}
exports.default = BaseLayout;
