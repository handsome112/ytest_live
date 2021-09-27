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
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderStatus = void 0;
const react_1 = __importStar(require("react"));
const antd_1 = require("antd");
class OrderStatus extends react_1.PureComponent {
    renderStatus(status) {
        switch (status) {
            case 'processing':
                return <antd_1.Tag color="processing">Processing</antd_1.Tag>;
            case 'shipping':
                return <antd_1.Tag color="warning">Shipping</antd_1.Tag>;
            case 'delivered':
                return <antd_1.Tag color="success">Delivered</antd_1.Tag>;
            case 'refunded':
                return <antd_1.Tag color="error">Refunded</antd_1.Tag>;
            case 'created':
                return <antd_1.Tag color="default">Created</antd_1.Tag>;
            default:
                return <antd_1.Tag color="default">Pending</antd_1.Tag>;
        }
    }
    render() {
        const { status } = this.props;
        return this.renderStatus(status);
    }
}
exports.OrderStatus = OrderStatus;
