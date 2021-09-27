"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const head_1 = __importDefault(require("next/head"));
const react_1 = require("react");
const antd_1 = require("antd");
const page_1 = __importDefault(require("@components/common/layout/page"));
const photo_service_1 = require("@services/photo.service");
const common_1 = require("@components/common");
const form_upload_photo_1 = require("@components/photo/form-upload-photo");
const router_1 = __importDefault(require("next/router"));
class UploadPhoto extends react_1.PureComponent {
    constructor() {
        super(...arguments);
        this.state = {
            uploading: false,
            preview: null,
            uploadPercentage: 0
        };
    }
    static async getInitialProps({ ctx }) {
        return ctx.query;
    }
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
    beforeUpload(file) {
        const reader = new FileReader();
        reader.addEventListener('load', () => this.setState({
            preview: reader.result
        }));
        reader.readAsDataURL(file);
        this._photo = file;
        return false;
    }
    onUploading(resp) {
        this.setState({ uploadPercentage: resp.percentage });
    }
    async submit(data) {
        if (!this._photo) {
            return antd_1.message.error('Please select photo!');
        }
        await this.setState({
            uploading: true
        });
        try {
            const resp = (await photo_service_1.photoService.uploadPhoto(this._photo, data, this.onUploading.bind(this)));
            antd_1.message.success('Photo has been uploaded');
            // TODO - process for response data?
            await this.setState({
                uploading: false
            }, () => window.setTimeout(() => {
                router_1.default.push({
                    pathname: '/photos/update',
                    query: {
                        id: resp.data._id
                    }
                }, `/photos/update?id=${resp.data._id}`, {
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
        if (!this.formRef)
            this.formRef = react_1.createRef();
        const { uploading } = this.state;
        return (<react_1.Fragment>
        <head_1.default>
          <title>Upload photo</title>
        </head_1.default>
        <common_1.BreadcrumbComponent breadcrumbs={[
                { title: 'Photos', href: '/photos' },
                { title: 'Upload new photo' }
            ]}/>
        <page_1.default>
          <form_upload_photo_1.FormUploadPhoto submit={this.submit.bind(this)} beforeUpload={this.beforeUpload.bind(this)} uploading={uploading} uploadPercentage={this.state.uploadPercentage} galleryId={this.props.galleryId || ''} performerId={this.props.performerId || ''}/>
        </page_1.default>
      </react_1.Fragment>);
    }
}
exports.default = UploadPhoto;
