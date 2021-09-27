"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
const antd_1 = require("antd");
const icons_1 = require("@ant-design/icons");
const react_redux_1 = require("react-redux");
const link_1 = __importDefault(require("next/link"));
require("./header.less");
class Header extends react_1.PureComponent {
    handleClickMenu() { }
    render() {
        const { collapsed, onCollapseChange, currentUser } = this.props;
        const rightContent = [
            <antd_1.Menu key="user" mode="horizontal" onClick={this.handleClickMenu}>
        <antd_1.Menu.SubMenu title={<react_1.Fragment>
              <span style={{ color: '#999', marginRight: 4 }}>
                <span>Hi,</span>
              </span>
              <span>{currentUser.firstName + ' ' + currentUser.lastName}</span>
              <antd_1.Avatar style={{ marginLeft: 8 }} src={currentUser.avatar}/>
            </react_1.Fragment>}>
          <antd_1.Menu.Item key="settings">
            <link_1.default href="/account/settings">
              <span>Update profile</span>
            </link_1.default>
          </antd_1.Menu.Item>
          <antd_1.Menu.Item key="SignOut">
            <link_1.default href="/auth/logout">
              <a>Log out</a>
            </link_1.default>
          </antd_1.Menu.Item>
        </antd_1.Menu.SubMenu>
      </antd_1.Menu>
        ];
        return (<antd_1.Layout.Header className="header" id="layoutHeader">
        <div className="button" onClick={onCollapseChange && onCollapseChange.bind(this, !collapsed)}>
          {collapsed ? <icons_1.MenuUnfoldOutlined /> : <icons_1.MenuFoldOutlined />}
        </div>

        <div className="rightContainer">{rightContent}</div>
      </antd_1.Layout.Header>);
    }
}
const mapState = (state) => ({ currentUser: state.user.current });
exports.default = react_redux_1.connect(mapState)(Header);
