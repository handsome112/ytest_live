"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DropOption = void 0;
const react_1 = require("react");
const icons_1 = require("@ant-design/icons");
const antd_1 = require("antd");
class DropOption extends react_1.PureComponent {
    render() {
        const { onMenuClick, menuOptions = [], buttonStyle, dropdownProps } = this.props;
        const menu = menuOptions.map(item => (<antd_1.Menu.Item key={item.key}>{item.name}</antd_1.Menu.Item>));
        return (<antd_1.Dropdown overlay={<antd_1.Menu onSelect={onMenuClick}>{menu}</antd_1.Menu>} {...dropdownProps}>
        <antd_1.Button style={Object.assign({ border: "none" }, buttonStyle)}>
          <icons_1.BarsOutlined style={{ marginRight: 2 }}/>
          <icons_1.DownOutlined />
        </antd_1.Button>
      </antd_1.Dropdown>);
    }
}
exports.DropOption = DropOption;
