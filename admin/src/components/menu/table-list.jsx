"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TableListMenu = void 0;
const react_1 = require("react");
const antd_1 = require("antd");
const icons_1 = require("@ant-design/icons");
const date_1 = require("@lib/date");
const link_1 = __importDefault(require("next/link"));
const dropdown_action_1 = require("@components/common/dropdown-action");
class TableListMenu extends react_1.PureComponent {
    render() {
        const columns = [
            {
                title: 'Title',
                dataIndex: 'title',
                sorter: true
            },
            {
                title: 'Path',
                dataIndex: 'path',
                sorter: true
            },
            {
                title: 'Ordering',
                dataIndex: 'ordering',
                sorter: true
            },
            // {
            //   title: 'Public',
            //   dataIndex: 'public',
            //   sorter: true,
            //   render(isPublic: boolean) {
            //     switch (isPublic) {
            //       case true:
            //         return <Tag color="green">Yes</Tag>;
            //       case false:
            //         return <Tag color="red">No</Tag>;
            //     }
            //   }
            // },
            {
                title: 'Last update',
                dataIndex: 'updatedAt',
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
                    return (<dropdown_action_1.DropdownAction menuOptions={[
                            {
                                key: 'update',
                                name: 'Update',
                                children: (<link_1.default href={{
                                        pathname: '/menu/update',
                                        query: { id: record._id }
                                    }} as={`/menu/update?id=${record._id}`}>
                      <a>
                        <icons_1.EditOutlined /> Update
                      </a>
                    </link_1.default>)
                            },
                            {
                                key: 'delete',
                                name: 'Delete',
                                children: (<span>
                      <icons_1.DeleteOutlined /> Delete
                    </span>),
                                onClick: () => this.props.deleteMenu && this.props.deleteMenu(record._id)
                            }
                        ]}/>);
                }
            }
        ];
        const { dataSource, rowKey, loading, pagination, onChange } = this.props;
        return (<antd_1.Table dataSource={dataSource} columns={columns} rowKey={rowKey} loading={loading} pagination={pagination} onChange={onChange.bind(this)} scroll={{ x: 700, y: 650 }}/>);
    }
}
exports.TableListMenu = TableListMenu;
