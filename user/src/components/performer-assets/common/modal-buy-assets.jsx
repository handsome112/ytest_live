"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable no-return-assign */
const react_1 = __importDefault(require("react"));
const antd_1 = require("antd");
const popup_1 = __importDefault(require("@components/common/base/popup"));
require("./modal-buy-assets.less");
const lib_1 = require("src/lib");
const services_1 = require("src/services");
const numberformat_1 = __importDefault(require("@components/common/layout/numberformat"));
const initialValues = {
    postalCode: '',
    deliveryAddress: '',
    quantity: 1
};
class ModalBuyAssets extends react_1.default.PureComponent {
    constructor(props) {
        super(props);
        this.state = Object.assign(Object.assign({}, initialValues), { type: 'product', purchasing: false, item: undefined });
    }
    async onOk() {
        const { loggedIn } = this.props;
        const { item } = this.state;
        if (!loggedIn) {
            antd_1.message.error('Please login to buy this item!');
            return;
        }
        this.setState({ purchasing: true });
        lib_1.isPhysicalProduct(item) ? this.form.submit() : this.submit();
    }
    async submit() {
        const formError = this.form.getFieldsError().find((f) => f.errors.length);
        const { onSucess, onError, updateCurrentUserBalance } = this.props;
        if (formError)
            return;
        const { quantity } = this.form.getFieldsValue();
        try {
            const { type, item } = this.state;
            await services_1.purchaseItemService.purchaseItem(item._id, type, this.form.getFieldsValue());
            if (type === 'product' && item.type === 'digital') {
                antd_1.message.success('Please check your email to view the digital product');
            }
            else {
                antd_1.message.success('Purchased Success');
            }
            updateCurrentUserBalance
                && updateCurrentUserBalance(parseInt(item.token, 10) * quantity * -1);
            onSucess && onSucess(type, item._id, { isBought: true });
        }
        catch (e) {
            const error = await Promise.resolve(e);
            antd_1.message.error(lib_1.getResponseError(error));
            onError && onError(error);
        }
        finally {
            this.popup && this.popup.setVisible(false);
            this.setState({ purchasing: false });
        }
    }
    showModalBuyAssets(item, type) {
        this.setState({ item, type });
        this.popup && this.popup.setVisible(true);
    }
    render() {
        const { type, item, quantity, purchasing } = this.state;
        const footer = [];
        // if (type === 'gallery') {
        //   footer.push();
        // }
        return (<popup_1.default footer={footer} title={`Buy ${lib_1.capitalizeFirstLetter(type)}`} okText="Purchase" ref={(ref) => (this.popup = ref)} onOk={this.onOk.bind(this)} loading={purchasing} content={item && (<>
              <antd_1.Form initialValues={initialValues} layout="vertical" ref={(ref) => (this.form = ref)} onValuesChange={(_, values) => this.setState(values)} hidden={!lib_1.isPhysicalProduct(item)} onFinish={this.submit.bind(this)} onFinishFailed={() => this.setState({ purchasing: false })}>
                <antd_1.Form.Item name="deliveryAddress" rules={[
                    {
                        required: true,
                        message: 'Please provide delivery address!'
                    }
                ]} label="Delivery Address">
                  <antd_1.Input placeholder="Enter your address"/>
                </antd_1.Form.Item>
                <antd_1.Form.Item name="postalCode" label="Postal Code">
                  <antd_1.Input placeholder="Enter your postal code"/>
                </antd_1.Form.Item>
                <antd_1.Form.Item name="quantity" label="Quantity" rules={[
                    {
                        validator(_, value) {
                            if (parseInt(value, 10) < 1) {
                                return Promise.reject(new Error('Quantity must be positive!'));
                            }
                            return Promise.resolve();
                        }
                    }
                ]}>
                  <antd_1.InputNumber placeholder="Enter quantity" style={{ width: '100%' }}/>
                </antd_1.Form.Item>
                <antd_1.Form.Item>
                  <div>
                    {type === 'video' && (<strong>Available high-res Video</strong>)}
                    {type === 'gallery' && (<strong>Available high-res Image</strong>)}
                    {quantity === 1 && (<h3>
                        {/* <NumberFormat value={item.token} prefix={`Buy this ${item.name || item.title} For `} suffix=" Tokens" /> */}
                        Buy this
                        <span className="color">
                          {' '}
                          {item.name || item.title}
                          {' '}
                        </span>
                        For
                        <span className="color">
                          {' '}
                          <numberformat_1.default value={item.token}/>
                          {' '}
                        </span>
                        Tokens
                      </h3>)}
                    {quantity > 1 && (<h3>
                        <numberformat_1.default value={parseInt(item.token, 10) * quantity} prefix={`Buy x${quantity} ${item.name || item.title} For `} suffix=" Tokens"/>
                      </h3>)}
                  </div>
                </antd_1.Form.Item>
              </antd_1.Form>
              <numberformat_1.default hidden={lib_1.isPhysicalProduct(item)} value={parseInt(item.token, 10) * quantity} prefix={`Buy ${item.name || item.title} For `} suffix=" Tokens"/>
            </>)}/>);
    }
}
exports.default = ModalBuyAssets;
