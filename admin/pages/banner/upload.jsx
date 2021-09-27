"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const head_1 = __importDefault(require("next/head"));
const react_1 = require("react");
const antd_1 = require("antd");
const page_1 = __importDefault(require("@components/common/layout/page"));
const banner_service_1 = require("@services/banner.service");
const common_1 = require("@components/common");
const form_upload_banner_1 = require("@components/banner/form-upload-banner");
const router_1 = __importDefault(require("next/router"));
class UploadBanner extends react_1.PureComponent {
    constructor() {
        super(...arguments);
        this.state = {
            uploading: false,
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
    onUploading(resp) {
        this.setState({ uploadPercentage: resp.percentage });
    }
    setFormVal(field, val) {
        const instance = this.formRef.current;
        instance.setFieldsValue({
            [field]: val
        });
    }
    beforeUpload(file) {
        this._banner = file;
        return false;
    }
    async submit(data) {
        if (data.type == 'img' && !this._banner) {
            return antd_1.message.error('Please select banner!');
        }
        await this.setState({
            uploading: true
        });
        try {
            if (data.type == 'img') {
                (await banner_service_1.bannerService.uploadBanner(this._banner, data, this.onUploading.bind(this)));
            }
            else if (data.type == 'html') {
                await banner_service_1.bannerService.create(data);
            }
            antd_1.message.success('Banner has been uploaded');
            // TODO - process for response data?
            await this.setState({
                uploading: false
            }, () => window.setTimeout(() => {
                router_1.default.push({
                    pathname: '/banner'
                }, '/banner');
            }, 1000));
        }
        catch (error) {
            antd_1.message.error('An error occurred, please try again!');
            await this.setState({
                uploading: false
            });
        }
        return undefined;
    }
    render() {
        if (!this.formRef)
            this.formRef = react_1.createRef();
        const { uploading, uploadPercentage } = this.state;
        return (<>
        <head_1.default>
          <title>Upload banner</title>
        </head_1.default>
        <common_1.BreadcrumbComponent breadcrumbs={[{ title: 'Banners', href: '/banner' }, { title: 'Upload new banner' }]}/>
        <page_1.default>
          <form_upload_banner_1.FormUploadBanner submit={this.submit.bind(this)} beforeUpload={this.beforeUpload.bind(this)} uploading={uploading} uploadPercentage={uploadPercentage}/>
        </page_1.default>
      </>);
    }
}
exports.default = UploadBanner;
