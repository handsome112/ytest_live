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
const photo_dashboard_grid_1 = __importDefault(require("@components/photos/photo-dashboard-grid"));
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
        this.loadPhotos();
    }
    async onRemove(id) {
        const { removeMyPhoto: dispatchRemoveMyPhoto } = this.props;
        try {
            await services_1.photoService.remove(id);
            antd_1.message.success('Removed!');
            dispatchRemoveMyPhoto(id);
        }
        catch (e) {
            this.showError(e);
        }
    }
    async addPhotos() {
        const { addMyPhotos: dispatchAddMyPhotos } = this.props;
        try {
            const { limit } = this.state;
            let { offset } = this.state;
            offset = limit + offset;
            const resp = await services_1.photoService.myPhotos(Object.assign(Object.assign({}, this.state), { offset }));
            dispatchAddMyPhotos(resp.data.data);
            this.setState({ offset });
        }
        catch (e) {
            this.showError(e);
        }
    }
    loadPhotos() {
        const { getMyPhotos: dispatchGetMyPhotos } = this.props;
        dispatchGetMyPhotos(Object.assign({}, this.state));
    }
    async showError(e) {
        const err = await Promise.resolve(e);
        antd_1.message.error(utils_1.getResponseError(err));
    }
    render() {
        const { data, searching, total, success } = this.props;
        const photoGridProps = {
            data,
            searching,
            success,
            total,
            hasMore: !searching && data.length < total,
            addPhotos: this.addPhotos.bind(this),
            remove: this.onRemove.bind(this),
            title: ''
        };
        return (<>
        <head_1.default>
          <title>My Photos</title>
        </head_1.default>
        <div className="performer-photos-page">
          <page_header_1.default title="Photos" extra={(<antd_1.Space>
                <antd_1.Button type="primary" onClick={() => router_1.default.push('/account/performer/galleries/add')}>
                  Add a new gallery
                </antd_1.Button>
                <antd_1.Button type="primary" onClick={() => router_1.default.push('/account/performer/photos/add')}>
                  Add new photos
                </antd_1.Button>
              </antd_1.Space>)}/>
          <photo_dashboard_grid_1.default {...photoGridProps}/>
        </div>
      </>);
    }
}
PerformerPhotoPage.authenticate = true;
PerformerPhotoPage.layout = 'primary';
const mapStateToProps = (state) => (Object.assign({}, state.performer.assets.photos));
const mapDispatchs = { getMyPhotos: actions_1.getMyPhotos, removeMyPhoto: actions_1.removeMyPhoto, addMyPhotos: actions_1.addMyPhotos };
exports.default = react_redux_1.connect(mapStateToProps, mapDispatchs)(PerformerPhotoPage);
