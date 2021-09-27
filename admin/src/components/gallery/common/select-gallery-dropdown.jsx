"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SelectGalleryDropdown = void 0;
const react_1 = require("react");
const antd_1 = require("antd");
const lodash_1 = require("lodash");
const gallery_service_1 = require("@services/gallery.service");
const { Option } = antd_1.Select;
class SelectGalleryDropdown extends react_1.PureComponent {
    constructor() {
        super(...arguments);
        this._initalData = [];
        this.state = {
            data: [],
            value: undefined
        };
        this.handleSearch = (value) => {
            const q = value.toLowerCase();
            const filtered = this._initalData.filter((g) => {
                return (g.name || '').toLowerCase().includes(q);
            });
            this.setState({ data: filtered });
        };
    }
    componentDidMount() {
        if (this.props.isQuery) {
            this.findGalleries();
        }
    }
    async findGalleries() {
        const resp = await gallery_service_1.galleryService.search({
            limit: 1000
        });
        this.setData(resp.data.data || []);
    }
    componentDidUpdate(prevProps) {
        if (prevProps.galleries !== this.props.galleries)
            this.setData(this.props.galleries);
    }
    async setData(galleries) {
        this._initalData = lodash_1.sortBy(galleries, (g) => g.performerId);
        this.setState({
            data: [...this._initalData]
        });
    }
    render() {
        const { disabled } = this.props;
        return (<antd_1.Select showSearch value={this.state.value} placeholder={this.props.placeholder} style={this.props.style} defaultActiveFirstOption={false} showArrow={true} filterOption={false} onSearch={this.handleSearch} onChange={this.props.onSelect.bind(this)} notFoundContent={null} defaultValue={this.props.defaultValue || undefined} disabled={disabled} allowClear>
        {this.state.data.map((g) => (<Option key={g._id} value={g._id}>
            <span>
              <span>{g.name}</span>
            </span>
          </Option>))}
      </antd_1.Select>);
    }
}
exports.SelectGalleryDropdown = SelectGalleryDropdown;
