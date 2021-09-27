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
const form_gallery_1 = require("@components/gallery/form-gallery");
const common_1 = require("@components/common");
const router_1 = __importDefault(require("next/router"));
class GalleryCreate extends react_1.PureComponent {
    constructor() {
        super(...arguments);
        this.state = {
            submitting: false
        };
    }
    async submit(data) {
        try {
            this.setState({ submitting: true });
            const submitData = Object.assign({}, data);
            const resp = await gallery_service_1.galleryService.create(submitData);
            antd_1.message.success('Created successfully');
            router_1.default.push('/gallery');
        }
        catch (e) {
            // TODO - check and show error here
            antd_1.message.error('Something went wrong, please try again!');
            this.setState({ submitting: false });
        }
    }
    render() {
        return (<react_1.Fragment>
        <head_1.default>
          <title>Create new gallery</title>
        </head_1.default>
        <common_1.BreadcrumbComponent breadcrumbs={[
                { title: 'Galleries', href: '/gallery' },
                { title: 'Create new gallery' }
            ]}/>
        <page_1.default>
          <form_gallery_1.FormGallery onFinish={this.submit.bind(this)} submitting={this.state.submitting}/>
        </page_1.default>
      </react_1.Fragment>);
    }
}
exports.default = GalleryCreate;
