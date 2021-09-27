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
const router_1 = __importDefault(require("next/router"));
require("./index.less");
class CreatePerformerGalleryPage extends react_1.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            onSubmit: false
        };
    }
    async onFinish(data) {
        const { performer } = this.props;
        try {
            this.setState({ onSubmit: true });
            await services_1.galleryService.create(Object.assign(Object.assign({}, data), { performerId: performer._id, token: parseInt(data.token, 10) }));
            antd_1.message.success('Add gallery success.');
            router_1.default.back();
        }
        catch (e) {
            const err = await Promise.resolve(e);
            antd_1.message.error(utils_1.getResponseError(err));
        }
        finally {
            this.setState({ onSubmit: false });
        }
    }
    render() {
        const { onSubmit } = this.state;
        return (<>
        <head_1.default>
          <title>New Gallery</title>
        </head_1.default>
        <div className="performer-gallries-page">
          <page_header_1.default title="Create new Gallery"/>
          <gallery_form_1.default loading={onSubmit} onFinish={this.onFinish.bind(this)} gallery={{}}/>
        </div>
      </>);
    }
}
CreatePerformerGalleryPage.authenticate = true;
CreatePerformerGalleryPage.layout = 'primary';
const mapStateToProps = (state) => ({
    performer: state.performer.current
});
exports.default = react_redux_1.connect(mapStateToProps)(CreatePerformerGalleryPage);
