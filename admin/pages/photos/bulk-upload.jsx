"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const head_1 = __importDefault(require("next/head"));
const react_1 = require("react");
const antd_1 = require("antd");
const page_1 = __importDefault(require("@components/common/layout/page"));
const select_performer_dropdown_1 = require("@components/performer/common/select-performer-dropdown");
const icons_1 = require("@ant-design/icons");
const photo_service_1 = require("@services/photo.service");
const upload_list_1 = __importDefault(require("@components/file/upload-list"));
const select_gallery_dropdown_1 = require("@components/gallery/common/select-gallery-dropdown");
const gallery_service_1 = require("@services/gallery.service");
const router_1 = __importDefault(require("next/router"));
const env_1 = __importDefault(require("src/env"));
const layout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 16 }
};
const validateMessages = {
    required: 'This field is required!'
};
const { Dragger } = antd_1.Upload;
class BulkUploadPhoto extends react_1.PureComponent {
    constructor() {
        super(...arguments);
        this.state = {
            uploading: false,
            preview: null,
            uploadPercentage: 0,
            fileList: [],
            galleries: []
        };
    }
    static async getInitialProps({ ctx }) {
        return ctx.query;
    }
    componentDidMount() {
        if (!this.formRef)
            this.formRef = react_1.createRef();
        if (!this.uploadRef)
            this.uploadRef = react_1.createRef();
        this.props.performerId && this.findGalleries(this.props.performerId);
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
        if (field === 'performerId')
            this.findGalleries(val);
    }
    async beforeUpload(file, fileList) {
        await Promise.all(fileList.map((file) => {
            const ext = file.name.split('.').pop().toLowerCase();
            const isImageAccept = env_1.default.imageAccept
                .split(',')
                .map((item) => item.trim())
                .indexOf(`.${ext}`);
            const isLt2M = file.size / 1024 / 1024 < (env_1.default.maximumSizeUploadImage || 2);
            if (isImageAccept === -1 || !isLt2M) {
                fileList.splice(fileList.findIndex((f) => f.uid === file.uid), 1);
            }
        }));
        await this.setState({ fileList });
        return false;
    }
    onUploading(file, resp) {
        this.setState({ uploadPercentage: resp.percentage });
        file.percent = resp.percentage;
        if (file.percent === 100)
            file.status = 'done';
        this.forceUpdate();
    }
    remove(file) {
        const fileList = this.state.fileList;
        fileList.splice(fileList.findIndex((f) => f.uid === file.uid), 1);
        this.setState({ fileList });
        this.forceUpdate();
    }
    async submit(data) {
        if (!this.state.fileList.length) {
            return antd_1.message.error('Please select photo!');
        }
        const uploadFiles = this.state.fileList.filter((f) => !['uploading', 'done'].includes(f.status));
        if (!uploadFiles.length)
            return antd_1.message.error('Please select new file!');
        await this.setState({ uploading: true });
        for (const file of uploadFiles) {
            try {
                if (['uploading', 'done'].includes(file.status))
                    continue;
                file.status = 'uploading';
                await photo_service_1.photoService.uploadPhoto(file, data, this.onUploading.bind(this, file));
            }
            catch (e) {
                file.status = 'error';
                antd_1.message.error(`File ${file.name} error!`);
            }
        }
        antd_1.message.success('Photos has been uploaded!');
        await this.setState({ uploading: false }, () => window.setTimeout(() => {
            router_1.default.push('/photos');
        }, 1000));
    }
    render() {
        if (!this.formRef)
            this.formRef = react_1.createRef();
        if (!this.uploadRef)
            this.uploadRef = react_1.createRef();
        const { uploading, fileList } = this.state;
        return (<react_1.Fragment>
        <head_1.default>
          <title>Upload photo</title>
        </head_1.default>
        <page_1.default>
          <antd_1.Form {...layout} onFinish={this.submit.bind(this)} validateMessages={validateMessages} ref={this.formRef} initialValues={{
                status: 'draft',
                token: 0,
                performerId: this.props.performerId || '',
                galleryId: this.props.galleryId || ''
            }}>
            <antd_1.Form.Item name="performerId" label="Performer" rules={[{ required: true }]}>
              <select_performer_dropdown_1.SelectPerformerDropdown onSelect={(val) => this.setFormVal('performerId', val)} disabled={uploading} defaultValue={this.props.performerId || ''}/>
            </antd_1.Form.Item>
            <antd_1.Form.Item name="galleryId" label="Gallery" rules={[{ required: true, message: 'Please select a gallery' }]}>
              <select_gallery_dropdown_1.SelectGalleryDropdown galleries={this.state.galleries} disabled={this.state.galleries.length <= 0} onSelect={(val) => this.setFormVal('galleryId', val)} defaultValue={this.props.galleryId || ''}/>
            </antd_1.Form.Item>
            {/* <Form.Item
              name="token"
              label="Default token"
              rules={[{ required: true }]}
            >
              <InputNumber disabled={uploading} />
            </Form.Item> */}
            <antd_1.Form.Item name="status" label="Default status" rules={[{ required: true }]}>
              <antd_1.Select disabled={uploading}>
                <antd_1.Select.Option value="draft">Draft</antd_1.Select.Option>
                <antd_1.Select.Option key="active" value="active">
                  Active
                </antd_1.Select.Option>
                <antd_1.Select.Option key="inactive" value="inactive">
                  Inactive
                </antd_1.Select.Option>
              </antd_1.Select>
            </antd_1.Form.Item>
            <antd_1.Row className="ant-form-item">
              <antd_1.Col span={4} className="ant-form-item-label">
                <label className="ant-form-item-required">Photos</label>
              </antd_1.Col>
              <antd_1.Col span={16}>
                <div>
                  <Dragger 
        // accept={env.imageAccept || 'image/*'}
        beforeUpload={this.beforeUpload.bind(this)} multiple={true} showUploadList={false} disabled={uploading} listType="picture">
                    <p className="ant-upload-drag-icon">
                      <icons_1.UploadOutlined />
                    </p>
                    <p className="ant-upload-text">
                      Click or drag file to this area to upload
                    </p>
                    <p className="ant-upload-hint">
                      Support image file only. Image must smaller than{' '}
                      {env_1.default.maximumSizeUploadImage || 2}
                      MB! Only accept {env_1.default.imageAccept}.
                    </p>
                  </Dragger>

                  <upload_list_1.default files={fileList} remove={this.remove.bind(this)}/>
                </div>
              </antd_1.Col>
            </antd_1.Row>

            <antd_1.Form.Item wrapperCol={Object.assign(Object.assign({}, layout.wrapperCol), { offset: 4 })}>
              <antd_1.Button type="primary" htmlType="submit" loading={uploading} disabled={uploading}>
                Upload
              </antd_1.Button>
            </antd_1.Form.Item>
          </antd_1.Form>
        </page_1.default>
      </react_1.Fragment>);
    }
}
exports.default = BulkUploadPhoto;
