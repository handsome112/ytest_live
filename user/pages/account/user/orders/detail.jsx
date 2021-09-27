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
const antd_1 = require("antd");
const page_header_1 = __importDefault(require("@components/common/layout/page-header"));
const head_1 = __importDefault(require("next/head"));
const react_1 = __importStar(require("react"));
const services_1 = require("src/services");
const react_redux_1 = require("react-redux");
const utils_1 = require("@lib/utils");
const router_1 = __importDefault(require("next/router"));
const form_order_1 = require("src/components/order/form-order");
class UserOrderDetailPage extends react_1.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            order: null,
            loading: false,
            isUpdating: false
        };
    }
    static async getInitialProps({ ctx }) {
        return ctx.query;
    }
    componentDidMount() {
        this.getData();
    }
    async getData() {
        const { id } = this.props;
        try {
            this.setState({ loading: true });
            const order = await services_1.orderService.userFindDetails(id);
            this.setState({
                order: order.data
            });
        }
        catch (e) {
            const error = await Promise.resolve(e);
            antd_1.message.error(utils_1.getResponseError(error));
        }
        finally {
            this.setState({ loading: false });
        }
    }
    async submit({ shippingCode, deliveryStatus }) {
        const { id } = this.props;
        if (!shippingCode) {
            antd_1.message.error('Missing shipping code');
            return;
        }
        try {
            this.setState({ isUpdating: true });
            await services_1.orderService.update(id, {
                deliveryStatus,
                shippingCode
            });
            antd_1.message.success('Changes saved.');
            router_1.default.back();
        }
        catch (e) {
            const error = await Promise.resolve(e);
            antd_1.message.error(utils_1.getResponseError(error));
        }
        finally {
            this.setState({ isUpdating: false });
        }
    }
    async download() {
        var _a, _b;
        const { order } = this.state;
        const resp = await services_1.productService.getDownloadLink(order.productId);
        if (!((_a = resp.data) === null || _a === void 0 ? void 0 : _a.downloadUrl)) {
            return antd_1.message.error('Something went wrong!');
        }
        return window.open((_b = resp.data) === null || _b === void 0 ? void 0 : _b.downloadUrl, '_blank');
    }
    render() {
        const { order, isUpdating, loading } = this.state;
        return (<>
        <head_1.default>
          <title>
            My Order -
            {order === null || order === void 0 ? void 0 : order.orderNumber}
          </title>
        </head_1.default>
        <div className="main-container">
          <page_header_1.default title="Order detail"/>
          <form_order_1.FormOrder order={order} loading={loading} isUpdating={isUpdating} onFinish={this.submit.bind(this)} onDownloadClick={this.download.bind(this)} isUser disableUpdate/>
        </div>
      </>);
    }
}
UserOrderDetailPage.authenticate = true;
UserOrderDetailPage.layout = 'primary';
const mapStates = (state) => ({
    ui: state.ui
});
exports.default = react_redux_1.connect(mapStates)(UserOrderDetailPage);
