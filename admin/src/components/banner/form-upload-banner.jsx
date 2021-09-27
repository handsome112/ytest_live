"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FormUploadBanner = void 0;
/* eslint-disable jsx-a11y/label-has-associated-control */
const react_1 = require("react");
const antd_1 = require("antd");
const icons_1 = require("@ant-design/icons");
const thumbnail_banner_1 = require("@components/banner/thumbnail-banner");
const env_1 = __importDefault(require("src/env"));
const TextArea_1 = __importDefault(require("antd/lib/input/TextArea"));
const layout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 16 }
};
const validateMessages = {
    required: 'This field is required!'
};
class FormUploadBanner extends react_1.PureComponent {
    constructor() {
        super(...arguments);
        this.state = {
            preview: null,
            type: 'img'
        };
    }
    componentDidMount() {
        var _a, _b;
        if (!this.formRef)
            this.formRef = react_1.createRef();
        if (((_a = this.props.banner) === null || _a === void 0 ? void 0 : _a.type) == 'img') {
            this.setState({ type: 'img' });
        }
        else if (((_b = this.props.banner) === null || _b === void 0 ? void 0 : _b.type) == 'html') {
            this.setState({ type: 'html' });
        }
    }
    setFormVal(field, val) {
        const instance = this.formRef.current;
        instance.setFieldsValue({
            [field]: val
        });
    }
    beforeUpload(file) {
        const { beforeUpload: handleUpload } = this.props;
        const isMaxSize = file.size / 1024 / 1024 < (env_1.default.maximumSizeUploadImage || 10);
        if (!isMaxSize) {
            antd_1.message.error(`Image must be smaller than ${env_1.default.maximumSizeUploadImage || 10}MB!`);
            return false;
        }
        const reader = new FileReader();
        reader.addEventListener('load', () => this.setState({ preview: reader.result }));
        reader.readAsDataURL(file);
        handleUpload(file);
        return false;
    }
    onSelect(type) {
        this.setState({ type });
    }
    render() {
        if (!this.formRef)
            this.formRef = react_1.createRef();
        const { banner, submit, uploading, uploadPercentage } = this.props;
        const { preview, type } = this.state;
        const haveBanner = !!banner;
        return (<antd_1.Form {...layout} onFinish={submit && submit.bind(this)} onFinishFailed={() => antd_1.message.error('Please complete the required fields')} name="form-upload-banner" ref={this.formRef} validateMessages={validateMessages} initialValues={banner ||
                {
                    title: '',
                    description: '',
                    href: '',
                    status: 'active',
                    position: 'top',
                    type: 'img'
                }}>
        <antd_1.Form.Item name="title" rules={[{ required: true, message: 'Please input title of banner!' }]} label="Title">
          <antd_1.Input placeholder="Enter banner title"/>
        </antd_1.Form.Item>
        <antd_1.Form.Item name="position" label="Position" rules={[{ required: true, message: 'Please select position!' }]}>
          <antd_1.Select>
            <antd_1.Select.Option key="top" value="top">
              Top
            </antd_1.Select.Option>
            <antd_1.Select.Option key="bottom" value="bottom">
              Bottom
            </antd_1.Select.Option>
            {/* <Select.Option key="left" value="left">
              Left
            </Select.Option> */}
            <antd_1.Select.Option key="right" value="right">
              Right
            </antd_1.Select.Option>
            {/* <Select.Option key="middle" value="middle">
              Middle
            </Select.Option> */}
          </antd_1.Select>
        </antd_1.Form.Item>
        <antd_1.Form.Item name="href" label="Link"><antd_1.Input type="url" placeholder="Enter banner link"/></antd_1.Form.Item>
        <antd_1.Form.Item name="description" label="Description">
          <antd_1.Input.TextArea rows={3}/>
        </antd_1.Form.Item>
        <antd_1.Form.Item name="status" label="Status" rules={[{ required: true, message: 'Please select status!' }]}>
          <antd_1.Select>
            <antd_1.Select.Option key="active" value="active">
              Active
            </antd_1.Select.Option>
            <antd_1.Select.Option key="inactive" value="inactive">
              Inactive
            </antd_1.Select.Option>
          </antd_1.Select>
        </antd_1.Form.Item>
        <antd_1.Form.Item name="type" label="Type" rules={[{ required: true, message: 'Please select type for banner!' }]}>
          <antd_1.Select onSelect={this.onSelect.bind(this)}>
            <antd_1.Select.Option key="img" value="img">
              Image
            </antd_1.Select.Option>
            <antd_1.Select.Option key="html" value="html">
              HTML
            </antd_1.Select.Option>
          </antd_1.Select>
        </antd_1.Form.Item>
        {type == 'html' && (<antd_1.Form.Item name="contentHTML" label="HTML">
            <TextArea_1.default rows={3}/>
          </antd_1.Form.Item>)}
        <>
          {type == 'img' && (<div key="thumbnail" className="ant-row ant-form-item">
              <div className="ant-col ant-col-4 ant-form-item-label">
                <label>Banner </label>
              </div>
              <div className="ant-col ant-col-16 ant-form-item-control">
                <p>Ratio dimension 4:1 (eg: 1600px:400px)</p>
                {!haveBanner ? (<>
                    <antd_1.Upload accept={'image/*'} multiple={false} showUploadList={false} disabled={uploading || haveBanner} beforeUpload={(file) => this.beforeUpload(file)}>
                      {preview ? (<img src={preview} alt="file" style={{ width: '250px', marginBottom: '10px' }}/>) : null}
                      <div style={{ clear: 'both' }}/>
                      {!haveBanner && (<antd_1.Button>
                          <icons_1.UploadOutlined /> Select File
                        </antd_1.Button>)}
                    </antd_1.Upload>
                    {uploadPercentage ? (<antd_1.Progress percent={uploadPercentage}/>) : null}
                  </>) : (<thumbnail_banner_1.ThumbnailBanner banner={banner} style={{ width: '250px' }}/>)}
                <div className="ant-form-item-explain">
                  <div>
                    Image must smaller than {env_1.default.maximumSizeUploadImage || 10} MB!
                </div>
                </div>
              </div>
            </div>)}
        </>
        <antd_1.Form.Item wrapperCol={Object.assign(Object.assign({}, layout.wrapperCol), { offset: 4 })}>
          <antd_1.Button type="primary" htmlType="submit" loading={uploading}>
            {haveBanner ? 'Update' : 'Upload'}
          </antd_1.Button>
        </antd_1.Form.Item>
      </antd_1.Form>);
    }
}
exports.FormUploadBanner = FormUploadBanner;
