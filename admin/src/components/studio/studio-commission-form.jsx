"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
const antd_1 = require("antd");
const layout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 16 }
};
const validateMessages = {
    required: 'This field is required!'
};
class StudioCommissionForm extends react_1.PureComponent {
    render() {
        const { commission, onFinish, submiting } = this.props;
        return (<antd_1.Form layout={'vertical'} name="form-performer-commission" onFinish={onFinish.bind(this)} onFinishFailed={() => antd_1.message.error('Please complete the required fields.')} validateMessages={validateMessages} initialValues={commission
                ? { commission: commission }
                : {
                    commission: 20
                }}>
        <antd_1.Form.Item name="commission" label="Commission" rules={[
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
exports.default = StudioCommissionForm;
