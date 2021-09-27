"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
const performer_grid_1 = __importDefault(require("@components/performer/performer-grid"));
const react_redux_1 = require("react-redux");
const actions_1 = require("@redux/performer/actions");
const actions_2 = require("@redux/auth/actions");
const actions_3 = require("@redux/user/actions");
const actions_4 = require("@redux/studio/actions");
const performer_filter_1 = __importDefault(require("@components/user/performer-filter"));
const services_1 = require("src/services");
const antd_1 = require("antd");
const lib_1 = require("src/lib");
const router_1 = require("next/router");
const socket_1 = require("src/socket");
const head_1 = __importDefault(require("next/head"));
const initQueryState = {
    offset: 0,
    limit: 60,
    gender: '',
    category: '',
    country: '',
    sortBy: '',
    sort: 'desc'
};
class Homepage extends react_1.PureComponent {
    constructor(props) {
        super(props);
        this.search = () => {
            const { router, searchPerformer: dispatchSearchPerformer } = this.props;
            const { query } = this.state;
            dispatchSearchPerformer(Object.assign(Object.assign({}, query), router.query));
        };
        this.state = {
            query: initQueryState
        };
    }
    componentDidMount() {
        this.search();
        this.socket = this.context;
        this.socket.on('modelUpdateStatus', this.search);
        this.socket.on('modelUpdateStreamingStatus', this.search);
    }
    componentDidUpdate(prevProps, prevStates) {
        const { router, loggedIn } = this.props;
        const { query } = this.state;
        if (router.query.q !== prevProps.router.query.q
            || query !== prevStates.query) {
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
        const { updatePerformerFavourite: dispatchUpdatePerformerFavorite } = this.props;
        const { _id, isFavorite } = performer;
        try {
            await services_1.favouriteService.favorite(_id, isFavorite);
            dispatchUpdatePerformerFavorite(_id);
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
    clearFilter() {
        this.setState({
            query: initQueryState
        });
    }
    render() {
        const { categories, countries, ui } = this.props;
        const { query } = this.state;
        return (<>
        <head_1.default>
          <title>{ui === null || ui === void 0 ? void 0 : ui.siteName}</title>
        </head_1.default>
        <div className="homepage">
          <performer_filter_1.default countries={countries} categories={categories} setFilter={this.setFilter.bind(this)} clearFilter={this.clearFilter.bind(this)} {...query}/>
          <performer_grid_1.default {...this.props} onLike={this.onLike.bind(this)} title="Live cams" isPage setFilter={this.setFilter.bind(this)} {...query}/>
        </div>
      </>);
    }
}
Homepage.layout = 'public';
Homepage.authenticate = false;
Homepage.contextType = socket_1.SocketContext;
const mapStateToProps = (state) => (Object.assign(Object.assign({ ui: Object.assign({}, state.ui) }, state.performer.performers), { countries: state.settings.countries, loggedIn: state.auth.loggedIn, categories: state.performer.categories.data }));
const mapDispatch = {
    searchPerformer: actions_1.searchPerformer,
    updatePerformerFavourite: actions_1.updatePerformerFavourite,
    updateCurrentUser: actions_3.updateCurrentUser,
    updateCurrentPerformer: actions_1.updateCurrentPerformer,
    updateCurrentStudio: actions_4.updateCurrentStudio,
    loginSuccess: actions_2.loginSuccess
};
exports.default = react_redux_1.connect(mapStateToProps, mapDispatch)(router_1.withRouter(Homepage));
