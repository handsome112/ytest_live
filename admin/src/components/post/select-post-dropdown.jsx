"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SelectPostDropdown = void 0;
const react_1 = require("react");
const antd_1 = require("antd");
const lodash_1 = require("lodash");
const post_service_1 = require("@services/post.service");
const { Option } = antd_1.Select;
class SelectPostDropdown extends react_1.PureComponent {
    constructor() {
        super(...arguments);
        this._initalData = [];
        this.state = {
            data: [],
            value: undefined
        };
        this.handleSearch = value => {
            const q = value.toLowerCase();
            const filtered = this._initalData.filter(p => {
                return p.slug.includes(q) || (p.title || '').toLowerCase().includes(q);
            });
            this.setState({ data: filtered });
        };
    }
    componentDidMount() {
        this.loadPosts();
    }
    async loadPosts(q) {
        // TODO - should check for better option?
        const resp = await post_service_1.postService.search({ limit: 1000 });
        this._initalData = lodash_1.sortBy(resp.data.data, i => i.slug);
        this.setState({
            data: [...this._initalData]
        });
    }
    render() {
        const { disabled } = this.props;
        return (<antd_1.Select showSearch value={this.state.value} placeholder={this.props.placeholder} style={this.props.style} defaultActiveFirstOption={false} showArrow={true} filterOption={false} onSearch={this.handleSearch} onChange={this.props.onSelect.bind(this)} notFoundContent={null} defaultValue={this.props.defaultValue || undefined} disabled={disabled} allowClear>
        {this.state.data.map(p => (<Option key={p._id} value={p.id}>
            <span>
              <strong>{p.slug}</strong> / <span>{p.title}</span>
            </span>
          </Option>))}
      </antd_1.Select>);
    }
}
exports.SelectPostDropdown = SelectPostDropdown;
