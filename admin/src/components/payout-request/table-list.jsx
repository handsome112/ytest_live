"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const antd_1 = require("antd");
const date_1 = require("src/lib/date");
const link_1 = __importDefault(require("next/link"));
const icons_1 = require("@ant-design/icons");
const PayoutRequestTable = ({ rowKey, data, loading, pagination, onChange }) => {
    const columns = [
        {
            title: 'From',
            key: 'username',
            // sorter: true,
            render(_, record) {
                var _a, _b;
                return (<span>
            {((_a = record.performerInfo) === null || _a === void 0 ? void 0 : _a.username) ||
                        ((_b = record.studioInfo) === null || _b === void 0 ? void 0 : _b.username) ||
                        'N/A'}
          </span>);
            }
        },
        {
            title: 'Pay Period',
            dataIndex: 'fromDate',
            key: 'fromDate',
            render(data, record) {
                return (<span>
            {date_1.formatDate(record.fromDate, 'DD/MM/YYYY')} -{' '}
            {date_1.formatDate(record.toDate, 'DD/MM/YYYY')}
          </span>);
            }
        },
        {
            title: 'Total Token',
            dataIndex: 'tokenMustPay',
            align: 'center',
            key: 'tokenMustPay',
            sorter: true
        },
        {
            title: 'Paid Token',
            dataIndex: 'previousPaidOut',
            align: 'center',
            key: 'pendingToken',
            sorter: true
        },
        {
            title: 'Remainning Token',
            dataIndex: 'pendingToken',
            align: 'center',
            key: 'pendingToken',
            sorter: true
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            align: 'center',
            // sotrter: true,
            // filterMultiple: false,
            // filters: [
            // { text: 'Pending', value: 'pending' },
            // { text: 'Resolved', value: 'resolved' },
            // { text: 'Rejected', value: 'rejected' },
            // { text: 'Done', value: 'done' }
            // ],
            // onFilter: (value: string, record: IPayoutRequest) =>
            //   record.status.includes(value),
            render(status) {
                switch (status) {
                    case 'approved':
                        return <antd_1.Tag color="blue">Approved</antd_1.Tag>;
                    case 'pending':
                        return <antd_1.Tag color="warning">Pending</antd_1.Tag>;
                    case 'rejected':
                        return <antd_1.Tag color="volcano">Rejected</antd_1.Tag>;
                    case 'done':
                        return <antd_1.Tag color="green">Done</antd_1.Tag>;
                }
            }
        },
        {
            title: 'Created At',
            dataIndex: 'createdAt',
            key: 'createdAt',
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
                return (<link_1.default href={{ pathname: '/payout-request/detail', query: { id } }}>
            <a>
              <icons_1.EyeOutlined></icons_1.EyeOutlined>
            </a>
          </link_1.default>);
            }
        }
    ];
    return (<antd_1.Table columns={columns} rowKey={rowKey} dataSource={data} loading={loading} pagination={pagination} onChange={onChange.bind(this)} scroll={{ x: 700, y: 650 }}/>);
};
exports.default = PayoutRequestTable;
