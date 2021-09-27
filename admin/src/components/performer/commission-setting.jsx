"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommissionSettingForm = void 0;
const react_1 = require("react");
const antd_1 = require("antd");
const layout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 16 }
};
const validateMessages = {
    required: 'This field is required!'
};
class CommissionSettingForm extends react_1.PureComponent {
    render() {
        const { commissionSetting, onFinish, submiting } = this.props;
        return (<antd_1.Form layout={'vertical'} name="form-performer-commission" onFinish={onFinish.bind(this)} onFinishFailed={() => antd_1.message.error('Please complete the required fields.')} validateMessages={validateMessages} initialValues={commissionSetting
                ? commissionSetting
                : {
                    tipCommission: 20,
                    privateCallCommission: 20,
                    groupCallCommission: 20,
                    productCommission: 20,
                    albumCommission: 20,
                    videoCommission: 20
                }}>
        <antd_1.Form.Item name="tipCommission" label="Tip Commission" rules={[
                {
                    validator: (_, value) => {
                        if (parseInt(value) > 0 && parseInt(value) < 100) {
                            return Promise.resolve();
                        }
                        return Promise.reject('Value must be greater than 0 and less than 100');
                    }
                }
            ]}>
          <antd_1.InputNumber min={1} max={99} style={{ width: '100%' }}/>
        </antd_1.Form.Item>
        <antd_1.Form.Item name="privateCallCommission" label="Private Call Commission" rules={[
                {
                    validator: (_, value) => {
                        if (parseInt(value) > 0 && parseInt(value) < 100) {
                            return Promise.resolve();
                        }
                        return Promise.reject('Value must be greater than 0 and less than 100');
                    }
                }
            ]}>
          <antd_1.InputNumber min={1} max={99} style={{ width: '100%' }}/>
        </antd_1.Form.Item>
        <antd_1.Form.Item name="groupCallCommission" label="Group Call Commission" rules={[
                {
                    validator: (_, value) => {
                        if (parseInt(value) > 0 && parseInt(value) < 100) {
                            return Promise.resolve();
                        }
                        return Promise.reject('Value must be greater than 0 and less than 100');
                    }
                }
            ]}>
          <antd_1.InputNumber min={1} max={99} style={{ width: '100%' }}/>
        </antd_1.Form.Item>
        <antd_1.Form.Item name="productCommission" label="Product Sale Commission" rules={[
                {
                    validator: (_, value) => {
                        if (parseInt(value) > 0 && parseInt(value) < 100) {
                            return Promise.resolve();
                        }
                        return Promise.reject('Value must be greater than 0 and less than 100');
                    }
                }
            ]}>
          <antd_1.InputNumber min={1} max={99} style={{ width: '100%' }}/>
        </antd_1.Form.Item>
        <antd_1.Form.Item name="albumCommission" label="Album Sale Commission" rules={[
                {
                    validator: (_, value) => {
                        if (parseInt(value) > 0 && parseInt(value) < 100) {
                            return Promise.resolve();
                        }
                        return Promise.reject('Value must be greater than 0 and less than 100');
                    }
                }
            ]}>
          <antd_1.InputNumber min={1} max={99} style={{ width: '100%' }}/>
        </antd_1.Form.Item>
        <antd_1.Form.Item name="videoCommission" label="Video Sale Commission" rules={[
                {
                    validator: (_, value) => {
                        if (parseInt(value) > 0 && parseInt(value) < 100) {
                            return Promise.resolve();
                        }
                        return Promise.reject('Value must be greater than 0 and less than 100');
                    }
                }
            ]}>
          <antd_1.InputNumber min={1} max={99} style={{ width: '100%' }}/>
        </antd_1.Form.Item>
        <antd_1.Form.Item wrapperCol={Object.assign({}, layout.wrapperCol)}>
          <antd_1.Button type="primary" htmlType="submit" loading={submiting}>
            Submit
          </antd_1.Button>
        </antd_1.Form.Item>
      </antd_1.Form>);
    }
}
exports.CommissionSettingForm = CommissionSettingForm;
