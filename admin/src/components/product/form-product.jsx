"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FormProduct = void 0;
const react_1 = require("react");
const antd_1 = require("antd");
const icons_1 = require("@ant-design/icons");
const select_performer_dropdown_1 = require("@components/performer/common/select-performer-dropdown");
const image_product_1 = require("@components/product/image-product");
const layout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 16 }
};
const validateMessages = {
    required: 'This field is required!'
};
const radioStyle = {
    display: 'block',
    height: '30px',
    lineHeight: '30px'
};
class FormProduct extends react_1.PureComponent {
    constructor() {
        super(...arguments);
        this.state = {
            previewImageProduct: null,
            isDigitalProduct: false,
            digitalProductName: ''
        };
    }
    componentDidMount() {
        if (!this.formRef)
            this.formRef = react_1.createRef();
        const { product } = this.props;
        if (product && product.type === 'digital') {
            this.setState({
                isDigitalProduct: true
            });
        }
    }
    setFormVal(field, val) {
        const instance = this.formRef.current;
        instance.setFieldsValue({
            [field]: val
        });
        if (field === 'type') {
            this.setState({ isDigitalProduct: val === 'digital' ? true : false });
        }
    }
    beforeUpload(file, field) {
        if (field === 'image') {
            const reader = new FileReader();
            reader.addEventListener('load', () => this.setState({ previewImageProduct: reader.result }));
            reader.readAsDataURL(file);
        }
        if (field === 'digitalFile')
            this.setState({
                digitalProductName: file.name
            });
        this.props.beforeUpload(file, field);
        return false;
    }
    render() {
        if (!this.formRef)
            this.formRef = react_1.createRef();
        const { product, submit, uploading, uploadPercentage } = this.props;
        const { previewImageProduct, isDigitalProduct, digitalProductName } = this.state;
        const haveProduct = product ? true : false;
        return (<antd_1.Form {...layout} onFinish={submit && submit.bind(this)} onFinishFailed={() => antd_1.message.error('Please complete the required fields')} name="form-upload" ref={this.formRef} validateMessages={validateMessages} initialValues={product
                ? product
                : {
                    name: '',
                    token: 0,
                    description: '',
                    status: 'active',
                    performerId: '',
                    stock: 0,
                    type: 'physical'
                }}>
        <antd_1.Form.Item name="performerId" label="Performer" rules={[{ required: true }]}>
          <select_performer_dropdown_1.SelectPerformerDropdown disabled={haveProduct} defaultValue={product && product.performerId} onSelect={(val) => this.setFormVal('performerId', val)}/>
        </antd_1.Form.Item>
        <antd_1.Form.Item name="name" rules={[{ required: true, message: 'Please input name of product!' }]} label="Name">
          <antd_1.Input placeholder="Enter product name"/>
        </antd_1.Form.Item>
        {/* <Form.Item name="free" label="Free">
              <Switch defaultChecked={false} />
            </Form.Item> */}
        <antd_1.Form.Item name="token" label="Token">
          <antd_1.InputNumber />
        </antd_1.Form.Item>
        <antd_1.Form.Item name="stock" label="Stock">
          <antd_1.InputNumber />
        </antd_1.Form.Item>
        <antd_1.Form.Item name="description" label="Description">
          <antd_1.Input.TextArea rows={3}/>
        </antd_1.Form.Item>
        <antd_1.Form.Item name="type" label="Type" rules={[{ required: true, message: 'Please select type!' }]}>
          <antd_1.Select onChange={(val) => this.setFormVal('type', val)}>
            <antd_1.Select.Option key="physical" value="physical">
              Physical
            </antd_1.Select.Option>
            <antd_1.Select.Option key="digital" value="digital">
              Digital
            </antd_1.Select.Option>
          </antd_1.Select>
        </antd_1.Form.Item>
        {/* <Form.Item
              name="status"
              label="Status"
              rules={[{ required: true, message: 'Please select status!' }]}
            >
              <Select>
                <Select.Option key="active" value="active">
                  Active
                </Select.Option>
                <Select.Option key="inactive" value="inactive">
                  Inactive
                </Select.Option>
              </Select>
            </Form.Item> */}
        <antd_1.Form.Item name="publish" label="Publish" rules={[{ required: true, message: 'Please check status' }]}>
          <antd_1.Radio.Group>
            <antd_1.Radio style={radioStyle} value={true} key="publish">
              Yes
            </antd_1.Radio>
            <antd_1.Radio style={radioStyle} value={false} key="unpublish">
              No
            </antd_1.Radio>
          </antd_1.Radio.Group>
        </antd_1.Form.Item>
        <react_1.Fragment>
          <div key="image" className="ant-row ant-form-item">
            <div className="ant-col ant-col-4 ant-form-item-label">
              <label>Image</label>
            </div>
            <div className="ant-col ant-col-16 ant-form-item-control">
              <antd_1.Upload accept="image/*" multiple={false} showUploadList={false} disabled={uploading} beforeUpload={(file) => this.beforeUpload(file, 'image')}>
                {previewImageProduct ? (<img src={previewImageProduct} alt="file" style={{ width: '250px', marginBottom: '10px' }}/>) : product ? (<image_product_1.ImageProduct product={product} style={{ width: '250px', marginBottom: '10px' }}/>) : null}
                <div style={{ clear: 'both' }}></div>
                <antd_1.Button>
                  <icons_1.UploadOutlined /> Select File
                </antd_1.Button>
              </antd_1.Upload>
            </div>
          </div>
          {isDigitalProduct && (<div key="digital-product" className="ant-row ant-form-item">
              <div className="ant-col ant-col-4 ant-form-item-label">
                <label>Digital Product</label>
              </div>
              <div className="ant-col ant-col-16 ant-form-item-control">
                <antd_1.Upload multiple={false} showUploadList={false} disabled={uploading || haveProduct} beforeUpload={(file) => this.beforeUpload(file, 'digitalFile')}>
                  {digitalProductName && (<div className="ant-upload-list ant-upload-list-picture" style={{ marginBottom: 10 }}>
                      <div className="ant-upload-list-item ant-upload-list-item-done ant-upload-list-item-list-type-picture">
                        <div className="ant-upload-list-item-info">
                          <span>
                            <a className="ant-upload-list-item-thumbnail">
                              <icons_1.FileOutlined />
                            </a>
                            <a className="ant-upload-list-item-name ant-upload-list-item-name-icon-count-1">
                              {digitalProductName}
                            </a>
                          </span>
                        </div>
                      </div>
                    </div>)}
                  <div style={{ clear: 'both' }}></div>
                  <antd_1.Button>
                    <icons_1.UploadOutlined /> Select File
                  </antd_1.Button>
                </antd_1.Upload>
                {uploadPercentage ? (<antd_1.Progress percent={uploadPercentage}/>) : null}
              </div>
            </div>)}
        </react_1.Fragment>
        <antd_1.Form.Item wrapperCol={Object.assign(Object.assign({}, layout.wrapperCol), { offset: 4 })}>
          <antd_1.Button type="primary" htmlType="submit" loading={uploading}>
            {haveProduct ? 'Update' : 'Upload'}
          </antd_1.Button>
        </antd_1.Form.Item>
      </antd_1.Form>);
    }
}
exports.FormProduct = FormProduct;
