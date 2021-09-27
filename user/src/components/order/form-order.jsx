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
exports.FormOrder = void 0;
const antd_1 = require("antd");
const react_1 = __importStar(require("react"));
const icons_1 = require("@ant-design/icons");
const page_1 = __importDefault(require("@components/common/layout/page"));
require("./detail.less");
const order_1 = require("src/components/order");
const performer_1 = require("@components/performer");
const numberformat_1 = __importDefault(require("@components/common/layout/numberformat"));
const router_1 = __importDefault(require("next/router"));
class FormOrder extends react_1.PureComponent {
    render() {
        var _a;
        const { order, loading, isUpdating, disableUpdate, onFinish, isUser, onDownloadClick } = this.props;
        return (<page_1.default>
        {order && (<div className="main-container">
            <antd_1.Form onFinish={onFinish} wrapperCol={{ sm: { span: 18 } }} labelCol={{ sm: { span: 6 } }} initialValues={order} id="form-update-order">
              <antd_1.Form.Item wrapperCol={{ sm: { span: 12 } }}>
                <antd_1.Tag color="magenta">
                  #
                  {order.orderNumber}
                </antd_1.Tag>
              </antd_1.Form.Item>
              <antd_1.Form.Item label="Buyer">
                {((_a = order.buyerInfo) === null || _a === void 0 ? void 0 : _a.username) || 'N/A'}
              </antd_1.Form.Item>
              <antd_1.Form.Item label="Seller">
                {order.sellerSource === 'system' ? 'System'
                    : (order === null || order === void 0 ? void 0 : order.sellerInfo) ? <performer_1.PerformerUsername performer={order.sellerInfo}/> : 'N/A'}
              </antd_1.Form.Item>
              <antd_1.Form.Item label="Product">{order.name}</antd_1.Form.Item>
              <antd_1.Form.Item label="Description">{order.description}</antd_1.Form.Item>
              {order.productType === 'digital' && isUser
                    ? (<antd_1.Form.Item label="Download">
                      <icons_1.DownloadOutlined onClick={onDownloadClick}/>
                    </antd_1.Form.Item>) : null}

              <antd_1.Form.Item label="Quantity">{order.quantity}</antd_1.Form.Item>
              <antd_1.Form.Item label="Total Price">
                {order.payBy === 'token'
                    ? <numberformat_1.default value={order.totalPrice} suffix=" tokens"/>
                    : (<span>
                        $
                        <numberformat_1.default value={order.totalPrice}/>
                      </span>)}
              </antd_1.Form.Item>
              {order.productType === 'physical'
                    ? (<>
                      <antd_1.Form.Item label="Delivery Address">
                        {order.deliveryAddress || 'N/A'}
                      </antd_1.Form.Item>
                      <antd_1.Form.Item label="Delivery Postal Code">
                        {order.postalCode || 'N/A'}
                      </antd_1.Form.Item>
                      <antd_1.Form.Item name="shippingCode" label="Shipping Code">
                        {!isUser ? (<antd_1.Input placeholder="Enter shipping code here"/>) : (order.shippingCode)}
                      </antd_1.Form.Item>
                    </>)
                    : null}

              {!disableUpdate && order.productType === 'physical' ? (<antd_1.Form.Item name="deliveryStatus" label="Delivery Status">
                  <antd_1.Select>
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
                    <antd_1.Select.Option key="created" value="created">
                      Pending
                    </antd_1.Select.Option>
                  </antd_1.Select>
                </antd_1.Form.Item>) : (<antd_1.Form.Item name="deliveryStatus" label="Delivery Status">
                  <order_1.OrderStatus status={order.deliveryStatus}/>
                </antd_1.Form.Item>)}
              <antd_1.Form.Item>
                <antd_1.Space>
                  <antd_1.Button type="primary" onClick={() => router_1.default.back()}>
                    Back
                  </antd_1.Button>
                  <antd_1.Button type="primary" htmlType="submit" loading={isUpdating} disabled={loading} hidden={disableUpdate}>
                    Update
                  </antd_1.Button>
                </antd_1.Space>
              </antd_1.Form.Item>
            </antd_1.Form>
          </div>)}
      </page_1.default>);
    }
}
exports.FormOrder = FormOrder;
