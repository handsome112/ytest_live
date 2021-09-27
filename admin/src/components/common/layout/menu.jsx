"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SiderMenu = void 0;
const react_1 = require("react");
const antd_1 = require("antd");
const link_1 = __importDefault(require("next/link"));
const router_1 = __importDefault(require("next/router"));
class SiderMenu extends react_1.PureComponent {
    constructor() {
        super(...arguments);
        this.state = {
            selectedKeys: ['dashboard'],
            openKeys: []
        };
        this.onOpenChange = openKeys => {
            const { menus } = this.props;
            const rootSubmenuKeys = menus.filter(_ => !_.menuParentId).map(_ => _.id);
            const latestOpenKey = openKeys.find(key => this.state.openKeys.indexOf(key) === -1);
            let newOpenKeys = openKeys;
            if (rootSubmenuKeys.indexOf(latestOpenKey) !== -1) {
                newOpenKeys = latestOpenKey ? [latestOpenKey] : [];
            }
            this.setState({
                openKeys: newOpenKeys,
            });
        };
        this.generateMenus = data => {
            return data.map(item => {
                if (item.children) {
                    return (<antd_1.Menu.SubMenu key={item.id} title={<react_1.Fragment>
                {item.icon}
                <span>{item.name}</span>
              </react_1.Fragment>}>
            {this.generateMenus(item.children)}
          </antd_1.Menu.SubMenu>);
                }
                return (<antd_1.Menu.Item key={item.id}>
          {item.icon}
          <link_1.default href={item.route} as={item.as || item.route}>
            <a>{item.name}</a>
          </link_1.default>
        </antd_1.Menu.Item>);
            });
        };
    }
    componentDidMount() {
        // Router.events.on('routeChangeStart', this.routerChange.bind(this));
        const openKeys = this.getOpenKeys(this.props.menus);
        this.setState({ openKeys });
    }
    flatten(menus, flattenMenus = []) {
        menus.forEach(m => {
            if (m.children) {
                this.flatten(m.children, flattenMenus);
            }
            const tmp = Object.assign({}, m);
            delete tmp.children;
            flattenMenus.push(tmp);
        });
        return flattenMenus;
    }
    getOpenKeys(menus) {
        const pathname = process.browser ? router_1.default.pathname : '';
        const withoutQuery = pathname.split('?')[0];
        let found = false;
        let results = [];
        // TODO - optimize me if needed or more level
        menus.forEach((menu) => {
            if (found)
                return;
            const menuRoute = menu.route ? menu.route.split('?')[0] : '';
            if (menu.route === pathname || menuRoute === withoutQuery) {
                found = true;
                results = [menu.id];
                return;
            }
            if (menu.children) {
                menu.children.forEach((cmenu) => {
                    if (found)
                        return;
                    const menuRoute = cmenu.route ? cmenu.route.split('?')[0] : '';
                    if (cmenu.route === pathname || menuRoute === withoutQuery) {
                        found = true;
                        results = [menu.id];
                        return;
                    }
                });
            }
        });
        return results;
    }
    render() {
        const { theme, menus, collapsed } = this.props;
        const menuProps = collapsed
            ? {}
            : {
                openKeys: this.state.openKeys
            };
        return (<antd_1.Menu mode="inline" theme={theme} 
        // selectedKeys={this.state.selectedKeys}
        openKeys={this.state.openKeys} onOpenChange={this.onOpenChange.bind(this)} 
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
exports.SiderMenu = SiderMenu;
