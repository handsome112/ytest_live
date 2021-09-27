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
const router_1 = __importStar(require("next/router"));
const react_redux_1 = require("react-redux");
const performer_grid_1 = __importDefault(require("@components/performer/performer-grid"));
const actions_1 = require("@redux/performer/actions");
const _error_1 = __importDefault(require("pages/_error"));
const antd_1 = require("antd");
const page_header_1 = __importDefault(require("@components/common/layout/page-header"));
const perfomer_service_1 = require("@services/perfomer.service");
const services_1 = require("src/services");
const lib_1 = require("src/lib");
require("./index.less");
const socket_1 = require("src/socket");
const initQueryState = {
    offset: 0,
    limit: 100,
    gender: '',
    category: '',
    country: '',
    sortBy: '',
    sort: 'desc'
};
const focusStyle = {
    color: '#ff2977',
    backgroundColor: '#fff',
    borderColor: '#ff2977'
};
class PerformerTagPage extends react_1.PureComponent {
    constructor(props) {
        super(props);
        this.search = () => {
            const { searchPerformer: dispatchSearchPerformer, router } = this.props;
            const { query } = this.state;
            dispatchSearchPerformer(Object.assign(Object.assign({}, router.query), query));
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
    componentDidUpdate(prevProps) {
        const { router, loggedIn } = this.props;
        if (router.query !== prevProps.router.query) {
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
    filter(name, value) {
        const { router } = this.props;
        const { query } = this.state;
        router_1.default.push({
            pathname: '/tag',
            query: Object.assign(Object.assign(Object.assign({}, router.query), query), { [name]: value })
        });
    }
    render() {
        const { router } = this.props;
        const { query } = this.state;
        const { tags } = router.query;
        if (!router.query.tags)
            return <_error_1.default statusCode={404}/>;
        return (<>
        <head_1.default>
          <title>
            Models -
            {tags}
          </title>
        </head_1.default>
        <div className="">
          <page_header_1.default title={tags}/>
          <antd_1.Row align="middle" justify="center" className="filter">
            <antd_1.Col span={24}>
              {perfomer_service_1.GENNDER_PERFORMER.map((gender) => (<antd_1.Button key={gender} onClick={this.filter.bind(this, 'gender', gender)} type="dashed" style={gender === query.gender ? Object.assign({}, focusStyle) : {}}>
                  {gender}
                </antd_1.Button>))}
            </antd_1.Col>
          </antd_1.Row>
          <performer_grid_1.default {...this.props} {...query} setFilter={this.filter.bind(this)} onLike={this.onLike.bind(this)} isPage/>
        </div>
      </>);
    }
}
PerformerTagPage.authenticate = false;
PerformerTagPage.layout = 'public';
PerformerTagPage.contextType = socket_1.SocketContext;
const mapStateToProps = (state) => (Object.assign({ loggedIn: state.auth.loggedIn }, state.performer.performers));
const mapDispatch = { searchPerformer: actions_1.searchPerformer, updatePerformerFavourite: actions_1.updatePerformerFavourite };
exports.default = router_1.withRouter(react_redux_1.connect(mapStateToProps, mapDispatch)(PerformerTagPage));
