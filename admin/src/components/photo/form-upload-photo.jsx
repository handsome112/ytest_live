"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FormUploadPhoto = void 0;
const react_1 = require("react");
const antd_1 = require("antd");
const icons_1 = require("@ant-design/icons");
const select_performer_dropdown_1 = require("@components/performer/common/select-performer-dropdown");
const thumbnail_photo_1 = require("@components/photo/thumbnail-photo");
const select_gallery_dropdown_1 = require("@components/gallery/common/select-gallery-dropdown");
const gallery_service_1 = require("@services/gallery.service");
const env_1 = __importDefault(require("../../env"));
const layout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 16 }
};
const validateMessages = {
    required: 'This field is required!'
};
class FormUploadPhoto extends react_1.PureComponent {
    constructor() {
        super(...arguments);
        this.state = {
            preview: null,
            galleries: []
        };
    }
    componentDidMount() {
        if (!this.formRef)
            this.formRef = react_1.createRef();
        const { photo } = this.props;
        const pId = (photo && photo.performerId) || this.props.performerId || '';
        if (pId) {
            this.findGalleries(pId);
        }
    }
    async findGalleries(performerId) {
        const resp = await gallery_service_1.galleryService.search({
            performerId: performerId,
            limit: 1000
        });
        this.setState({ galleries: resp.data.data || [] });
    }
    setFormVal(field, val) {
        const instance = this.formRef.current;
        instance.setFieldsValue({
            [field]: val
        });
        if (field === 'performerId') {
            this.findGalleries(val);
        }
    }
    beforeUpload(file) {
        const ext = file.name.split('.').pop().toLowerCase();
        const isImageAccept = env_1.default.imageAccept
            .split(',')
            .map((item) => item.trim())
            .indexOf(`.${ext}`);
        if (isImageAccept === -1) {
            antd_1.message.error(`You can only upload ${env_1.default.imageAccept} file!`);
            return false;
        }
        const isLt2M = file.size / 1024 / 1024 < (env_1.default.maximumSizeUploadImage || 2);
        if (!isLt2M) {
            antd_1.message.error(`Image must smaller than ${env_1.default.maximumSizeUploadImage || 2}MB!`);
            return false;
        }
        const reader = new FileReader();
        reader.addEventListener('load', () => this.setState({ preview: reader.result }));
        reader.readAsDataURL(file);
        this.props.beforeUpload(file);
        return false;
    }
    render() {
        if (!this.formRef)
            this.formRef = react_1.createRef();
        const { photo, submit, uploading, uploadPercentage, galleryId } = this.props;
        const { preview } = this.state;
        const havePhoto = photo ? true : false;
        return (<antd_1.Form {...layout} onFinish={submit && submit.bind(this)} onFinishFailed={() => antd_1.message.error('Please complete the required fields')} name="form-upload" ref={this.formRef} validateMessages={validateMessages} initialValues={photo
                ? photo
                : {
                    title: '',
                    description: '',
                    status: 'draft',
                    performerId: this.props.performerId || '',
                    galleryId: this.props.galleryId || ''
                }}>
        <antd_1.Form.Item name="performerId" label="Performer" rules={[{ required: true }]}>
          <select_performer_dropdown_1.SelectPerformerDropdown disabled={havePhoto} defaultValue={(photo && photo.performerId) || this.props.performerId || ''} onSelect={(val) => this.setFormVal('performerId', val)}/>
        </antd_1.Form.Item>
        <antd_1.Form.Item name="galleryId" label="Gallery" rules={[{ required: true, message: 'Please select a gallery' }]}>
          <select_gallery_dropdown_1.SelectGalleryDropdown galleries={this.state.galleries} disabled={this.state.galleries.length <= 0} defaultValue={photo && photo.galleryId
                ? photo.galleryId
                : galleryId
                    ? galleryId
                    : null} onSelect={(val) => this.setFormVal('galleryId', val)}/>
        </antd_1.Form.Item>
        <antd_1.Form.Item name="title" rules={[{ required: true, message: 'Please input title of photo!' }]} label="Title">
          <antd_1.Input placeholder="Enter photo title"/>
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
        <react_1.Fragment>
          <div key="thumbnail" className="ant-row ant-form-item">
            <div className="ant-col ant-col-4 ant-form-item-label">
              <label>Photo</label>
            </div>
            <div className="ant-col ant-col-16 ant-form-item-control">
              {!havePhoto ? (<react_1.Fragment>
                  <antd_1.Upload accept={env_1.default.imageAccept || 'image/*'} multiple={false} showUploadList={false} disabled={uploading || havePhoto} beforeUpload={(file) => this.beforeUpload(file)}>
                    {preview ? (<img src={preview} alt="file" style={{ width: '250px', marginBottom: '10px' }}/>) : null}
                    <div style={{ clear: 'both' }}></div>
                    {!havePhoto && (<antd_1.Button>
                        <icons_1.UploadOutlined /> Select File
                      </antd_1.Button>)}
                  </antd_1.Upload>
                  {uploadPercentage ? (<antd_1.Progress percent={uploadPercentage}/>) : null}
                </react_1.Fragment>) : (<thumbnail_photo_1.ThumbnailPhoto photo={photo} style={{ width: '250px' }}/>)}
              <div className="ant-form-item-explain">
                <div>
                  Image must smaller than {env_1.default.maximumSizeUploadImage || 2}
                  MB! Only accept {env_1.default.imageAccept}.
                </div>
              </div>
            </div>
          </div>
        </react_1.Fragment>
        <antd_1.Form.Item wrapperCol={Object.assign(Object.assign({}, layout.wrapperCol), { offset: 4 })}>
          <antd_1.Button type="primary" htmlType="submit" loading={uploading}>
            {havePhoto ? 'Update' : 'Upload'}
          </antd_1.Button>
        </antd_1.Form.Item>
      </antd_1.Form>);
    }
}
exports.FormUploadPhoto = FormUploadPhoto;
