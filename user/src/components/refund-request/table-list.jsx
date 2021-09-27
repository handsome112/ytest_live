"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RefundRequestTable = void 0;
const antd_1 = require("antd");
const react_1 = __importDefault(require("react"));
const lib_1 = require("src/lib");
const RefundRequestTable = ({ requests, rowKey, pageSize, total, onChange }) => {
    const columns = [
        {
            title: 'Performer',
            dataIndex: 'performerId',
            key: 'performerId',
            render(data, record) {
                var _a;
                return <span>{((_a = record === null || record === void 0 ? void 0 : record.performerInfo) === null || _a === void 0 ? void 0 : _a.username) || 'N/A'}</span>;
            }
        },
        {
            title: 'Product',
            dataIndex: 'sourceId',
            key: 'sourceId',
            render(data, record) {
                return <span>{(record.productInfo && record.productInfo.name) || 'N/A'}</span>;
            }
        },
        {
            title: 'Qty',
            dataIndex: 'sourceId',
            render(data, record) {
                return <span>{(record.orderInfo && record.orderInfo.quantity) || 'N/A'}</span>;
            }
        },
        {
            title: 'Tokens',
            dataIndex: 'token',
            align: 'center',
            render(data) {
                return <span>{data}</span>;
            }
        },
        {
            title: 'Order Number',
            align: 'center',
            render: (record) => { var _a; return (((_a = record === null || record === void 0 ? void 0 : record.orderInfo) === null || _a === void 0 ? void 0 : _a.orderNumber) || 'N/A'); }
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            filters: [
                { text: 'Resolved', value: 'resolved' },
                { text: 'Pending', value: 'pending' },
                { text: 'Rejected', value: 'rejected' }
            ],
            onFilter: (value, record) => record.status.includes(value),
            render(status) {
                switch (status) {
                    case 'resolved':
                        return <antd_1.Tag color="green">Resolved</antd_1.Tag>;
                    case 'pending':
                        return <antd_1.Tag color="warning">Pending</antd_1.Tag>;
                    case 'rejected':
                        return <antd_1.Tag color="default">Rejected</antd_1.Tag>;
                    default:
                        return <antd_1.Tag color="default">Rejected</antd_1.Tag>;
                }
            }
        },
        {
            title: 'Last updated at',
            dataIndex: 'updatedAt',
            sorter: true,
            key: 'updatedAt',
            render(date) {
                return <span>{lib_1.formatDate(date)}</span>;
            }
        }
    ];
    return (<antd_1.Table columns={columns} rowKey={rowKey} dataSource={requests} pagination={{ total, pageSize }} onChange={onChange.bind(this)}/>);
};
exports.RefundRequestTable = RefundRequestTable;
