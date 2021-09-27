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
const page_header_1 = __importDefault(require("@components/common/layout/page-header"));
const head_1 = __importDefault(require("next/head"));
const form_1 = __importDefault(require("@components/refund-request/form"));
const services_1 = require("src/services");
const utils_1 = require("@lib/utils");
const router_1 = __importDefault(require("next/router"));
class NewRefundRequestPage extends react_1.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            onSubmit: false,
            performers: [],
            selectedPerformerId: '',
            products: []
        };
    }
    componentDidMount() {
        this.getPerformers();
    }
    onChangePerformer(performerId) {
        this.setState({ selectedPerformerId: performerId }, () => {
            this.getProducts();
        });
    }
    async onFinish(data) {
        try {
            this.setState({ onSubmit: true });
            await services_1.refundRequestService.create(data);
            antd_1.message.success('Your request has been sent');
            router_1.default.back();
        }
        catch (e) {
            const err = await Promise.resolve(e);
            antd_1.message.error(utils_1.getResponseError(err));
        }
        finally {
            this.setState({ onSubmit: false });
        }
    }
    async getPerformers() {
        try {
            const resp = await (await services_1.performerService.search({ limit: 3000 })).data;
            resp && this.setState({ performers: resp.data });
        }
        catch (e) {
            const err = Promise.resolve(e);
            antd_1.message.error(utils_1.getResponseError(err));
        }
    }
    async getProducts() {
        try {
            const { selectedPerformerId } = this.state;
            if (!selectedPerformerId) {
                return;
            }
            const resp = await (await services_1.orderService.userSearch({ limit: 3000, deliveryStatus: 'delivered', performerId: selectedPerformerId })).data;
            resp && this.setState({ products: resp.data });
        }
        catch (e) {
            const err = Promise.resolve(e);
            antd_1.message.error(utils_1.getResponseError(err));
        }
    }
    render() {
        const { onSubmit, performers, products } = this.state;
        return (<>
        <head_1.default>
          <title>New Refund Request</title>
        </head_1.default>
        <div className="performer-videos-page">
          <page_header_1.default title="Refund request"/>
          <form_1.default onChangePerformer={this.onChangePerformer.bind(this)} loading={onSubmit} onFinish={this.onFinish.bind(this)} performers={performers} products={products}/>
        </div>
      </>);
    }
}
NewRefundRequestPage.authenticate = true;
NewRefundRequestPage.layout = 'primary';
exports.default = NewRefundRequestPage;
