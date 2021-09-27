"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const head_1 = __importDefault(require("next/head"));
const react_1 = require("react");
const page_1 = __importDefault(require("@components/common/layout/page"));
const antd_1 = require("antd");
const gallery_service_1 = require("@services/gallery.service");
const loader_1 = __importDefault(require("@components/common/base/loader"));
const common_1 = require("@components/common");
const form_gallery_1 = require("@components/gallery/form-gallery");
const router_1 = __importDefault(require("next/router"));
class GalleryUpdate extends react_1.PureComponent {
    constructor() {
        super(...arguments);
        this.state = {
            submitting: false,
            fetching: true,
            gallery: {}
        };
    }
    static async getInitialProps({ ctx }) {
        return ctx.query;
    }
    async componentDidMount() {
        try {
            const resp = await gallery_service_1.galleryService.findById(this.props.id);
            this.setState({ gallery: resp.data });
        }
        catch (e) {
            antd_1.message.error('Gallery not found!');
        }
        finally {
            this.setState({ fetching: false });
        }
    }
    async submit(data) {
        try {
            this.setState({ submitting: true });
            const submitData = Object.assign({}, data);
            await gallery_service_1.galleryService.update(this.props.id, submitData);
            antd_1.message.success('Updated successfully');
            this.setState({ submitting: false });
        }
        catch (e) {
            // TODO - check and show error here
            antd_1.message.error('Something went wrong, please try again!');
            this.setState({ submitting: false });
        }
        router_1.default.push('/gallery');
    }
    render() {
        const { gallery, submitting, fetching } = this.state;
        return (<react_1.Fragment>
        <head_1.default>
          <title>Update Gallery</title>
        </head_1.default>
        <common_1.BreadcrumbComponent breadcrumbs={[
                { title: 'Gallery', href: '/gallery' },
                { title: gallery.name ? gallery.name : 'Detail gallery' }
            ]}/>
        <page_1.default>
          {fetching ? (<loader_1.default />) : (<form_gallery_1.FormGallery gallery={gallery} onFinish={this.submit.bind(this)} submitting={submitting}/>)}
        </page_1.default>
      </react_1.Fragment>);
    }
}
exports.default = GalleryUpdate;
