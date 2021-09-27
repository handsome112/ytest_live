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
const React = __importStar(require("react"));
const antd_1 = require("antd");
const lib_1 = require("src/lib");
const ProductsTable = ({ paymentTokenHistory, searching, total, pageSize, onChange }) => {
    const columns = [
        {
            title: 'ID',
            dataIndex: '_id',
            key: 'id'
        },
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            render(name, record) {
                return <span>{name || record.type}</span>;
            }
        },
        {
            title: 'Seller / To',
            dataIndex: 'sellerId',
            key: 'sellerId',
            render: (sellerId, record) => { var _a; return ((_a = record.sellerInfo) === null || _a === void 0 ? void 0 : _a.username) || 'N/A'; }
        },
        {
            title: 'Tokens',
            dataIndex: 'totalPrice',
            key: 'totalPrice',
            sorter: true
        },
        {
            title: 'Created At',
            dataIndex: 'createdAt',
            key: 'createdAt',
            render: (date) => (<span>{lib_1.formatDate(date, 'MMMM DD, YYYY HH:mm')}</span>),
            sorter: true
        }
    ];
    const dataSource = paymentTokenHistory.map((p) => (Object.assign(Object.assign({}, p), { key: p._id })));
    return (<antd_1.Table dataSource={dataSource} columns={columns} className="table" pagination={{
            total,
            pageSize
        }} showSorterTooltip={false} loading={searching} onChange={onChange}/>);
};
exports.default = ProductsTable;
