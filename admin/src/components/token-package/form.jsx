"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FormTokenPackage = void 0;
const react_1 = require("react");
const antd_1 = require("antd");
class FormTokenPackage extends react_1.PureComponent {
    componentDidMount() {
        if (!this.formRef)
            this.formRef = react_1.createRef();
    }
    setFormVal(field, val) {
        const instance = this.formRef.current;
        instance.setFieldsValue({
            [field]: val
        });
    }
    render() {
        if (!this.formRef)
            this.formRef = react_1.createRef();
        const { tokenPackage, onFinish, submitting, settings } = this.props;
        return (<antd_1.Form ref={this.formRef} onFinish={onFinish.bind(this)} initialValues={tokenPackage
                ? tokenPackage
                : {
                    name: '',
                    price: 1,
                    tokens: 1,
                    isActive: true,
                    ordering: 0,
                    description: ''
                }} labelCol={{ span: 4 }} wrapperCol={{ span: 20 }}>
        <antd_1.Form.Item name="name" rules={[{ required: true, message: 'Please input name!' }]} label="Name">
          <antd_1.Input placeholder="Enter package's name"/>
        </antd_1.Form.Item>

        <antd_1.Form.Item name="price" label="Price" rules={[{ required: true, message: 'Please input price!' }]}>
          <antd_1.InputNumber placeholder="Please input price of package" min={1}/>
        </antd_1.Form.Item>

        <antd_1.Form.Item name="tokens" label="Number of tokens" rules={[{ required: true, message: 'Please input tokens!' }]}>
          <antd_1.InputNumber placeholder="Please input number of tokens in package" min={1}/>
        </antd_1.Form.Item>

        <antd_1.Form.Item name="ordering" label="Ordering">
          <antd_1.InputNumber />
        </antd_1.Form.Item>
        <antd_1.Form.Item name="isActive" valuePropName="checked" label="Active?">
          <antd_1.Checkbox />
        </antd_1.Form.Item>

        <antd_1.Form.Item name="description" label="Description">
          <antd_1.Input.TextArea rows={3}/>
        </antd_1.Form.Item>

        <antd_1.Form.Item labelCol={{ span: 0 }} wrapperCol={{ span: 24 }}>
          <antd_1.Button type="primary" htmlType="submit" style={{ float: 'right' }} loading={submitting}>
            Submit
          </antd_1.Button>
        </antd_1.Form.Item>
      </antd_1.Form>);
    }
}
exports.FormTokenPackage = FormTokenPackage;
