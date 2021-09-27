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
const head_1 = __importDefault(require("next/head"));
const antd_1 = require("antd");
const page_header_1 = __importDefault(require("@components/common/layout/page-header"));
const react_redux_1 = require("react-redux");
const actions_1 = require("@redux/performer/actions");
const utils_1 = require("@lib/utils");
const router_1 = __importDefault(require("next/router"));
const gallery_dashboard_grid_1 = __importDefault(require("@components/galleries/gallery-dashboard-grid"));
require("./index.less");
const services_1 = require("src/services");
class PerformerPhotoPage extends react_1.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            limit: 12,
            offset: 0
        };
    }
    componentDidMount() {
        this.loadGalleries();
    }
    async onRemove(id) {
        const { removeMyGalleries: dispatchRemoveMyGalleries } = this.props;
        try {
            await services_1.galleryService.remove(id);
            antd_1.message.success('Removed!');
            dispatchRemoveMyGalleries(id);
        }
        catch (e) {
            this.showError(e);
        }
    }
    loadGalleries() {
        const { getMyGalleries: dispatchGetMyGalleries } = this.props;
        dispatchGetMyGalleries(Object.assign({}, this.state));
    }
    async addGalleries() {
        const { addMyGalleries: dispatchAddMyGalleries } = this.props;
        try {
            const { limit } = this.state;
            let { offset } = this.state;
            offset = limit + offset;
            const resp = await services_1.photoService.myPhotos(Object.assign(Object.assign({}, this.state), { offset }));
            dispatchAddMyGalleries(resp.data.data);
            this.setState({ offset });
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
        const { data, searching, total, success } = this.props;
        const galleriesGridProps = {
            data,
            searching,
            success,
            total,
            hasMore: !searching && data.length < total,
            addGalleries: this.addGalleries.bind(this),
            remove: this.onRemove.bind(this),
            title: ''
        };
        return (<>
        <head_1.default>
          <title>My Galleries</title>
        </head_1.default>
        <div className="performer-gallries-page">
          <page_header_1.default title="Galleries" extra={(<antd_1.Space>
                <antd_1.Button type="primary" onClick={() => router_1.default.push('/account/performer/galleries/add')}>
                  Add a new photo gallery
                </antd_1.Button>
                <antd_1.Button type="primary" onClick={() => router_1.default.push('/account/performer/photos/add')}>
                  Add a new photo
                </antd_1.Button>
              </antd_1.Space>)}/>
          <gallery_dashboard_grid_1.default {...galleriesGridProps}/>
        </div>
      </>);
    }
}
PerformerPhotoPage.authenticate = true;
PerformerPhotoPage.layout = 'primary';
const mapStateToProps = (state) => (Object.assign({}, state.performer.assets.galleries));
const mapDispatchs = {
    getMyPhotos: actions_1.getMyPhotos,
    removeMyPhoto: actions_1.removeMyPhoto,
    addMyPhotos: actions_1.addMyPhotos,
    getMyGalleries: actions_1.getMyGalleries,
    removeMyGalleries: actions_1.removeMyGalleries,
    addMyGalleries: actions_1.addMyGalleries
};
exports.default = react_redux_1.connect(mapStateToProps, mapDispatchs)(PerformerPhotoPage);
