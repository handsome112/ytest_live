"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TableListPaymentTransaction = void 0;
const react_1 = require("react");
const antd_1 = require("antd");
const date_1 = require("@lib/date");
class TableListPaymentTransaction extends react_1.PureComponent {
    render() {
        const columns = [
            {
                title: 'Transaction ID',
                dataIndex: '_id',
                key: 'user',
                render(_id) {
                    return (<div>
              {_id.slice(16, 24).toUpperCase()}
            </div>);
                }
            },
            {
                title: 'Buyer',
                dataIndex: 'buyerInfo',
                key: 'buyerId',
                render(buyerInfo) {
                    return (<div>
              {buyerInfo === null || buyerInfo === void 0 ? void 0 : buyerInfo.username}
              <br />
              {buyerInfo === null || buyerInfo === void 0 ? void 0 : buyerInfo.email}
            </div>);
                }
            },
            {
                title: 'Description',
                render(data, record) {
                    return record.products.map((re, index) => (<p key={index}>
              <span>{re.name}</span> <br />
              <small>{re.description}</small>
            </p>));
                }
            },
            {
                title: 'Payment gateway',
                dataIndex: 'paymentGateway',
                sorter: true,
                render(data, record) {
                    return <antd_1.Tag color="orange">{record.paymentGateway}</antd_1.Tag>;
                }
            },
            {
                title: 'Original price',
                dataIndex: 'originalPrice',
                sorter: true,
                render(data, record) {
                    return (<span>
              $
              {(record.originalPrice && record.originalPrice.toFixed(2)) ||
                            record.totalPrice.toFixed(2)}
            </span>);
                }
            },
            {
                title: 'End Price',
                dataIndex: 'totalPrice',
                sorter: true,
                render(data, record) {
                    return (<span>${record.totalPrice && record.totalPrice.toFixed(2)}</span>);
                }
            },
            {
                title: 'Discount',
                dataIndex: 'couponInfo',
                sorter: true,
                render(data, record) {
                    return record.couponInfo ? (<span>
              {`${record.couponInfo.value * 100}%`} - $
              {(record.originalPrice * record.couponInfo.value).toFixed(2)}
            </span>) : ('');
                }
            },
            {
                title: 'Type',
                dataIndex: 'type',
                sorter: true,
                render(type) {
                    return <antd_1.Tag color="orange">{type}</antd_1.Tag>;
                }
            },
            {
                title: 'Payment status',
                dataIndex: 'status',
                sorter: true,
                render(status) {
                    switch (status) {
                        case 'pending':
                            return <antd_1.Tag color="orange">Pending</antd_1.Tag>;
                        case 'success':
                            return <antd_1.Tag color="green">Success</antd_1.Tag>;
                        case 'cancel':
                            return <antd_1.Tag color="red">Cancel</antd_1.Tag>;
                        default:
                            return <antd_1.Tag color="red">Pending</antd_1.Tag>;
                    }
                }
            },
            {
                title: 'Last update',
                dataIndex: 'updatedAt',
                sorter: true,
                fixed: 'right',
                render(date) {
                    return <span>{date_1.formatDate(date)}</span>;
                }
            }
        ];
        const { dataSource, rowKey, loading, pagination, onChange } = this.props;
        return (<antd_1.Table dataSource={dataSource} columns={columns} rowKey={rowKey} loading={loading} pagination={pagination} onChange={onChange.bind(this)} scroll={{ x: 700, y: 650 }}/>);
    }
}
exports.TableListPaymentTransaction = TableListPaymentTransaction;
