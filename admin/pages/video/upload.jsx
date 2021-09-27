"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const head_1 = __importDefault(require("next/head"));
const react_1 = require("react");
const antd_1 = require("antd");
const page_1 = __importDefault(require("@components/common/layout/page"));
const video_service_1 = require("@services/video.service");
const router_1 = __importDefault(require("next/router"));
const common_1 = require("@components/common");
const form_upload_video_1 = require("@components/video/form-upload-video");
class UploadVideo extends react_1.PureComponent {
    constructor() {
        super(...arguments);
        this.state = {
            uploading: false,
            preview: null,
            uploadPercentage: 0
        };
        this._files = {
            thumbnail: null,
            video: null
        };
    }
    beforeUpload(file, field) {
        this._files[field] = file;
    }
    onUploading(resp) {
        this.setState({ uploadPercentage: resp.percentage });
    }
    async submit(data) {
        if (!this._files['video']) {
            return antd_1.message.error('Please select video!');
        }
        const files = Object.keys(this._files).reduce((files, key) => {
            if (this._files[key]) {
                files.push({
                    fieldname: key,
                    file: this._files[key] || null
                });
            }
            return files;
        }, []);
        await this.setState({
            uploading: true
        });
        try {
            const resp = (await video_service_1.videoService.uploadVideo(files, data, this.onUploading.bind(this)));
            antd_1.message.success('Video has been uploaded');
            // TODO - process for response data?
            await this.setState({
                uploading: false
            }, () => window.setTimeout(() => {
                router_1.default.push({
                    pathname: '/video/update',
                    query: {
                        id: resp.data._id
                    }
                }, `/video/update?id=${resp.data._id}`, {
                    shallow: true
                });
            }, 1000));
        }
        catch (error) {
            antd_1.message.error('An error occurred, please try again!');
            await this.setState({
                uploading: false
            });
        }
    }
    render() {
        const { uploading, uploadPercentage } = this.state;
        return (<react_1.Fragment>
        <head_1.default>
          <title>Upload video</title>
        </head_1.default>
        <common_1.BreadcrumbComponent breadcrumbs={[
                { title: 'Video', href: '/video' },
                { title: 'Upload new video' }
            ]}/>
        <page_1.default>
          <form_upload_video_1.FormUploadVideo submit={this.submit.bind(this)} beforeUpload={this.beforeUpload.bind(this)} uploading={uploading} uploadPercentage={uploadPercentage}/>
        </page_1.default>
      </react_1.Fragment>);
    }
}
exports.default = UploadVideo;
