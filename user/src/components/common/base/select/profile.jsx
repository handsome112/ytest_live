"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OptionProfile = void 0;
/* eslint-disable react/react-in-jsx-scope */
const react_1 = require("react");
const antd_1 = require("antd");
class OptionProfile extends react_1.PureComponent {
    render() {
        const { label, dataSource, name } = this.props;
        return (<antd_1.Form.Item label={label} name={name}>
        <antd_1.Select>
          {dataSource.map((d) => (<antd_1.Select.Option value={d.value} key={d.value}>{d.label}</antd_1.Select.Option>))}
        </antd_1.Select>
      </antd_1.Form.Item>);
    }
}
exports.OptionProfile = OptionProfile;
