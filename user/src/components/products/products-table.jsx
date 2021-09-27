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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const React = __importStar(require("react"));
const antd_1 = require("antd");
const icons_1 = require("@ant-design/icons");
const link_1 = __importDefault(require("next/link"));
const ProductsTable = ({ products, searching, remove, total, pageSize, onChange }) => {
    const columns = [
        {
            title: 'Product Image',
            dataIndex: 'image',
            key: 'image',
            responsive: ['md'],
            render: (text, product) => (<link_1.default href={{
                    pathname: '/account/performer/products/update',
                    query: { id: product._id, product: JSON.stringify(product) }
                }} as={`/account/performer/products/${product._id}/update`}>
          <a>
            <img src={text} alt=""/>
          </a>
        </link_1.default>)
        },
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'q',
            render: (text) => (<link_1.default href="/">
          <a>{text}</a>
        </link_1.default>),
            filterIcon: (filtered) => (<icons_1.SearchOutlined style={{ color: filtered ? '#ff0066' : undefined }}/>),
            filterDropdown: ({ setSelectedKeys, confirm, clearFilters }) => (<div style={{ padding: 5 }}>
          <antd_1.Input placeholder="Product Name" size="large" onChange={(event) => {
                    if (!event.target.value) {
                        setSelectedKeys([]);
                        clearFilters();
                    }
                }} onPressEnter={(event) => {
                    setSelectedKeys([event.currentTarget.value]);
                    confirm();
                }} allowClear/>
        </div>)
        },
        {
            title: 'Type',
            dataIndex: 'type',
            key: 'type',
            filterIcon: (filtered) => (<icons_1.SearchOutlined style={{ color: filtered ? '#ff0066' : undefined }}/>),
            filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (<div style={{ padding: 5 }}>
          <antd_1.Menu style={{ borderRight: 'none' }} onSelect={(param) => {
                    setSelectedKeys([param.key]);
                    confirm();
                }} selectedKeys={selectedKeys}>
            <antd_1.Menu.Item key="physical">Physical</antd_1.Menu.Item>
            <antd_1.Menu.Item key="digital">Digital</antd_1.Menu.Item>
          </antd_1.Menu>
          <antd_1.Button onClick={() => {
                    setSelectedKeys([]);
                    clearFilters();
                }} style={{
                    width: '100%',
                    color: selectedKeys.length ? '#ff0066' : undefined,
                    borderColor: selectedKeys.length ? '#ff0066' : undefined
                }}>
            Reset
          </antd_1.Button>
        </div>),
            render: (type) => <span style={{ textTransform: 'capitalize' }}>{type}</span>
        },
        {
            title: 'Tokens',
            dataIndex: 'token',
            key: 'token',
            sorter: true
        },
        {
            title: 'In Stock',
            dataIndex: 'stock',
            key: 'stock',
            render: (stock, item) => (item.type === 'physical' ? stock : 'N/A'),
            sorter: true
        },
        {
            title: 'Is Publish?',
            key: 'publish',
            dataIndex: 'publish',
            render: (text) => (<span>{text ? 'YES' : 'NO'}</span>),
            filterIcon: (filtered) => (<icons_1.SearchOutlined style={{ color: filtered ? '#ff0066' : undefined }}/>),
            filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (<div style={{ padding: 5 }}>
          <antd_1.Menu style={{ borderRight: 'none' }} onSelect={(param) => {
                    setSelectedKeys([param.key]);
                    confirm();
                }} selectedKeys={selectedKeys}>
            <antd_1.Menu.Item key="true">YES</antd_1.Menu.Item>
            <antd_1.Menu.Item key="false">NO</antd_1.Menu.Item>
          </antd_1.Menu>
          <antd_1.Button onClick={() => {
                    setSelectedKeys([]);
                    clearFilters();
                }} style={{
                    width: '100%',
                    color: selectedKeys.length ? '#ff0066' : undefined,
                    borderColor: selectedKeys.length ? '#ff0066' : undefined
                }}>
            Reset
          </antd_1.Button>
        </div>)
        },
        {
            title: 'Action',
            key: 'action',
            render: (product) => {
                const { _id } = product;
                return (<antd_1.Space size="middle">
            <link_1.default as={`/account/performer/products/${_id}/update`} href={{
                        pathname: '/account/performer/products/update',
                        query: { id: _id, product: JSON.stringify(product) }
                    }}>
              <a style={{ color: 'gray' }}>
                <icons_1.EditOutlined />
              </a>
            </link_1.default>
            <icons_1.DeleteOutlined onClick={() => remove(_id)}/>
          </antd_1.Space>);
            }
        }
    ];
    const dataSource = products.map((p) => (Object.assign(Object.assign({}, p), { key: p._id })));
    return (<antd_1.Table dataSource={dataSource} columns={columns} className="table" pagination={{
            total,
            pageSize
        }} showSorterTooltip={false} loading={searching} onChange={onChange}/>);
};
ProductsTable.defaultProps = {
    remove: null
};
exports.default = ProductsTable;
