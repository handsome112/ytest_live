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
const antd_1 = require("antd");
const page_header_1 = __importDefault(require("@components/common/layout/page-header"));
const head_1 = __importDefault(require("next/head"));
const react_1 = __importStar(require("react"));
const react_redux_1 = require("react-redux");
const actions_1 = require("src/redux/user/actions");
const favourite_performer_grid_1 = __importDefault(require("src/components/user/favourite-performer-grid"));
const services_1 = require("src/services");
require("./index.less");
const utils_1 = require("@lib/utils");
const loader_1 = __importDefault(require("@components/common/base/loader"));
class MyFavoutitePage extends react_1.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            query: {
                offset: 0,
                limit: 100
            }
        };
    }
    componentDidMount() {
        this.getData();
    }
    componentDidUpdate(_, prevStates) {
        const { query } = this.state;
        if (query !== prevStates.query) {
            this.getData();
        }
    }
    setFilter(name, value) {
        const { query } = this.state;
        this.setState({
            query: Object.assign(Object.assign({}, query), { [name]: value })
        });
    }
    async getData() {
        const { getFavoritePerformers: dispatchGetFavoritePerformers } = this.props;
        const { query } = this.state;
        try {
            dispatchGetFavoritePerformers(Object.assign({}, query));
        }
        catch (error) {
            const err = Promise.resolve(error);
            antd_1.message.error(utils_1.getResponseError(err));
        }
    }
    async dislike(performer) {
        const { _id } = performer;
        const { removeFavorite: dispatchRemoveFavorite } = this.props;
        try {
            await services_1.favouriteService.unlike(_id);
            dispatchRemoveFavorite(_id);
        }
        catch (error) {
            const e = Promise.resolve(error);
            antd_1.message.error(utils_1.getResponseError(e));
        }
    }
    render() {
        const { searching } = this.props;
        const { query } = this.state;
        return (<>
        <head_1.default>
          <title>My Favorite </title>
        </head_1.default>
        <div className="favorite-page">
          <page_header_1.default title="My Favorites"/>
          <loader_1.default spinning={searching}/>
          <favourite_performer_grid_1.default {...this.props} query={query} dislike={this.dislike.bind(this)} setFilter={this.setFilter.bind(this)}/>
        </div>
      </>);
    }
}
MyFavoutitePage.authenticate = true;
MyFavoutitePage.layout = 'primary';
const mapStateToProps = (state) => (Object.assign(Object.assign({}, state.user.favourites), { countries: state.settings.countries }));
const mapDispatchs = { getFavoritePerformers: actions_1.getFavoritePerformers, removeFavorite: actions_1.removeFavorite };
exports.default = react_redux_1.connect(mapStateToProps, mapDispatchs)(MyFavoutitePage);
