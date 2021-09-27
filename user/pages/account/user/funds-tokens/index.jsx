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
/* eslint-disable no-nested-ternary */
const antd_1 = require("antd");
const page_header_1 = __importDefault(require("@components/common/layout/page-header"));
const head_1 = __importDefault(require("next/head"));
const loader_1 = __importDefault(require("src/components/common/base/loader"));
const token_card_1 = __importDefault(require("src/components/common/base/token-card"));
const react_1 = __importStar(require("react"));
require("./index.less");
const utils_1 = require("src/lib/utils");
const token_package_service_1 = require("@services/token-package.service");
const actions_1 = require("src/redux/user/actions");
const react_redux_1 = require("react-redux");
const string_1 = require("@lib/string");
class UserTokensPage extends react_1.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            tokens: [],
            fetching: false,
            buying: null
        };
    }
    static getInitialProps({ ctx }) {
        const { query } = ctx;
        return {
            action: query.action
        };
    }
    componentDidMount() {
        this.getTokens();
    }
    async getTokens() {
        try {
            this.setState({ fetching: true });
            const resp = await token_package_service_1.tokenPackageService.search({
                sortBy: 'ordering',
                sort: 'asc'
            });
            this.setState({ tokens: resp.data.data || [] });
        }
        catch (e) {
            const error = await Promise.resolve(e);
            antd_1.message.error(utils_1.getResponseError(error));
        }
        finally {
            this.setState({ fetching: false });
        }
    }
    async buyToken(tokenPackage) {
        try {
            this.setState({ buying: tokenPackage._id });
            const resp = await token_package_service_1.tokenPackageService.buyTokens(tokenPackage._id);
            if (resp.data) {
                if (string_1.isUrl(resp.data.paymentUrl)) {
                    window.open(resp.data.paymentUrl);
                }
                // message.success('Buy token success');
                // this.props.buyTokenSuccess(tokenPackage.tokens);
            }
        }
        catch (e) {
            const error = await Promise.resolve(e);
            antd_1.message.error(utils_1.getResponseError(error));
        }
        finally {
            this.setState({ buying: null });
        }
    }
    render() {
        const { fetching, tokens, buying } = this.state;
        return (<>
        <head_1.default>
          <title>Funds - Tokens</title>
        </head_1.default>
        <div className="funds-tokens-box">
          <page_header_1.default title="Buy More Tokens"/>
          <div className="tokens-section">
            <div className="tokens-card">
              <antd_1.Row>
                {fetching ? (<loader_1.default />) : tokens && tokens.length ? (tokens.map((item) => (<antd_1.Col xs={12} md={8} xl={6} xxl={4} key={item._id}>
                      <token_card_1.default name={item.name} token={item.tokens} price={item.price} onBuyToken={() => this.buyToken(item)} buying={item._id === buying}/>
                    </antd_1.Col>))) : ('There is no data')}
              </antd_1.Row>
            </div>
          </div>
        </div>
      </>);
    }
}
UserTokensPage.authenticate = true;
UserTokensPage.layout = 'primary';
const mapStateToProps = () => ({});
const mapDispatch = { buyTokenSuccess: actions_1.buyTokenSuccess };
exports.default = react_redux_1.connect(mapStateToProps, mapDispatch)(UserTokensPage);
