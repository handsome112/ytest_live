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
/* eslint-disable react/no-array-index-key */
const react_1 = __importStar(require("react"));
const antd_1 = require("antd");
const link_1 = __importDefault(require("next/link"));
const router_1 = __importStar(require("next/router"));
class SiderMenu extends react_1.PureComponent {
    constructor() {
        super(...arguments);
        this.state = {
            selectedKeys: ['dashboard'],
            openKeys: []
        };
        this.onOpenChange = (openKeys) => {
            const { menus } = this.props;
            const rootSubmenuKeys = menus
                .filter((_) => !_.menuParentId)
                .map((_) => _.id);
            const latestOpenKey = openKeys.find((key) => openKeys.indexOf(key) === -1);
            let newOpenKeys = openKeys;
            if (rootSubmenuKeys.indexOf(latestOpenKey) !== -1) {
                newOpenKeys = latestOpenKey ? [latestOpenKey] : [];
            }
            this.setState({
                openKeys: newOpenKeys
            });
        };
        this.generateMenus = (data) => {
            const { totalNotReadMessage } = this.props;
            return data.map((item, index) => {
                if (item.children) {
                    return (<antd_1.Menu.SubMenu icon={item.icon} key={`sub-${index}`} title={(<>
                <span>{item.name}</span>
              </>)}>
            {this.generateMenus(item.children)}
          </antd_1.Menu.SubMenu>);
                }
                return (<antd_1.Menu.Item key={item.id} icon={item.icon}>
          <link_1.default href={item.route} as={item.as || item.route}>
            <a>
              {item.name}
              {' '}
              {item.id === 'messages' && `(${totalNotReadMessage})`}
            </a>
          </link_1.default>
        </antd_1.Menu.Item>);
            });
        };
    }
    componentDidMount() {
        // Router.events.on('routeChangeStart', this.routerChange.bind(this));
        const { menus } = this.props;
        const selectedKeys = process.browser
            ? this.getSelectedKeys(menus)
            : [];
        this.setSelectedKeys(selectedKeys);
    }
    componentDidUpdate(prevProps) {
        const { menus, router } = this.props;
        if (router.pathname !== prevProps.router.pathname) {
            const selectedKeys = process.browser
                ? this.getSelectedKeys(menus)
                : [];
            this.setSelectedKeys(selectedKeys);
        }
    }
    onSelect({ key }) {
        const { menus } = this.props;
        const flatTree = this.flatten(menus);
        const selectedKeys = flatTree.filter((m) => m.id === key).map((m) => m.id);
        this.setSelectedKeys(selectedKeys);
    }
    getSelectedKeys(menus) {
        const pathname = process.browser ? router_1.default.pathname : '';
        const flatTree = this.flatten(menus);
        return (flatTree
            // .filter((m) => pathname.includes(m.as || m.route))
            .filter((m) => (pathname === m.route || pathname === m.as))
            .map((m) => m.id));
    }
    setSelectedKeys(selectedKeys) {
        this.setState({ selectedKeys });
    }
    flatten(menus, flattenMenus = []) {
        menus.forEach((m) => {
            if (m.children) {
                this.flatten(m.children, flattenMenus);
            }
            const tmp = Object.assign({}, m);
            delete tmp.children;
            flattenMenus.push(tmp);
        });
        return flattenMenus;
    }
    render() {
        const { theme, menus, collapsed, onClick } = this.props;
        const { selectedKeys, openKeys } = this.state;
        const menuProps = collapsed
            ? {}
            : {
                openKeys
            };
        return (<antd_1.Menu key="profile-menu" mode="inline" theme={theme} selectedKeys={selectedKeys} onOpenChange={this.onOpenChange.bind(this)} onSelect={this.onSelect.bind(this)} onClick={onClick} 
        // onClick={
        //   isMobile
        //     ? () => {
        //         onCollapseChange(true);
        //       }
        //     : undefined
        // }
        {...menuProps}>
        {this.generateMenus(menus)}
      </antd_1.Menu>);
    }
}
exports.default = router_1.withRouter(SiderMenu);
