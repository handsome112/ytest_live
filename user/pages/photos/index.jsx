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
/* eslint-disable no-return-assign */
const antd_1 = require("antd");
const page_header_1 = __importDefault(require("@components/common/layout/page-header"));
const head_1 = __importDefault(require("next/head"));
const react_1 = __importStar(require("react"));
const react_redux_1 = require("react-redux");
const actions_1 = require("@redux/photos/actions");
const actions_2 = require("@redux/user/actions");
const react_responsive_carousel_1 = require("react-responsive-carousel");
require("react-responsive-carousel/lib/styles/carousel.min.css");
const next_cookies_1 = __importDefault(require("next-cookies"));
const _error_1 = __importDefault(require("pages/_error"));
const lib_1 = require("src/lib");
const services_1 = require("src/services");
require("./index.less");
const modal_buy_assets_1 = __importDefault(require("@components/performer-assets/common/modal-buy-assets"));
const loader_1 = __importDefault(require("@components/common/base/loader"));
const numberformat_1 = __importDefault(require("@components/common/layout/numberformat"));
const ListItem = ({ description, title }) => (<antd_1.List.Item>
    <antd_1.Row style={{ width: '100%' }}>
      <antd_1.Col className="light-text" sm={{ span: 6 }} xs={{ span: 12 }}>
        {title}
      </antd_1.Col>
      <antd_1.Col style={{ fontWeight: 'bold' }} sm={{ span: 18 }} xs={{ span: 12 }}>
        {description}
      </antd_1.Col>
    </antd_1.Row>
  </antd_1.List.Item>);
class PhotosPages extends react_1.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            photos: [],
            limit: 12,
            offset: 0,
            totalPhoto: 0,
            selectedItem: 0,
            loading: false,
            success: true,
            searching: false,
            gallery: null
        };
    }
    static async getInitialProps({ ctx }) {
        try {
            const { query } = ctx;
            if (query.data)
                return { data: JSON.parse(query.data), isBrowser: process.browser };
            if (query.id) {
                const { token } = next_cookies_1.default(ctx);
                const headers = { Authorization: token };
                const resp = await services_1.galleryService.publicdetails(query.id, headers);
                return {
                    data: resp.data,
                    isBrowser: process.browser
                };
            }
        }
        catch (_a) {
            return {};
        }
        return {};
    }
    componentDidMount() {
        this.getPhotosByGallery();
        const { data, isBrowser } = this.props;
        isBrowser
            ? this.getGalleryDetail()
            : this.setState({ gallery: data, success: true, loading: false });
    }
    handleBuyClick() {
        const { data } = this.props;
        this.buyAssetsRef && this.buyAssetsRef.showModalBuyAssets(data, 'gallery');
    }
    onSucess() {
        this.getPhotosByGallery();
    }
    async getGalleryDetail() {
        const { data } = this.props;
        this.setState({ success: false, loading: true });
        try {
            const resp = await services_1.galleryService.publicdetails(data._id);
            this.setState({ gallery: resp.data, success: true });
        }
        catch (error) {
            this.responseError(error);
        }
        finally {
            this.setState({ loading: false });
        }
    }
    async getPhotosByGallery() {
        const { data } = this.props;
        const { limit, offset } = this.state;
        try {
            this.setState({ searching: true });
            const resp = await services_1.photoService.searchByGallery(data._id, {
                limit,
                offset
            });
            this.setState({
                photos: resp.data.data,
                totalPhoto: resp.data.total
            });
        }
        catch (error) {
            this.responseError(error);
        }
        finally {
            this.setState({ searching: false });
        }
    }
    async loadMore(index) {
        const { totalPhoto, photos, limit } = this.state;
        let { offset } = this.state;
        const { data } = this.props;
        const position = index + 1;
        if (position !== photos.length)
            return;
        const hasMore = photos.length < totalPhoto;
        if (hasMore) {
            try {
                offset = limit + offset;
                const resp = await services_1.photoService.searchByGallery(data._id, {
                    limit,
                    offset
                });
                this.setState({ photos: [...photos, ...resp.data.data], offset });
            }
            catch (error) {
                this.responseError(error);
            }
            finally {
                this.setState({ searching: false });
            }
        }
    }
    async responseError(e) {
        const err = await Promise.resolve(e);
        antd_1.message.error(lib_1.getResponseError(err));
    }
    render() {
        const { photos, selectedItem, success, loading, gallery, searching } = this.state;
        const { data } = this.props;
        if (!data)
            return <_error_1.default statusCode={404}/>;
        const { name, description, token, isSale, numOfItems } = data;
        const dataSource = [
            {
                title: 'Name',
                description: name
            },
            { title: 'Description', description },
            { title: 'Photos', description: numOfItems },
            { title: 'Price', description: !isSale ? 'Free' : <numberformat_1.default value={token} suffix=" tokens"/> }
        ];
        return (<>
        <head_1.default>
          <title> Photos </title>
        </head_1.default>
        <modal_buy_assets_1.default ref={(ref) => (this.buyAssetsRef = ref)} onSucess={this.onSucess.bind(this)} {...this.props}/>
        <div className="photo-page">
          <page_header_1.default title={`${lib_1.capitalizeFirstLetter(name)} Gallery`} extra={(<antd_1.Button type="primary" hidden={gallery === null || gallery === void 0 ? void 0 : gallery.isBought} onClick={this.handleBuyClick.bind(this)}>
                Buy this gallery!
              </antd_1.Button>)}/>
          {success && !loading && (<div className="photo-carousel-content">
              {searching && (<loader_1.default spinning fullScreen={false}/>)}
              <react_responsive_carousel_1.Carousel dynamicHeight onClickItem={(index) => this.setState({ selectedItem: index + 1 })} selectedItem={selectedItem} onChange={this.loadMore.bind(this)} showIndicators swipeable>
                {photos.length > 0
                    && photos.map((p) => (<div key={p._id}>
                    <img alt="" src={p.photo.url} style={{ objectFit: 'contain' }}/>
                    <p className="legend">{p.title}</p>
                  </div>))}
              </react_responsive_carousel_1.Carousel>
              <antd_1.List dataSource={dataSource} renderItem={(item) => (<ListItem description={item.description} title={item.title}/>)}/>
            </div>)}

        </div>
      </>);
    }
}
PhotosPages.authenticate = false;
PhotosPages.layout = 'public';
const mapStates = (state) => ({
    photos: state.photos.data,
    total: state.photos.total,
    searching: state.photos.searching,
    success: state.photos.success,
    loggedIn: state.auth.loggedIn
});
const mapDispatchs = { getPerformerPhotos: actions_1.getPerformerPhotos, updateCurrentUserBalance: actions_2.updateCurrentUserBalance };
exports.default = react_redux_1.connect(mapStates, mapDispatchs)(PhotosPages);
