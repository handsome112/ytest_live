"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TransactionHistoryTable = void 0;
const antd_1 = require("antd");
const react_1 = __importDefault(require("react"));
const lib_1 = require("src/lib");
const TransactionHistoryTable = ({ transactions, rowKey, pageSize, total, onChange }) => {
    const columns = [
        {
            title: 'Transaction ID',
            dataIndex: '_id',
            key: '_id',
            render: (_id) => (_id === null || _id === void 0 ? void 0 : _id.slice(16, 24).toUpperCase()) || 'N/A'
        },
        {
            title: 'Products',
            dataIndex: 'products',
            key: 'products',
            render(products) {
                return (products || []).map((product) => {
                    var _a;
                    return (<p>
            <strong>{product.name}</strong>
            {' '}
            <br />
            <small>{((_a = product === null || product === void 0 ? void 0 : product.description) === null || _a === void 0 ? void 0 : _a.slice(0, 150)) || ''}</small>
          </p>);
                });
            }
        },
        {
            title: 'Price',
            dataIndex: 'totalPrice',
            key: 'totalPrice',
            align: 'center',
            sorter: true,
            render: (totalPrice) => (totalPrice === null || totalPrice === void 0 ? void 0 : totalPrice.toFixed(2)) || 'N/A'
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            filters: [
                { text: 'Success', value: 'success' },
                { text: 'Pending', value: 'pending' },
                { text: 'Canceled', value: 'canceled' }
            ],
            onFilter: (value, record) => record.status.includes(value),
            render(status) {
                switch (status) {
                    case 'success':
                        return <antd_1.Tag color="green">Success</antd_1.Tag>;
                    case 'pending':
                        return <antd_1.Tag color="warning">Pending</antd_1.Tag>;
                    case 'canceled':
                        return <antd_1.Tag color="default">Canceled</antd_1.Tag>;
                    default:
                        return <antd_1.Tag color="default">Canceled</antd_1.Tag>;
                }
            }
        },
        {
            title: 'Created At',
            dataIndex: 'createdAt',
            sorter: true,
            key: 'createdAt',
            render(date) {
                return <span>{lib_1.formatDate(date)}</span>;
            }
        }
    ];
    return (<antd_1.Table columns={columns} rowKey={rowKey} dataSource={transactions} pagination={{ total, pageSize }} onChange={onChange.bind(this)}/>);
};
exports.TransactionHistoryTable = TransactionHistoryTable;
