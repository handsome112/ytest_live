"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const antd_1 = require("antd");
const icons_1 = require("@ant-design/icons");
const date_1 = require("@lib/date");
const link_1 = __importDefault(require("next/link"));
const OrderTableList = ({ dataSource, pagination, rowKey, loading, onChange }) => {
    const columns = [
        {
            title: 'Buyer',
            dataIndex: 'buyerId',
            key: 'buyerInfo',
            sorter: true,
            render(data, record) {
                var _a;
                return <p>
          <span>@{((_a = record === null || record === void 0 ? void 0 : record.buyerInfo) === null || _a === void 0 ? void 0 : _a.username) || 'N/A'}</span>
        </p>;
            }
        },
        {
            title: 'Seller',
            dataIndex: 'sellerInfo',
            key: 'sellerInfo',
            sorter: true,
            render(sellerInfo, record) {
                if (record.sellerSource === 'system')
                    return 'System';
                return (<span>
            @{(sellerInfo === null || sellerInfo === void 0 ? void 0 : sellerInfo.username) || 'N/A'}
          </span>);
            }
        },
        {
            title: 'Product info',
            dataIndex: 'name',
            sorter: false,
            render(q, record) {
                return <p>
          <span>{record.name}</span> <br />
          <small>{record.description}</small>
        </p>;
            }
        },
        {
            title: 'Quantity',
            dataIndex: 'quantity',
            sorter: true,
            render(quantity) {
                return <span>{quantity}</span>;
            }
        },
        {
            title: 'Total Price (token)',
            dataIndex: 'totalPrice',
            sorter: true,
            render(totalPrice) {
                return <span>{totalPrice === null || totalPrice === void 0 ? void 0 : totalPrice.toFixed(2)}</span>;
            }
        },
        {
            title: 'Delivery Status',
            dataIndex: 'deliveryStatus',
            render(status) {
                switch (status) {
                    case 'processing':
                        return <antd_1.Tag color="default">Processing</antd_1.Tag>;
                    case 'shipping':
                        return <antd_1.Tag color="warning">Shipping</antd_1.Tag>;
                    case 'delivered':
                        return <antd_1.Tag color="success">Delivered</antd_1.Tag>;
                    case 'refunded':
                        return <antd_1.Tag color="volcano">Refunded</antd_1.Tag>;
                }
            }
        },
        {
            title: 'Last updated at',
            dataIndex: 'createdAt',
            sorter: true,
            render(date) {
                return <span>{date_1.formatDate(date)}</span>;
            }
        },
        {
            title: 'Actions',
            dataIndex: '_id',
            fixed: 'right',
            sorter: true,
            render(id) {
                return (<link_1.default href={{ pathname: '/order/detail', query: { id } }}>
            <a>
              <icons_1.EyeOutlined></icons_1.EyeOutlined>
            </a>
          </link_1.default>);
            }
        }
    ];
    return (<antd_1.Table dataSource={dataSource} columns={columns} pagination={pagination} rowKey={rowKey} loading={loading} onChange={onChange.bind(this)}/>);
};
exports.default = OrderTableList;
