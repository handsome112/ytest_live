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
exports.getStaticProps = void 0;
require("./auth-layout.less");
const React = __importStar(require("react"));
const antd_1 = require("antd");
const enquire_js_1 = require("enquire-js");
const react_redux_1 = require("react-redux");
const router_1 = __importDefault(require("next/router"));
const actions_1 = require("src/redux/ui/actions");
const header_1 = __importDefault(require("@components/common/layout/header"));
const loader_1 = __importDefault(require("@components/common/base/loader"));
const footer_1 = __importDefault(require("@components/common/layout/footer"));
async function getStaticProps() {
    return {
        props: {}
    };
}
exports.getStaticProps = getStaticProps;
class AuthLayout extends React.PureComponent {
    constructor() {
        super(...arguments);
        this.state = {
            isMobile: false,
            // security request for primary layout
            routerChange: false
        };
        this.onThemeChange = (theme) => {
            const { updateUIValue: dispatchUpdateUIValue } = this.props;
            dispatchUpdateUIValue({ theme });
        };
        this.onCollapseChange = (collapsed) => {
            const { updateUIValue: dispatchUpdateUIValue } = this.props;
            dispatchUpdateUIValue({ collapsed });
        };
    }
    componentDidMount() {
        const { loadUIValue: dispatchLoadUIValue, loggedIn } = this.props;
        if (loggedIn) {
            router_1.default.push('/');
            return;
        }
        dispatchLoadUIValue();
        this.enquireHandler = enquire_js_1.enquireScreen((mobile) => {
            const { isMobile } = this.state;
            if (isMobile !== mobile) {
                this.setState({
                    isMobile: mobile
                });
            }
        });
        process.browser && this.handleStateChange();
    }
    componentWillUnmount() {
        enquire_js_1.unenquireScreen(this.enquireHandler);
    }
    handleStateChange() {
        router_1.default.events.on('routeChangeStart', () => this.setState({ routerChange: true }));
        router_1.default.events.on('routeChangeComplete', () => this.setState({ routerChange: false }));
    }
    render() {
        const { children, collapsed, logo, 
        // siteName,
        theme } = this.props;
        const { routerChange } = this.state;
        const headerProps = {
            logo,
            collapsed,
            theme,
            onCollapseChange: this.onCollapseChange
        };
        return (<antd_1.Layout className="container" id="authLayout">
        <header_1.default {...headerProps}/>
        <div className="content">
          {routerChange && <loader_1.default spinning fullScreen/>}
          {/* <Bread routeList={newRouteList} /> */}
          {children}
        </div>
        <footer_1.default />
        <antd_1.BackTop className="backTop"/>
      </antd_1.Layout>);
    }
}
const mapStateToProps = (state) => (Object.assign(Object.assign({}, state.ui), { loggedIn: state.auth.loggedIn, auth: state.auth }));
const mapDispatchToProps = { updateUIValue: actions_1.updateUIValue, loadUIValue: actions_1.loadUIValue };
exports.default = react_redux_1.connect(mapStateToProps, mapDispatchToProps)(AuthLayout);
