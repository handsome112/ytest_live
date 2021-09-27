"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const antd_1 = require("antd");
const head_1 = __importDefault(require("next/head"));
const react_1 = require("react");
const breadcrumb_1 = require("@components/common/breadcrumb");
const page_1 = __importDefault(require("@components/common/layout/page"));
const services_1 = require("src/services");
const router_1 = __importDefault(require("next/router"));
const utils_1 = require("@lib/utils");
const { Content } = antd_1.Layout;
class OrderDetailPage extends react_1.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            submitting: false,
            order: null,
            loading: true,
            isUpdating: true,
            shippingCode: '',
            deliveryStatus: ''
        };
    }
    static async getInitialProps({ ctx }) {
        return ctx.query;
    }
    componentDidMount() {
        this.getData();
    }
    async getData() {
        try {
            const order = await services_1.orderService.findById(this.props.id);
            await this.setState({
                order: order.data,
                shippingCode: order.data.shippingCode,
                deliveryStatus: order.data.deliveryStatus
            });
        }
        catch (e) {
            antd_1.message.error('Can not find order!');
        }
        finally {
            this.setState({ loading: false });
        }
    }
    async onUpdate() {
        const { deliveryStatus, shippingCode } = this.state;
        if (!shippingCode) {
            return antd_1.message.error('Missing shipping code');
        }
        try {
            this.setState({ loading: true });
            await services_1.orderService.update(this.props.id, {
                deliveryStatus,
                shippingCode
            });
            antd_1.message.success('Changes saved.');
        }
        catch (e) {
            antd_1.message.error(utils_1.getResponseError(e));
        }
        finally {
            await this.setState({ loading: false });
            router_1.default.push('/order');
        }
    }
    render() {
        var _a, _b;
        const { order } = this.state;
        return (<antd_1.Layout>
        <head_1.default>
          <title>Order Details</title>
        </head_1.default>
        <Content>
          <div className="main-container">
            <breadcrumb_1.BreadcrumbComponent breadcrumbs={[
                { title: 'Orders', href: '/order' },
                {
                    title: '#' + (order === null || order === void 0 ? void 0 : order.orderNumber)
                }
            ]}/>
            <page_1.default>
              {order && (<div className="main-container">
                  <div style={{ marginBottom: '10px' }}>
                    <b>#{order === null || order === void 0 ? void 0 : order.orderNumber}</b>
                  </div>
                  <div style={{ marginBottom: '10px' }}>
                    <strong>Buyer:</strong> {(_a = order.buyerInfo) === null || _a === void 0 ? void 0 : _a.username}
                  </div>
                  <div style={{ marginBottom: '10px' }}>
                    <strong>Seller:</strong> {(_b = order.sellerInfo) === null || _b === void 0 ? void 0 : _b.username}
                  </div>
                  <div style={{ marginBottom: '10px' }}>
                    <strong>Product:</strong>
                    <span>{order.name}</span> <br />
                    <small>{order.description}</small>
                  </div>
                  <div style={{ marginBottom: '10px' }}>
                    <strong>Product type:</strong>
                    <span>{order.produtType}</span>
                  </div>
                  <div style={{ marginBottom: '10px' }}>
                    <strong>Quantity:</strong> {order.quantity}
                  </div>
                  <div style={{ marginBottom: '10px' }}>
                    <strong>Total Price:</strong>
                    {order.payBy === 'token' ?
                    <span>{order.totalPrice} token(s)</span> :
                    <span>${order.totalPrice}</span>}
                  </div>
                  {order.productType !== 'physical' ?
                    <div style={{ marginBottom: '10px' }}>
                      Delivery Status: Delivered
                    </div> :
                    <>
                      <div style={{ marginBottom: '10px' }}>
                        <strong>Delivery Address:</strong> {order.deliveryAddress || 'N/A'}
                      </div>
                      <div style={{ marginBottom: '10px' }}>
                        <strong>Delivery Postal Code:</strong> {order.postalCode || 'N/A'}
                      </div>
                      <div style={{ marginBottom: '10px' }}>
                        Shipping Code:{' '}
                        <antd_1.Input placeholder="Enter shipping code here" defaultValue={order.shippingCode} onChange={(e) => this.setState({ shippingCode: e.target.value })}></antd_1.Input>
                      </div>
                      <div style={{ marginBottom: '10px' }}>
                        Delivery Status:{' '}
                        <antd_1.Select onChange={(e) => this.setState({ deliveryStatus: e })} defaultValue={order.deliveryStatus}>
                          <antd_1.Select.Option key="processing" value="processing">
                            Processing
                          </antd_1.Select.Option>
                          <antd_1.Select.Option key="shipping" value="shipping">
                            Shipping
                          </antd_1.Select.Option>
                          <antd_1.Select.Option key="delivered" value="delivered">
                            Delivered
                          </antd_1.Select.Option>
                          <antd_1.Select.Option key="refunded" value="refunded">
                            Refunded
                          </antd_1.Select.Option>
                        </antd_1.Select>
                      </div>
                      <div style={{ marginBottom: '10px' }}>
                        <antd_1.Button danger onClick={this.onUpdate.bind(this)}>
                          Update
                        </antd_1.Button>
                      </div>
                    </>}
                </div>)}
            </page_1.default>
          </div>
        </Content>
      </antd_1.Layout>);
    }
}
OrderDetailPage.authenticate = true;
OrderDetailPage.onlyPerformer = true;
exports.default = OrderDetailPage;
