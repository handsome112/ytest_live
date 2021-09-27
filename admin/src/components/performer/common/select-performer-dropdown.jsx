"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SelectPerformerDropdown = void 0;
const react_1 = require("react");
const antd_1 = require("antd");
const lodash_1 = require("lodash");
const performer_service_1 = require("@services/performer.service");
const { Option } = antd_1.Select;
class SelectPerformerDropdown extends react_1.PureComponent {
    constructor() {
        super(...arguments);
        this._initalData = [];
        this.state = {
            data: [],
            value: undefined
        };
        this.handleSearch = (value) => {
            const q = value.toLowerCase();
            const filtered = this._initalData.filter((p) => {
                return p.username.includes(q) || (p.name || '').toLowerCase().includes(q);
            });
            this.setState({ data: filtered });
        };
    }
    componentDidMount() {
        this.loadPerformers();
    }
    async loadPerformers(q) {
        // TODO - should check for better option?
        const resp = await performer_service_1.performerService.search({ limit: 1000 });
        this._initalData = lodash_1.sortBy(resp.data.data, (i) => i.username);
        this.setState({
            data: [...this._initalData]
        });
    }
    render() {
        const { disabled } = this.props;
        return (<antd_1.Select showSearch value={this.state.value} placeholder={this.props.placeholder} style={this.props.style} defaultActiveFirstOption={false} showArrow={true} filterOption={false} onSearch={this.handleSearch} onChange={this.props.onSelect.bind(this)} notFoundContent={null} defaultValue={this.props.defaultValue || undefined} disabled={disabled} allowClear>
        {this.state.data.map((p) => (<Option key={p._id} value={p._id}>
            <span>
              <strong>{p.username}</strong> / <span>{p.name}</span>
            </span>
          </Option>))}
      </antd_1.Select>);
    }
}
exports.SelectPerformerDropdown = SelectPerformerDropdown;
