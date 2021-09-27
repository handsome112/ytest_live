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
const react_redux_1 = require("react-redux");
const antd_1 = require("antd");
const page_header_1 = __importDefault(require("@components/common/layout/page-header"));
const perfomer_categories_service_1 = require("src/services/perfomer-categories.service");
const actions_1 = require("src/redux/ui/actions");
const head_1 = __importDefault(require("next/head"));
const performer_grid_1 = __importDefault(require("@components/performer/performer-grid"));
const actions_2 = require("@redux/performer/actions");
const services_1 = require("src/services");
const lib_1 = require("src/lib");
const socket_1 = require("src/socket");
const initQueryState = {
    offset: 0,
    limit: 60,
    gender: '',
    category: '',
    country: '',
    sortBy: '',
    sort: 'desc'
};
class PerformerCategoryPage extends react_1.PureComponent {
    constructor(props) {
        super(props);
        this.search = () => {
            const { searchPerformer: dispatchSearchPerformer, category } = this.props;
            const { query } = this.state;
            dispatchSearchPerformer(Object.assign(Object.assign({}, query), { category: category ? category._id : '' }));
        };
        this.state = {
            query: initQueryState
        };
    }
    static async getInitialProps({ ctx }) {
        try {
            if (process.browser && ctx.query.category) {
                return {
                    category: JSON.parse(ctx.query.category)
                };
            }
            if (!ctx.query.slug) {
                return {};
            }
            const resp = await perfomer_categories_service_1.performerCategories.details(ctx.query.slug);
            return {
                category: resp.data
            };
        }
        catch (err) {
            return {};
        }
    }
    componentDidMount() {
        this.search();
        this.socket = this.context;
        this.socket.on('modelUpdateStatus', this.search);
        this.socket.on('modelUpdateStreamingStatus', this.search);
    }
    componentDidUpdate(prevProps) {
        const { category, loggedIn } = this.props;
        if (category !== prevProps.category) {
            this.search();
        }
        if (!loggedIn && loggedIn !== prevProps.loggedIn) {
            this.search();
        }
    }
    componentWillUnmount() {
        this.socket = this.context;
        if (this.socket) {
            this.socket.off('modelUpdateStatus');
            this.socket.off('modelUpdateStreamingStatus');
        }
    }
    async onLike(performer) {
        const { _id, isFavorite } = performer;
        const { updatePerformerFavourite: dispatchUpdatePerformerFavourite } = this.props;
        try {
            await services_1.favouriteService.favorite(_id, isFavorite);
            dispatchUpdatePerformerFavourite(_id);
        }
        catch (error) {
            const e = await Promise.resolve(error);
            antd_1.message.error(lib_1.getResponseError(e));
        }
    }
    setFilter(name, value) {
        const { query } = this.state;
        this.setState({
            query: Object.assign(Object.assign({}, query), { [name]: value })
        });
    }
    render() {
        const { category, pluralTextModel } = this.props;
        const { query } = this.state;
        return (<>
        <head_1.default>
          <title>
            {category ? `Category - ${category.name}` : `All ${pluralTextModel || 'Performers'}`}
          </title>
        </head_1.default>
        <page_header_1.default title={category ? category.name : `All ${pluralTextModel || 'Performers'}`}/>
        <div className="">
          <performer_grid_1.default {...this.props} {...query} isPage setFilter={this.setFilter.bind(this)} onLike={this.onLike.bind(this)}/>
        </div>
      </>);
    }
}
PerformerCategoryPage.authenticate = false;
PerformerCategoryPage.layout = 'public';
PerformerCategoryPage.contextType = socket_1.SocketContext;
const mapStateToProps = (state) => (Object.assign(Object.assign({ loggedIn: state.auth.loggedIn }, state.performer.performers), state.ui));
const mapDispatch = { searchPerformer: actions_2.searchPerformer, updatePerformerFavourite: actions_2.updatePerformerFavourite, updateUIValue: actions_1.updateUIValue };
exports.default = react_redux_1.connect(mapStateToProps, mapDispatch)(PerformerCategoryPage);
