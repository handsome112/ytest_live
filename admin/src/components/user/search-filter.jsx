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
exports.SearchFilter = void 0;
const react_1 = __importStar(require("react"));
const antd_1 = require("antd");
class SearchFilter extends react_1.PureComponent {
    constructor() {
        super(...arguments);
        this.state = {
            q: '',
            role: '',
            status: ''
        };
    }
    render() {
        return (<antd_1.Row gutter={24}>
        <antd_1.Col xl={{ span: 4 }} md={{ span: 8 }}>
          <antd_1.Input placeholder="Enter keyword" onChange={(evt) => this.setState({ q: evt.target.value })} onPressEnter={() => this.props.onSubmit(this.state)}/>
        </antd_1.Col>
        <antd_1.Col xl={{ span: 4 }} md={{ span: 8 }}>
          <antd_1.Select defaultValue="" style={{ width: '100%' }} onChange={(role) => this.setState({ role })}>
            <antd_1.Select.Option value="">Role</antd_1.Select.Option>
            <antd_1.Select.Option value="admin">Admin</antd_1.Select.Option>
            <antd_1.Select.Option value="user">User</antd_1.Select.Option>
          </antd_1.Select>
        </antd_1.Col>
        <antd_1.Col xl={{ span: 4 }} md={{ span: 8 }}>
          <antd_1.Select defaultValue="" style={{ width: '100%' }} onChange={(status) => this.setState({ status })}>
            <antd_1.Select.Option value="">Status</antd_1.Select.Option>
            <antd_1.Select.Option value="active">Active</antd_1.Select.Option>
            <antd_1.Select.Option value="inactive">Suspend</antd_1.Select.Option>
          </antd_1.Select>
        </antd_1.Col>
        <antd_1.Col xl={{ span: 2 }} md={{ span: 8 }}>
          <antd_1.Button type="primary" onClick={() => this.props.onSubmit(this.state)}>
            Search
          </antd_1.Button>
        </antd_1.Col>
        <antd_1.Col xl={{ span: 4 }} md={{ span: 8 }}>
          <antd_1.Button type="primary" onClick={() => this.props.onExportCsv(this.state)}>
            Export Csv
          </antd_1.Button>
        </antd_1.Col>
      </antd_1.Row>);
    }
}
exports.SearchFilter = SearchFilter;
