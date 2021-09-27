"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SelectUserDropdown = void 0;
const react_1 = require("react");
const antd_1 = require("antd");
const lodash_1 = require("lodash");
const user_service_1 = require("@services/user.service");
const { Option } = antd_1.Select;
class SelectUserDropdown extends react_1.PureComponent {
    constructor() {
        super(...arguments);
        this._initialData = [];
        this.state = {
            data: [],
            value: undefined
        };
        this.handleSearch = (value) => {
            const q = value.toLowerCase();
            const filtered = this._initialData.filter((p) => {
                return p.username.includes(q) || (p.name || '').toLowerCase().includes(q);
            });
            this.setState({ data: filtered });
        };
    }
    componentDidMount() {
        this.loadUsers();
    }
    async loadUsers(q) {
        // TODO - should check for better option?
        const resp = await user_service_1.userService.search({ limit: 1000 });
        this._initialData = lodash_1.sortBy(resp.data.data, (i) => i.username);
        this.setState({
            data: [...this._initialData]
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
exports.SelectUserDropdown = SelectUserDropdown;
