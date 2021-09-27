"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TableListPaymentInformation = void 0;
const react_1 = require("react");
const antd_1 = require("antd");
const dropdown_action_1 = require("@components/common/dropdown-action");
const icons_1 = require("@ant-design/icons");
const date_1 = require("@lib/date");
class TableListPaymentInformation extends react_1.PureComponent {
    render() {
        const { dataSource, rowKey, loading, pagination, onChange, onViewDeital } = this.props;
        const columns = [
            {
                title: 'Username',
                dataIndex: 'sourceInfo',
                key: 'username',
                render: (sourceInfo) => sourceInfo === null || sourceInfo === void 0 ? void 0 : sourceInfo.username
            },
            {
                title: 'Role',
                dataIndex: 'sourceType',
                key: 'sourceType'
            },
            {
                title: 'Type',
                dataIndex: 'type',
                key: 'type'
            },
            {
                title: 'Last update',
                dataIndex: 'updatedAt',
                sorter: true,
                render(date) {
                    return <span>{date_1.formatDate(date, 'DD/MM/YYYY HH:mm')}</span>;
                }
            },
            {
                title: 'Actions',
                fixed: 'right',
                render(record) {
                    return (<dropdown_action_1.DropdownAction menuOptions={[
                            {
                                key: 'view',
                                name: 'View',
                                children: (<span>
                      <icons_1.EyeOutlined /> View
                    </span>),
                                onClick: () => onViewDeital(record._id)
                            }
                        ]}/>);
                }
            }
        ];
        return (<antd_1.Table dataSource={dataSource} columns={columns} rowKey={rowKey} loading={loading} pagination={pagination} onChange={onChange.bind(this)} scroll={{ x: 700, y: 650 }}/>);
    }
}
exports.TableListPaymentInformation = TableListPaymentInformation;
