"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const string_1 = require("@lib/string");
const antd_1 = require("antd");
const date_1 = require("src/lib/date");
const EarningTable = ({ dataSource, rowKey, loading, onChange, pagination }) => {
    const column = [
        {
            title: 'Transaction',
            dataIndex: 'transactionTokenId',
            key: 'transaction',
            render: (transactionTokenId) => string_1.formatId(transactionTokenId)
        },
        {
            title: 'From',
            dataIndex: 'userId',
            key: 'user',
            render(_, record) {
                return (<span>
            {(record.sourceInfo && record.sourceInfo.username) || 'N/A'}
          </span>);
            }
        },
        {
            title: 'To',
            dataIndex: 'performerId',
            key: 'owner',
            render(_, record) {
                return (<span>
            {(record.targetInfo && record.targetInfo.username) || 'N/A'}
          </span>);
            }
        },
        {
            title: 'Type',
            dataIndex: 'type',
            key: 'type',
            render(type) {
                switch (type) {
                    case 'sale_video':
                        return <antd_1.Tag color="magenta">Sale Video</antd_1.Tag>;
                    case 'sale_product':
                        return <antd_1.Tag color="volcano">Sale Product</antd_1.Tag>;
                    case 'sale_photo':
                        return <antd_1.Tag color="orange">Sale Photo</antd_1.Tag>;
                    case 'tip':
                        return <antd_1.Tag color="gold">Tip</antd_1.Tag>;
                    case 'stream_private':
                        return <antd_1.Tag color="blue">Private</antd_1.Tag>;
                    case 'stream_group':
                        return <antd_1.Tag color="green">Group</antd_1.Tag>;
                    default:
                        return <antd_1.Tag>{type}</antd_1.Tag>;
                }
            }
        },
        {
            title: 'Tokens',
            dataIndex: 'netPrice',
            key: 'netPrice',
            render: (netPrice) => netPrice.toFixed(2)
        },
        {
            title: 'Percent',
            dataIndex: 'commission',
            key: 'commission',
            render(commission) {
                return <span>{commission}%</span>;
            }
        },
        {
            title: 'Conversion Rate',
            dataIndex: 'conversionRate',
            key: 'conversionRate'
        },
        {
            title: 'Earned',
            key: 'earned',
            render: ({ netPrice, conversionRate }) => (netPrice * conversionRate).toFixed(2)
        },
        {
            title: 'Is Paid',
            dataIndex: 'isPaid',
            key: 'isPaid',
            render(isPaid) {
                return (<span>
            {isPaid ? (<antd_1.Tag color="green">Yes</antd_1.Tag>) : (<antd_1.Tag color="orange">No</antd_1.Tag>)}
          </span>);
            }
        },
        {
            title: 'Date',
            key: 'createdAt',
            dataIndex: 'createdAt',
            render: (createdAt) => date_1.formatDate(createdAt),
            sorter: true
        }
    ];
    return (<>
      <antd_1.Table columns={column} dataSource={dataSource} rowKey={rowKey} loading={loading} onChange={onChange.bind(this)} pagination={pagination} scroll={{ x: 1300, y: 500 }}/>
    </>);
};
exports.default = EarningTable;
