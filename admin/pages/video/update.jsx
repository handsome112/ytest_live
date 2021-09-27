"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const head_1 = __importDefault(require("next/head"));
const react_1 = require("react");
const page_1 = __importDefault(require("@components/common/layout/page"));
const antd_1 = require("antd");
const video_service_1 = require("@services/video.service");
const loader_1 = __importDefault(require("@components/common/base/loader"));
const common_1 = require("@components/common");
const form_upload_video_1 = require("@components/video/form-upload-video");
class VideoUpdate extends react_1.PureComponent {
    constructor() {
        super(...arguments);
        this.state = {
            submitting: false,
            fetching: true,
            video: {}
        };
    }
    static async getInitialProps({ ctx }) {
        return ctx.query;
    }
    async componentDidMount() {
        try {
            const resp = await video_service_1.videoService.findById(this.props.id);
            this.setState({ video: resp.data });
        }
        catch (e) {
            antd_1.message.error('Video not found!');
        }
        finally {
            this.setState({ fetching: false });
        }
    }
    async submit(data) {
        try {
            this.setState({ submitting: true });
            const submitData = Object.assign({}, data);
            await video_service_1.videoService.update(this.props.id, submitData);
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
        const { video, submitting, fetching } = this.state;
        return (<react_1.Fragment>
        <head_1.default>
          <title>Update Video</title>
        </head_1.default>
        <common_1.BreadcrumbComponent breadcrumbs={[
                { title: 'Video', href: '/video' },
                { title: video.title ? video.title : 'Detail video' }
            ]}/>
        <page_1.default>
          {fetching ? (<loader_1.default />) : (<form_upload_video_1.FormUploadVideo video={video} submit={this.submit.bind(this)} uploading={submitting}/>)}
        </page_1.default>
      </react_1.Fragment>);
    }
}
exports.default = VideoUpdate;
