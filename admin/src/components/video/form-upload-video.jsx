"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FormUploadVideo = void 0;
const react_1 = require("react");
const antd_1 = require("antd");
const icons_1 = require("@ant-design/icons");
const select_performer_dropdown_1 = require("@components/performer/common/select-performer-dropdown");
const thumbnail_video_1 = require("@components/video/thumbnail-video");
const env_1 = __importDefault(require("../../env"));
const layout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 16 }
};
const validateMessages = {
    required: 'This field is required!'
};
class FormUploadVideo extends react_1.PureComponent {
    constructor() {
        super(...arguments);
        this.state = {
            previewThumbnail: null,
            previewVideo: null,
            isSale: false
        };
    }
    componentDidMount() {
        if (!this.formRef)
            this.formRef = react_1.createRef();
        const { video } = this.props;
        if (video) {
            this.setState({
                previewThumbnail: video.thumbnail ? video.thumbnail : null,
                previewVideo: video.video && video.video.url ? video.video.url : null,
                isSale: !!video.isSaleVideo
            }, () => {
                if (this.state.previewVideo) {
                    const video = document.getElementById('video');
                    video.setAttribute('src', this.state.previewVideo);
                }
            });
        }
    }
    setFormVal(field, val) {
        const instance = this.formRef.current;
        instance.setFieldsValue({
            [field]: val
        });
    }
    beforeUpload(file, field) {
        const reader = new FileReader();
        reader.addEventListener('load', () => this.setState(field === 'thumbnail'
            ? {
                previewThumbnail: reader.result
            }
            : {
                previewVideo: reader.result
            }, () => {
            if (field === 'video') {
                const video = document.getElementById('video');
                video.setAttribute('src', reader.result.toString());
            }
        }));
        reader.readAsDataURL(file);
        this.props.beforeUpload(file, field);
        return false;
    }
    render() {
        if (!this.formRef)
            this.formRef = react_1.createRef();
        const { video, submit, uploading, uploadPercentage } = this.props;
        const { previewThumbnail, previewVideo, isSale } = this.state;
        const haveVideo = video ? true : false;
        return (<antd_1.Form {...layout} onFinish={submit && submit.bind(this)} onFinishFailed={() => antd_1.message.error('Please complete the required fields')} name="form-upload" ref={this.formRef} validateMessages={validateMessages} initialValues={video
                ? video
                : {
                    title: '',
                    token: 0,
                    description: '',
                    status: 'draft',
                    performerId: '',
                    isSaleVideo: video === null || video === void 0 ? void 0 : video.isSaleVideo
                }}>
        <antd_1.Form.Item name="performerId" label="Performer" rules={[{ required: true }]}>
          <select_performer_dropdown_1.SelectPerformerDropdown disabled={haveVideo} defaultValue={video && video.performerId} onSelect={(val) => this.setFormVal('performerId', val)}/>
        </antd_1.Form.Item>
        <antd_1.Form.Item name="title" rules={[{ required: true, message: 'Please input title of video!' }]} label="Title">
          <antd_1.Input placeholder="Enter video title"/>
        </antd_1.Form.Item>
        <antd_1.Form.Item name="isSaleVideo" label="Is Sale?">
          <antd_1.Switch defaultChecked={video === null || video === void 0 ? void 0 : video.isSaleVideo} onChange={(checked) => {
                this.setFormVal('isSaleVideo', checked);
                this.setState({ isSale: checked });
            }}/>
        </antd_1.Form.Item>
        <antd_1.Form.Item name="token" label="Token">
          <antd_1.InputNumber disabled={!isSale}/>
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
              <label>Thumbnail</label>
            </div>
            <div className="ant-col ant-col-16 ant-form-item-control">
              {!haveVideo ? (<antd_1.Upload accept={env_1.default.imageAccept || 'image/*'} multiple={false} showUploadList={false} disabled={uploading || haveVideo} beforeUpload={(file) => this.beforeUpload(file, 'thumbnail')}>
                  {previewThumbnail ? (<img src={previewThumbnail} alt="file" style={{ width: '250px', marginBottom: '10px' }}/>) : null}
                  <div style={{ clear: 'both' }}></div>
                  {!haveVideo && (<antd_1.Button>
                      <icons_1.UploadOutlined /> Select File
                    </antd_1.Button>)}
                </antd_1.Upload>) : (<thumbnail_video_1.ThumbnailVideo video={video} style={{ width: '250px' }}/>)}
              <div className="ant-form-item-explain">
                <div>
                  Image must smaller than {env_1.default.maximumSizeUploadImage || 2}
                  MB! Only accept {env_1.default.imageAccept}.
                </div>
              </div>
            </div>
          </div>
          <div key="video" className="ant-row ant-form-item">
            <div className="ant-col ant-col-4 ant-form-item-label">
              <label>Video</label>
            </div>
            <div className="ant-col ant-col-16 ant-form-item-control">
              <antd_1.Upload accept={env_1.default.videoAccept || 'video/*,.mkv'} multiple={false} showUploadList={false} disabled={uploading || haveVideo} beforeUpload={(file) => this.beforeUpload(file, 'video')}>
                {previewVideo ? (<video controls id="video" style={{ width: '250px', marginBottom: '10px' }}/>) : null}
                <div style={{ clear: 'both' }}></div>
                {!haveVideo && (<antd_1.Button>
                    <icons_1.UploadOutlined /> Select File
                  </antd_1.Button>)}
              </antd_1.Upload>
              {uploadPercentage ? (<antd_1.Progress percent={uploadPercentage}/>) : null}
              <div className="ant-form-item-explain">
                <div>
                  Video must smaller than {env_1.default.maximumSizeUploadVideo || 20}
                  MB! Only accept {env_1.default.videoAccept}.
                </div>
              </div>
            </div>
          </div>
        </react_1.Fragment>
        <antd_1.Form.Item wrapperCol={Object.assign(Object.assign({}, layout.wrapperCol), { offset: 4 })}>
          <antd_1.Button type="primary" htmlType="submit" loading={uploading}>
            {haveVideo ? 'Update' : 'Upload'}
          </antd_1.Button>
        </antd_1.Form.Item>
      </antd_1.Form>);
    }
}
exports.FormUploadVideo = FormUploadVideo;
