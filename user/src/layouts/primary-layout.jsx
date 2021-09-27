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
require("./primary-layout.less");
const React = __importStar(require("react"));
const antd_1 = require("antd");
const head_1 = __importDefault(require("next/head"));
const react_redux_1 = require("react-redux");
const router_1 = __importDefault(require("next/router"));
const actions_1 = require("src/redux/ui/actions");
const header_1 = __importDefault(require("@components/common/layout/header"));
const loader_1 = __importDefault(require("@components/common/base/loader"));
const icons_1 = require("@ant-design/icons");
// import { SiderMenu } from '@components/common/layout/menu';
const icons_2 = require("@components/common/base/icons");
const dynamic_1 = __importDefault(require("next/dynamic"));
const lib_1 = require("src/lib");
const footer_1 = __importDefault(require("@components/common/layout/footer"));
const SiderMenuNoSSR = dynamic_1.default(() => Promise.resolve().then(() => __importStar(require('@components/common/layout/menu'))), {
    ssr: false
});
const userSettingMenu = [
    {
        id: 'account-settings',
        name: 'Account Settings',
        route: '/account/user/account-settings',
        icon: <icons_1.SettingOutlined />
    },
    {
        id: 'messages',
        name: 'Messages',
        route: '/messages',
        icon: <icons_1.MessageOutlined />
    },
    {
        id: 'favorites',
        name: 'My favorites',
        route: '/account/user/favorites',
        icon: <icons_1.HeartOutlined />
    },
    {
        id: 'funds-tokens',
        name: 'Funds / Tokens',
        route: '/account/user/funds-tokens',
        icon: (<span className="anticon">
        <icons_2.FundsIcon />
      </span>)
    },
    {
        id: 'transaction-history',
        name: 'Transaction History',
        route: '/account/user/transaction-history',
        icon: (<span className="anticon">
        <icons_2.TransactionHistoryIcon />
      </span>)
    },
    {
        id: 'payment-token-history',
        name: 'Payment Tokens History',
        route: '/account/user/payment-token-history',
        icon: (<span className="anticon">
        <icons_2.PaymentTokensHistoryIcon />
      </span>)
    },
    {
        id: 'order',
        name: 'My orders',
        route: '/account/user/orders',
        icon: <icons_1.OrderedListOutlined />
    },
    {
        id: 'purchased-galleries',
        name: 'Purchased Galleries',
        route: '/account/user/purchased-gallery',
        icon: (<span className="anticon">
        <icons_2.PurchasedImageIcon />
      </span>)
    },
    {
        id: 'purchased-videos',
        name: 'Purchased Videos',
        route: '/account/user/purchased-video',
        icon: (<span className="anticon">
        <icons_2.PurchasedVideoIcon />
      </span>)
    },
    {
        id: 'purchased-products',
        name: 'Purchased Products',
        route: '/account/user/purchased-product',
        icon: (<span className="anticon">
        <icons_2.PurchasedItemIcon />
      </span>)
    }
    // {
    //   id: 'refund-request',
    //   name: 'Refund Requests',
    //   route: '/account/user/refund-request',
    //   icon: <RollbackOutlined />
    // }
];
const performerSettingMenu = [
    {
        id: 'profile',
        name: 'Profile',
        route: '/account/performer/profile',
        icon: <icons_1.UserOutlined />
    },
    {
        id: 'account-settings',
        name: 'Account Settings',
        route: '/account/performer/account-settings',
        icon: <icons_1.SettingOutlined />
    },
    {
        id: 'messages',
        name: 'Messages',
        route: '/messages',
        icon: <icons_1.MessageOutlined />
    },
    {
        id: 'earning',
        name: 'Earnings',
        route: '/account/performer/earning',
        icon: (<span className="anticon">
        <icons_2.EarningIcon />
      </span>)
    },
    {
        id: 'schedules',
        name: 'Schedules',
        route: '/account/performer/schedules',
        icon: <icons_1.CalendarOutlined />
    },
    {
        id: 'my-products',
        name: 'Products',
        route: '/account/performer/products',
        icon: (<span className="anticon">
        <icons_2.MyProductIcon />
      </span>)
    },
    {
        id: 'my-videos',
        name: 'Videos',
        route: '/account/performer/videos',
        icon: (<span className="anticon">
        <icons_2.VideosIcon />
      </span>)
    },
    {
        id: 'my-galleries',
        name: 'Galleries',
        route: '/account/performer/galleries',
        icon: (<span className="anticon">
        <icons_2.PhotosIcon />
      </span>)
    },
    {
        id: 'my-blocking',
        name: 'Blocking',
        route: '/account/performer/geo-block',
        icon: <icons_1.GlobalOutlined />
    },
    {
        id: 'payout-request',
        name: 'Payout Request',
        route: '/account/performer/payout-requests',
        icon: (<span className="anticon">
        <icons_2.PayoutRequestIcon />
      </span>)
    },
    {
        id: 'order',
        name: 'Orders',
        route: '/account/performer/orders',
        icon: <icons_1.OrderedListOutlined />
    }
];
const studioSettingMenu = [
    {
        id: 'account-settings',
        name: 'Account Settings',
        route: '/studio/account-settings',
        icon: <icons_1.SettingOutlined />
    },
    {
        id: 'earning',
        name: 'Earnings',
        route: '/studio/earning',
        icon: (<span className="anticon">
        <icons_2.EarningIcon />
      </span>)
    },
    {
        id: 'commission',
        name: 'Commission',
        route: '/studio/commissions',
        icon: <icons_1.PieChartOutlined />
    },
    {
        id: 'studio-models',
        name: 'Models',
        route: '/studio/models',
        icon: (<span className="anticon">
        <icons_2.Group />
      </span>)
    },
    {
        id: 'studio-payout-requests',
        name: 'Payout Requests',
        route: '/studio/payout-requests',
        icon: (<span className="anticon">
        <icons_2.PayoutRequestIcon />
      </span>)
    },
    {
        id: 'studioperformer-requests',
        name: 'Performer Payout Requests',
        route: '/studio/payout-requests/performer-requests',
        icon: <icons_1.SolutionOutlined />
    },
    {
        id: 'performer-stats',
        name: 'Performer Stats',
        route: '/studio/models/stats',
        icon: <icons_1.LineChartOutlined />
    }
];
class PrimaryLayout extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            // security request for primary layout
            routerChange: false
        };
    }
    async componentDidMount() {
        const { loadUIValue: dispatchLoadUIValue } = this.props;
        dispatchLoadUIValue();
        process.browser && this.handleStateChange();
        this.rightPrimaryLayoutRef = React.createRef();
    }
    handleStateChange() {
        router_1.default.events.on('routeChangeStart', () => this.setState({ routerChange: true }));
        router_1.default.events.on('routeChangeComplete', () => this.setState({ routerChange: false }));
    }
    onLive() {
        router_1.default.push('/live');
    }
    onSideMenuClick() {
        if (this.rightPrimaryLayoutRef.current instanceof HTMLDivElement) {
            const container = document.querySelector('.container');
            const rect = this.rightPrimaryLayoutRef.current.getBoundingClientRect();
            if (container) {
                container.scroll({ top: rect.top, behavior: 'smooth' });
            }
        }
    }
    render() {
        const { children, collapsed, fixedHeader, logo, currentUser, totalNotReadMessage, 
        // siteName,
        theme } = this.props;
        const { routerChange } = this.state;
        const headerProps = {
            logo,
            collapsed,
            theme
        };
        return (<antd_1.Layout>
        <head_1.default>
          <link href="https://unpkg.com/video.js@7.8.3/dist/video-js.css" rel="stylesheet"/>
          <script src="https://unpkg.com/video.js@7.8.3/dist/video.js"/>
          <script src="https://unpkg.com/@videojs/http-streaming@1.13.3/dist/videojs-http-streaming.js"/>
        </head_1.default>
        <div className="container" style={{ paddingTop: fixedHeader ? 72 : 0 }} id="primaryLayout">
          <header_1.default {...headerProps}/>
          <antd_1.Layout.Content className="content">
            {routerChange && <loader_1.default spinning fullScreen/>}
            <div className="primary-content">
              <antd_1.Row gutter={10}>
                <antd_1.Col xs={24} sm={4}>
                  {(currentUser === null || currentUser === void 0 ? void 0 : currentUser._id) && (currentUser === null || currentUser === void 0 ? void 0 : currentUser.role) === 'performer' && (<antd_1.Space direction="vertical" style={{ width: '100%' }}>
                      <antd_1.Button type="primary" className="btn-live" onClick={this.onLive.bind(this)}>
                        Go Live
                      </antd_1.Button>
                      <SiderMenuNoSSR menus={performerSettingMenu} totalNotReadMessage={totalNotReadMessage} onClick={this.onSideMenuClick.bind(this)}/>
                    </antd_1.Space>)}
                  {(currentUser === null || currentUser === void 0 ? void 0 : currentUser._id) && (currentUser === null || currentUser === void 0 ? void 0 : currentUser.role) === 'user' && (<SiderMenuNoSSR menus={userSettingMenu} totalNotReadMessage={totalNotReadMessage} onClick={this.onSideMenuClick.bind(this)}/>)}
                  {(currentUser === null || currentUser === void 0 ? void 0 : currentUser._id) && (currentUser === null || currentUser === void 0 ? void 0 : currentUser.role) === 'studio' && (<>
                      <div className="tk-studio">
                        <div className="stat">
                          <span>Total models</span>
                          <span>{currentUser.stats.totalPerformer || 0}</span>
                        </div>
                        <div className="stat">
                          <span>Total earned</span>
                          <span>{currentUser.stats.totalTokenEarned || 0}</span>
                        </div>
                        <div className="stat">
                          <span>Total sessions</span>
                          <span>{currentUser.stats.totalOnlineToday || 0}</span>
                        </div>
                        <div className="stat">
                          <span>Total hours online</span>
                          <span>
                            {currentUser.stats.totalHoursOnline
                    && lib_1.converDuration(currentUser.stats.totalHoursOnline)}
                          </span>
                        </div>
                      </div>
                      <SiderMenuNoSSR menus={studioSettingMenu} onClick={this.onSideMenuClick.bind(this)}/>
                    </>)}
                </antd_1.Col>
                <antd_1.Col xs={24} sm={20} className="right-primary-layout" ref={this.rightPrimaryLayoutRef}>
                  {children}
                </antd_1.Col>
              </antd_1.Row>
            </div>
          </antd_1.Layout.Content>
          <footer_1.default />
          <antd_1.BackTop className="backTop" target={() => document.querySelector('#primaryLayout')}/>
        </div>
      </antd_1.Layout>);
    }
}
const userSelecter = (state) => state.user.current;
const performerSelecter = (state) => state.performer.current;
const studioSelecter = (state) => state.studio.current;
const authSelecter = (state) => state.auth;
const currentUserSelecter = lib_1.createSelector(userSelecter, performerSelecter, studioSelecter, authSelecter, (user, performer, studio, auth) => {
    if (!auth.loggedIn)
        return {};
    if (user === null || user === void 0 ? void 0 : user._id) {
        return Object.assign(Object.assign({}, user), { role: 'user' });
    }
    if (performer === null || performer === void 0 ? void 0 : performer._id) {
        return Object.assign(Object.assign({}, performer), { role: 'performer' });
    }
    if (studio === null || studio === void 0 ? void 0 : studio._id) {
        return Object.assign(Object.assign({}, studio), { role: 'studio' });
    }
    return {};
});
const mapStateToProps = (state) => (Object.assign(Object.assign(Object.assign({}, state.ui), state.auth), { totalNotReadMessage: state.message.totalNotReadMessage, currentUser: currentUserSelecter(state) }));
const mapDispatchToProps = { loadUIValue: actions_1.loadUIValue };
exports.default = react_redux_1.connect(mapStateToProps, mapDispatchToProps)(PrimaryLayout);
