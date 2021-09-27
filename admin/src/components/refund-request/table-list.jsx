"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const antd_1 = require("antd");
const date_1 = require("src/lib/date");
const RefundRequestTable = ({ rowKey, data, loading, pagination, onChange, updateStatus }) => {
    const columns = [
        {
            title: 'User',
            dataIndex: 'userId',
            key: 'userId',
            // sorter: true,
            render(data, record) {
                return (<span>{(record.userInfo && record.userInfo.username) || 'N/A'}</span>);
            }
        },
        {
            title: 'Performer',
            dataIndex: 'performerId',
            key: 'performerId',
            // sorter: true,
            render(data, record) {
                return (<span>
            {(record.performerInfo && record.performerInfo.username) || 'N/A'}
          </span>);
            }
        },
        {
            title: 'Product',
            dataIndex: 'sourceId',
            key: 'sourceId',
            // sorter: true,
            render(data, record) {
                return (<span>
            {(record.productInfo && record.productInfo.name) || 'N/A'}
          </span>);
            }
        },
        {
            title: 'Qty',
            dataIndex: 'sourceId',
            render(data, record) {
                return <span>{record.orderInfo && record.orderInfo.quantity || 'N/A'}</span>;
            }
        },
        {
            title: 'Token',
            dataIndex: 'token',
            align: 'center',
            key: 'token',
            sorter: true,
            render(data, record) {
                return <span>{data}</span>;
            }
        },
        {
            title: 'Order Number',
            align: 'center',
            render(data, record) {
                return <span>{record.orderInfo && record.orderInfo.orderNumber || 'N/A'}</span>;
            }
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            align: 'center',
            filters: [
                { text: 'Pending', value: 'pending' },
                { text: 'Resolved', value: 'resolved' },
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
                        return <antd_1.Tag color="volcano">Rejected</antd_1.Tag>;
                }
            }
        },
        {
            title: 'Last updated at',
            dataIndex: 'updatedAt',
            key: 'updatedAt',
            sorter: true,
            render(date) {
                return <span>{date_1.formatDate(date)}</span>;
            }
        },
        {
            title: 'Actions',
            dataIndex: '_id',
            fixed: 'right',
            render: (data, record) => {
                return (<antd_1.Select onChange={(value) => {
                        updateStatus(record._id, value);
                    }} defaultValue={record.status}>
            <antd_1.Select.Option key="pending" value="pending">
              Pending
            </antd_1.Select.Option>
            <antd_1.Select.Option key="resolved" value="resolved">
              Resolved
            </antd_1.Select.Option>
            <antd_1.Select.Option key="rejected" value="rejected">
              Rejected
            </antd_1.Select.Option>
          </antd_1.Select>);
            }
        }
    ];
    return (<antd_1.Table columns={columns} rowKey={rowKey} dataSource={data} loading={loading} pagination={pagination} onChange={onChange.bind(this)} scroll={{ x: 700, y: 650 }}/>);
};
exports.default = RefundRequestTable;
