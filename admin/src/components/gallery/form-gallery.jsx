"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FormGallery = void 0;
const react_1 = require("react");
const antd_1 = require("antd");
const select_performer_dropdown_1 = require("@components/performer/common/select-performer-dropdown");
class FormGallery extends react_1.PureComponent {
    constructor() {
        super(...arguments);
        this.state = {
            isSale: false
        };
    }
    componentDidMount() {
        if (!this.formRef)
            this.formRef = react_1.createRef();
        if (this.props.gallery && this.props.gallery.isSale) {
            this.setState({ isSale: true });
        }
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
        const { gallery, onFinish, submitting } = this.props;
        const { isSale } = this.state;
        return (<antd_1.Form ref={this.formRef} onFinish={onFinish.bind(this)} initialValues={gallery
                ? gallery
                : {
                    name: '',
                    description: '',
                    token: 0,
                    status: 'draft',
                    performerId: '',
                    isSale: false
                }} labelCol={{ span: 4 }} wrapperCol={{ span: 20 }}>
        <antd_1.Form.Item name="performerId" label="Performer" rules={[{ required: true }]}>
          <select_performer_dropdown_1.SelectPerformerDropdown disabled={gallery && gallery.performerId ? true : false} defaultValue={gallery && gallery.performerId} onSelect={(val) => this.setFormVal('performerId', val)}/>
        </antd_1.Form.Item>
        <antd_1.Form.Item name="name" rules={[
                { required: true, message: 'Please input title of gallery!' }
            ]} label="Name">
          <antd_1.Input placeholder="Enter gallery name"/>
        </antd_1.Form.Item>
        <antd_1.Form.Item name="isSale" label="Is sale gallery?">
          <antd_1.Checkbox checked={isSale} onChange={(v) => {
                this.setState({ isSale: v.target.checked });
                this.formRef.current.setFieldsValue({ isSale: !isSale });
            }}/>
        </antd_1.Form.Item>
        <antd_1.Form.Item name="token" label="Token">
          <antd_1.InputNumber disabled={!isSale} min={1}/>
        </antd_1.Form.Item>
        <antd_1.Form.Item name="description" label="Description">
          <antd_1.Input.TextArea rows={3}/>
        </antd_1.Form.Item>
        <antd_1.Form.Item name="status" label="Status" rules={[{ required: true, message: 'Please select status!' }]}>
          <antd_1.Select>
            <antd_1.Select.Option value="draft">Draft</antd_1.Select.Option>
            <antd_1.Select.Option key="active" value="active">
              Active
            </antd_1.Select.Option>
            <antd_1.Select.Option key="inactive" value="inactive">
              Inactive
            </antd_1.Select.Option>
          </antd_1.Select>
        </antd_1.Form.Item>
        <antd_1.Form.Item wrapperCol={{ offset: 4 }}>
          <antd_1.Button type="primary" htmlType="submit" style={{ float: 'right' }} loading={submitting}>
            Submit
        </antd_1.Button>
        </antd_1.Form.Item>
      </antd_1.Form>);
    }
}
exports.FormGallery = FormGallery;
