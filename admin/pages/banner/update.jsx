"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const head_1 = __importDefault(require("next/head"));
const react_1 = require("react");
const page_1 = __importDefault(require("@components/common/layout/page"));
const antd_1 = require("antd");
const banner_service_1 = require("@services/banner.service");
const loader_1 = __importDefault(require("@components/common/base/loader"));
const common_1 = require("@components/common");
const form_upload_banner_1 = require("@components/banner/form-upload-banner");
class BannerUpdate extends react_1.PureComponent {
    constructor() {
        super(...arguments);
        this.state = {
            submitting: false,
            fetching: true,
            banner: {}
        };
    }
    static async getInitialProps({ ctx }) {
        return ctx.query;
    }
    async componentDidMount() {
        const { id } = this.props;
        try {
            const resp = await banner_service_1.bannerService.findById(id);
            this.setState({ banner: resp.data });
        }
        catch (e) {
            antd_1.message.error('No data found!');
        }
        finally {
            this.setState({ fetching: false });
        }
    }
    async submit(data) {
        const { id } = this.props;
        try {
            this.setState({ submitting: true });
            const submitData = Object.assign({}, data);
            await banner_service_1.bannerService.update(id, submitData);
            antd_1.message.success('Updated successfully');
            this.setState({ submitting: false });
        }
        catch (e) {
            // TODO - check and show error here
            antd_1.message.error('Something went wrong, please try again!');
            this.setState({ submitting: false });
        }
    }
    render() {
        const { banner, submitting, fetching } = this.state;
        return (<>
        <head_1.default>
          <title>Update Banner</title>
        </head_1.default>
        <common_1.BreadcrumbComponent breadcrumbs={[
                { title: 'Banners', href: '/banner' },
                { title: banner.title ? banner.title : 'Detail banner' },
                { title: 'Update' }
            ]}/>
        <page_1.default>
          {fetching ? (<loader_1.default />) : (<form_upload_banner_1.FormUploadBanner banner={banner} submit={this.submit.bind(this)} uploading={submitting}/>)}
        </page_1.default>
      </>);
    }
}
exports.default = BannerUpdate;
