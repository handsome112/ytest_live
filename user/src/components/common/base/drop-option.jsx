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
Object.defineProperty(exports, "__esModule", { value: true });
exports.DropOption = void 0;
const react_1 = __importStar(require("react"));
const icons_1 = require("@ant-design/icons");
const antd_1 = require("antd");
class DropOption extends react_1.PureComponent {
    render() {
        const { onMenuClick, menuOptions = [], buttonStyle, dropdownProps } = this.props;
        const menu = menuOptions.map((item) => (<antd_1.Menu.Item key={item.key}>{item.name}</antd_1.Menu.Item>));
        return (<antd_1.Dropdown overlay={<antd_1.Menu onSelect={onMenuClick}>{menu}</antd_1.Menu>} {...dropdownProps}>
        <antd_1.Button style={Object.assign({ border: 'none' }, buttonStyle)}>
          <icons_1.BarsOutlined style={{ marginRight: 2 }}/>
          <icons_1.DownOutlined />
        </antd_1.Button>
      </antd_1.Dropdown>);
    }
}
exports.DropOption = DropOption;
