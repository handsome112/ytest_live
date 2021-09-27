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
exports.SelectMenuTreeDropdown = void 0;
const react_1 = require("react");
const antd_1 = require("antd");
const lodash_1 = require("lodash");
const menu_service_1 = require("@services/menu.service");
const _ = __importStar(require("lodash"));
class SelectMenuTreeDropdown extends react_1.PureComponent {
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
                return p.title.includes(q) || (p.title || '').toLowerCase().includes(q);
            });
            this.setState({ data: this.mapDataNode(filtered) });
        };
    }
    componentDidMount() {
        this.loadMenus();
    }
    buildTree(data = [], parent, tree) {
        tree = typeof tree !== 'undefined' ? tree : [];
        parent = typeof parent !== 'undefined' ? parent : { _id: '' };
        const children = _.filter(data, child => (child.parentId || '') == parent._id);
        if (!_.isEmpty(children)) {
            if (!parent._id) {
                tree = children;
            }
            else {
                parent['children'] = children;
            }
            _.each(children, child => this.buildTree(data, child));
        }
        return this.mapDataNode(tree);
    }
    async mapDataNode(data) {
        if (data && data.length > 0) {
            return Promise.all(data.map(async (item) => {
                let children = [];
                if (item.children) {
                    children = await this.mapDataNode(item.children);
                }
                return {
                    title: item.title,
                    value: item._id,
                    ordering: item.ordering,
                    children: children.length > 0 ? _.orderBy(children, 'ordering', 'asc') : [],
                    disabled: this.props.menu && this.props.menu._id === item._id ? true : false
                };
            }));
        }
    }
    async loadMenus(q) {
        // TODO - should check for better option?
        const resp = await menu_service_1.menuService.search({ limit: 1000, sortBy: 'ordering', sort: 'asc' });
        this._initalData = lodash_1.sortBy(resp.data.data, i => i.title);
        this.setState({
            data: await this.buildTree(this._initalData)
        });
    }
    render() {
        const { disabled } = this.props;
        return (<antd_1.TreeSelect showSearch style={this.props.style || { width: '100%' }} value={this.props.defaultValue || this.state.value} dropdownStyle={{ maxHeight: 400, overflow: 'auto' }} treeData={this.state.data} placeholder={this.props.placeholder || 'Please select'} treeDefaultExpandAll onChange={value => {
                this.setState({ value });
                this.props.onSelect(value);
            }} onSearch={this.handleSearch} disabled={disabled} allowClear/>);
    }
}
exports.SelectMenuTreeDropdown = SelectMenuTreeDropdown;
