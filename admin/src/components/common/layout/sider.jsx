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
const antd_1 = require("antd");
const icons_1 = require("@ant-design/icons");
const scroll_bar_1 = __importDefault(require("../base/scroll-bar"));
const menu_1 = require("./menu");
require("./sider.less");
class Sider extends react_1.PureComponent {
    render() {
        const { collapsed, theme, isMobile, logo, siteName, onThemeChange, menus } = this.props;
        return (<antd_1.Layout.Sider width={256} 
        // theme={theme}
        breakpoint="lg" trigger={null} collapsible collapsed={collapsed} 
        // onBreakpoint={!isMobile && onCollapseChange}
        className="slider">
        <div className="brand">
          <div className="logo">
            <img alt="logo" src={logo}/>
              {!collapsed && <h1>{siteName}</h1>}
          </div>
        </div>

        <div className="menuContainer">
          <scroll_bar_1.default options={{
                // Disabled horizontal scrolling, https://github.com/utatti/perfect-scrollbar#options
                suppressScrollX: true
            }}>
            <menu_1.SiderMenu menus={menus} theme={theme} isMobile={isMobile}/>
          </scroll_bar_1.default>
        </div>
        {!collapsed && (<div className="switchTheme">
            <span>
              <icons_1.BulbOutlined />
              <span>Switch Theme</span>
            </span>
            <antd_1.Switch onChange={onThemeChange && onThemeChange.bind(this, theme === "dark" ? "light" : "dark")} defaultChecked={theme === "dark"} checkedChildren="Dark" unCheckedChildren="Light"/>
          </div>)}
      </antd_1.Layout.Sider>);
    }
}
exports.default = Sider;
