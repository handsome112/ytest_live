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
exports.getInitialProps = void 0;
const React = __importStar(require("react"));
const antd_1 = require("antd");
const enquire_js_1 = require("enquire-js");
const react_redux_1 = require("react-redux");
const actions_1 = require("src/redux/ui/actions");
const sider_1 = __importDefault(require("@components/common/layout/sider"));
const icons_1 = require("@ant-design/icons");
const header_1 = __importDefault(require("@components/common/layout/header"));
const router_1 = require("next/router");
const loader_1 = __importDefault(require("@components/common/base/loader"));
require("./primary-layout.less");
async function getInitialProps() {
    return {
        props: {}
    };
}
exports.getInitialProps = getInitialProps;
class PrimaryLayout extends React.PureComponent {
    constructor() {
        super(...arguments);
        this.state = {
            isMobile: false,
            // security request for primary layout
            checkingUser: false,
            routerChange: false
        };
        this.onCollapseChange = (collapsed) => {
            this.props.updateUIValue({ collapsed });
        };
        this.onThemeChange = (theme) => this.props.updateUIValue({ theme });
    }
    componentDidMount() {
        this.props.loadUIValue();
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
    handleStateChange() {
        router_1.Router.events.on('routeChangeStart', async () => await this.setState({ routerChange: true }));
        router_1.Router.events.on('routeChangeComplete', async () => await this.setState({ routerChange: false }));
    }
    componentWillUnmount() {
        enquire_js_1.unenquireScreen(this.enquireHandler);
    }
    render() {
        const { children, collapsed, fixedHeader, logo, siteName, theme } = this.props;
        const { isMobile, routerChange } = this.state;
        const headerProps = {
            collapsed,
            theme,
            onCollapseChange: this.onCollapseChange
        };
        const sliderMenus = [
            {
                id: 'dashboard',
                name: 'Dashboard',
                icon: <icons_1.PieChartOutlined />,
                children: [
                    {
                        id: 'stats',
                        name: 'Statistic',
                        route: '/dashboard'
                    }
                ]
            },
            {
                id: 'posts',
                name: 'Static Pages',
                icon: <icons_1.ContainerOutlined />,
                children: [
                    {
                        id: 'post-page',
                        name: 'Page',
                        route: '/posts?type=page'
                    },
                    {
                        id: 'page-create',
                        name: 'Create page',
                        route: '/posts/create?type=page'
                    }
                ]
            },
            {
                id: 'menu',
                name: 'FE Menu',
                icon: <icons_1.MenuOutlined />,
                children: [
                    {
                        id: 'menu-listing',
                        name: 'Menus',
                        route: '/menu'
                    },
                    {
                        name: 'Create',
                        id: 'create-menu',
                        route: '/menu/create'
                    }
                ]
            },
            {
                id: 'banner',
                name: 'Banners',
                icon: <icons_1.FileImageOutlined />,
                children: [
                    {
                        id: 'banner-listing',
                        name: 'Banners',
                        route: '/banner'
                    },
                    {
                        name: 'Upload',
                        id: 'upload-banner',
                        route: '/banner/upload'
                    }
                ]
            },
            {
                id: 'email-template',
                name: 'Email templates',
                icon: <icons_1.MailOutlined />,
                children: [
                    {
                        id: 'email-listing',
                        name: 'List',
                        route: '/email-templates'
                    }
                ]
            },
            {
                id: 'studio',
                name: 'Studios',
                icon: <icons_1.WalletOutlined />,
                children: [
                    {
                        name: 'List Studios',
                        id: 'studios-listing',
                        route: '/studios'
                    },
                    {
                        name: 'Pending Studios',
                        id: 'pending-studios',
                        route: '/studios?status=pending'
                    },
                    {
                        name: 'Create',
                        id: 'studios-create',
                        route: '/studios/create'
                    }
                ]
            },
            {
                id: 'accounts',
                name: 'Users',
                icon: <icons_1.UserOutlined />,
                children: [
                    {
                        name: 'Users',
                        id: 'users',
                        route: '/users'
                    },
                    {
                        name: 'Create',
                        id: 'users-create',
                        route: '/users/create'
                    }
                ]
            },
            {
                id: 'performer',
                name: 'Performers',
                icon: <icons_1.WomanOutlined />,
                children: [
                    {
                        name: 'Categories',
                        id: 'performer-categories',
                        route: '/performer/category'
                    },
                    {
                        name: 'All Performers',
                        id: 'performers',
                        route: '/performer'
                    },
                    {
                        name: 'Online Performers',
                        id: 'online-performers',
                        route: '/performer/online'
                    },
                    {
                        name: 'Pending Performers',
                        id: 'pending-performers',
                        route: '/performer?status=pending'
                    },
                    {
                        name: 'Create New',
                        id: 'create-performers',
                        route: '/performer/create'
                    }
                ]
            },
            {
                id: 'performers-photos',
                name: 'Photos',
                icon: <icons_1.CameraOutlined />,
                children: [
                    {
                        id: 'photo-listing',
                        name: 'Photos',
                        route: '/photos'
                    },
                    {
                        name: 'Upload',
                        id: 'upload-photo',
                        route: '/photos/upload'
                    },
                    {
                        name: 'Bulk Upload',
                        id: 'bulk-upload-photo',
                        route: '/photos/bulk-upload'
                    },
                    {
                        id: 'gallery-listing',
                        name: 'Albums',
                        route: '/gallery'
                    },
                    {
                        name: 'Create album',
                        id: 'create-galleries',
                        route: '/gallery/create'
                    }
                ]
            },
            {
                id: 'performers-products',
                name: 'Products',
                icon: <icons_1.SkinOutlined />,
                children: [
                    {
                        id: 'product-listing',
                        name: 'Products',
                        route: '/product'
                    },
                    {
                        name: 'Create',
                        id: 'create-product',
                        route: '/product/create'
                    }
                ]
            },
            {
                id: 'videos',
                name: 'Videos',
                icon: <icons_1.VideoCameraOutlined />,
                children: [
                    {
                        id: 'video-listing',
                        name: 'Videos',
                        route: '/video'
                    },
                    {
                        id: 'video-upload',
                        name: 'Upload',
                        route: '/video/upload'
                    }
                ]
            },
            {
                id: 'tokens',
                name: 'Token Packages',
                icon: <icons_1.BankOutlined />,
                children: [
                    {
                        id: 'token-listing',
                        name: 'Token Packages',
                        route: '/token-package'
                    },
                    {
                        id: 'create-token',
                        name: 'Create',
                        route: '/token-package/create'
                    }
                ]
            },
            {
                id: 'earning',
                name: 'Earnings',
                icon: <icons_1.DollarOutlined />,
                children: [
                    {
                        id: 'earning-listing-performer',
                        name: 'Performer Earnings',
                        route: '/earning'
                    },
                    {
                        id: 'earning-listing-studio',
                        name: 'Studio Earnings',
                        route: '/earning/studios'
                    }
                ]
            },
            {
                id: 'payments',
                name: 'Payments',
                icon: <icons_1.DollarOutlined />,
                route: '/payment'
            },
            {
                id: 'payment-information',
                name: 'Payment Informations',
                icon: <icons_1.BankFilled />,
                route: '/payment-information'
            },
            {
                id: 'order',
                name: 'Orders',
                icon: <icons_1.OrderedListOutlined />,
                children: [
                    {
                        id: 'order-listing',
                        name: 'Orders Managment',
                        route: '/order'
                    }
                ]
            },
            {
                id: 'payout',
                name: 'Payout requests',
                icon: <icons_1.MenuUnfoldOutlined />,
                children: [
                    {
                        id: 'payout-listing-performer',
                        name: 'Performer Requests',
                        route: '/payout-request'
                    },
                    {
                        id: 'payout-listing-studio',
                        name: 'Studio Requests',
                        route: '/payout-request/studios'
                    }
                ]
            },
            // {
            //   id: 'refund',
            //   name: 'Refund requests',
            //   icon: <ExclamationOutlined />,
            //   children: [
            //     {
            //       id: 'refund-listing',
            //       name: 'Refund Request Managment',
            //       route: '/refund-request'
            //     }
            //   ]
            // },
            {
                id: 'settings',
                name: 'Settings',
                icon: <icons_1.PieChartOutlined />,
                children: [
                    {
                        id: 'system-settings',
                        route: '/settings',
                        as: '/settings',
                        name: 'System settings'
                    },
                    {
                        name: 'Account settings',
                        id: 'account-settings',
                        route: '/account/settings'
                    }
                ]
            }
        ];
        const siderProps = {
            collapsed,
            isMobile,
            logo,
            siteName,
            theme,
            menus: sliderMenus,
            onCollapseChange: this.onCollapseChange,
            onThemeChange: this.onThemeChange
        };
        return (<React.Fragment>
        <antd_1.Layout>
          {isMobile ? (<antd_1.Drawer maskClosable closable={false} onClose={this.onCollapseChange.bind(this, !collapsed)} visible={!collapsed} placement="left" width={200} style={{
                    padding: 0,
                    height: '100vh'
                }}>
              <sider_1.default {...siderProps}/>
            </antd_1.Drawer>) : (<sider_1.default {...siderProps}/>)}
          <div className="container" style={{ paddingTop: fixedHeader ? 72 : 0 }} id="primaryLayout">
            <header_1.default {...headerProps}/>
            <antd_1.Layout.Content className="content" style={{ position: 'relative' }}>
              {routerChange && <loader_1.default spinning={true}/>}
              {/* <Bread routeList={newRouteList} /> */}
              {children}
            </antd_1.Layout.Content>
            <antd_1.BackTop className="backTop" target={() => document.querySelector('#primaryLayout')}/>
          </div>
        </antd_1.Layout>
      </React.Fragment>);
    }
}
PrimaryLayout.authenticate = true;
const mapStateToProps = (state) => (Object.assign(Object.assign({}, state.ui), { auth: state.auth }));
const mapDispatchToProps = { updateUIValue: actions_1.updateUIValue, loadUIValue: actions_1.loadUIValue };
exports.default = react_redux_1.connect(mapStateToProps, mapDispatchToProps)(PrimaryLayout);
