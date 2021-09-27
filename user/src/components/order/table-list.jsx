"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const antd_1 = require("antd");
const react_1 = __importDefault(require("react"));
const icons_1 = require("@ant-design/icons");
const date_1 = require("@lib/date");
const link_1 = __importDefault(require("next/link"));
const performer_1 = require("@components/performer");
const numberformat_1 = __importDefault(require("@components/common/layout/numberformat"));
const order_status_1 = require("./order-status");
const OrderTableList = ({ dataSource, pagination, rowKey, loading, onChange, type }) => {
    const columns = [
        {
            title: 'Number',
            dataIndex: 'orderNumber',
            key: 'orderNumber',
            responsive: ['sm']
        },
        {
            title: `${type === 'user' ? 'Seller' : 'Buyer'}`,
            dataIndex: `${type === 'user' ? 'performerId' : 'userId'}`,
            key: `${type === 'user' ? 'performerId' : 'userId'}`,
            sorter: true,
            render(data, record) {
                var _a;
                if (type === 'user') {
                    if (record.sellerSource === 'system')
                        return <span>System</span>;
                    return (record === null || record === void 0 ? void 0 : record.sellerInfo) ? (<performer_1.PerformerUsername performer={record.sellerInfo}/>) : (<span>N/A</span>);
                }
                return ((_a = record === null || record === void 0 ? void 0 : record.buyerInfo) === null || _a === void 0 ? void 0 : _a.username) || 'N/A';
            }
        },
        {
            title: 'Item',
            dataIndex: 'name',
            key: 'name',
            render(name, record) {
                return (<div style={{
                        wordWrap: 'break-word',
                        wordBreak: 'break-word'
                    }}>
            <strong>{name}</strong>
            <br />
            <small>{record.description}</small>
          </div>);
            }
        },
        {
            title: 'Type',
            dataIndex: 'type',
            sorter: true,
            key: 'type'
        },
        {
            title: 'Quantity',
            dataIndex: 'quantity',
            sorter: true,
            key: 'quantity',
            render(quantity) {
                return <span>{quantity}</span>;
            }
        },
        {
            title: 'Total Price (tokens)',
            dataIndex: 'totalPrice',
            sorter: true,
            key: 'totalPrice',
            render(data, record) {
                if (record.payBy === 'token') {
                    return (<span>
              <numberformat_1.default value={record.totalPrice}/>
              {' '}
              token(s)
            </span>);
                }
                return (<span>
            $
            <numberformat_1.default value={record.totalPrice}/>
          </span>);
            }
        },
        {
            title: 'Delivery Status',
            dataIndex: 'deliveryStatus',
            key: 'deliveryStatus',
            sorter: true,
            render(status) {
                return <order_status_1.OrderStatus status={status}/>;
            }
        },
        {
            title: 'Last updated at',
            dataIndex: 'createdAt',
            sorter: true,
            key: 'createdAt',
            render(date) {
                return <span>{date_1.formatDate(date)}</span>;
            }
        },
        {
            title: 'Actions',
            dataIndex: '_id',
            render(id) {
                return (<link_1.default href={{ pathname: `/account/${type}/orders/detail`, query: { id } }}>
            <a>
              <icons_1.EyeOutlined />
            </a>
          </link_1.default>);
            }
        }
    ];
    return (<antd_1.Table dataSource={dataSource} columns={columns} pagination={pagination} rowKey={rowKey} loading={loading} onChange={onChange.bind(this)} scroll={{ x: 1300 }}/>);
};
exports.default = OrderTableList;
