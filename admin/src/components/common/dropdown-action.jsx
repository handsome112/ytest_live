"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DropdownAction = void 0;
const react_1 = require("react");
const icons_1 = require("@ant-design/icons");
const antd_1 = require("antd");
class DropdownAction extends react_1.PureComponent {
    render() {
        const { menuOptions = [], buttonStyle, dropdownProps, nameButtonMain } = this.props;
        const menu = menuOptions.map((item) => (<antd_1.Menu.Item key={item.key} onClick={() => item.onClick && item.onClick()}>
        {item.children || item.name}
      </antd_1.Menu.Item>));
        return (<antd_1.Dropdown overlay={<antd_1.Menu>{menu}</antd_1.Menu>} {...dropdownProps}>
        <antd_1.Button style={Object.assign({}, buttonStyle)}>
          {nameButtonMain || 'Action'}
          <icons_1.DownOutlined />
        </antd_1.Button>
      </antd_1.Dropdown>);
    }
}
exports.DropdownAction = DropdownAction;
