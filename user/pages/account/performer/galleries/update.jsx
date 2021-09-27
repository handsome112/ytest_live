"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importStar(require("react"));
const antd_1 = require("antd");
const page_header_1 = __importDefault(require("@components/common/layout/page-header"));
const head_1 = __importDefault(require("next/head"));
const react_redux_1 = require("react-redux");
const gallery_form_1 = __importDefault(require("@components/photos/gallery-form"));
const services_1 = require("src/services");
const utils_1 = require("@lib/utils");
const next_cookies_1 = __importDefault(require("next-cookies"));
const _error_1 = __importDefault(require("../../../_error"));
require("./index.less");
class UpdatePerformerGalleryPage extends react_1.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            onSubmit: false
        };
    }
    static async getInitialProps({ ctx }) {
        try {
            const { query: { data, id } } = ctx;
            if (process.browser && data) {
                return {
                    gallery: JSON.parse(data)
                };
            }
            const { token } = next_cookies_1.default(ctx);
            const resp = await services_1.galleryService.details(id, {
                Authorization: token
            });
            return {
                gallery: resp.data
            };
        }
        catch (_a) {
            return {};
        }
    }
    async onFinish(data) {
        const { performer, gallery } = this.props;
        try {
            this.setState({ onSubmit: true });
            await services_1.galleryService.update(gallery._id, Object.assign(Object.assign({}, data), { performerId: performer._id }));
            antd_1.message.success('Update gallery success.');
        }
        catch (e) {
            this.showError(e);
        }
        finally {
            this.setState({ onSubmit: false });
        }
    }
    async remove(id) {
        try {
            await services_1.photoService.remove(id);
            antd_1.message.success('Removed!');
        }
        catch (e) {
            this.showError(e);
        }
    }
    async showError(e) {
        const err = await Promise.resolve(e);
        antd_1.message.error(utils_1.getResponseError(err));
    }
    render() {
        const { gallery, performer } = this.props;
        if (!gallery)
            return <_error_1.default statusCode={404}/>;
        const { onSubmit } = this.state;
        return (<>
        <head_1.default>
          <title>
            Update Gallery
            {' '}
            {gallery && gallery.name}
          </title>
        </head_1.default>
        <div className="performer-gallries-page">
          <page_header_1.default title="Update a Gallery"/>
          <gallery_form_1.default loading={onSubmit} performer={performer} onFinish={this.onFinish.bind(this)} gallery={gallery} remove={this.remove.bind(this)}/>
        </div>
      </>);
    }
}
UpdatePerformerGalleryPage.authenticate = true;
UpdatePerformerGalleryPage.layout = 'primary';
const mapStateToProps = (state) => ({
    performer: state.performer.current
});
exports.default = react_redux_1.connect(mapStateToProps)(UpdatePerformerGalleryPage);
