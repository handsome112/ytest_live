"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TableListBanner = void 0;
const react_1 = require("react");
const antd_1 = require("antd");
const icons_1 = require("@ant-design/icons");
const date_1 = require("@lib/date");
const link_1 = __importDefault(require("next/link"));
const thumbnail_banner_1 = require("@components/banner/thumbnail-banner");
const dropdown_action_1 = require("@components/common/dropdown-action");
class TableListBanner extends react_1.PureComponent {
    render() {
        const { deleteBanner } = this.props;
        const columns = [
            {
                title: '',
                dataIndex: 'thumbnail',
                render(data, record) {
                    return <thumbnail_banner_1.ThumbnailBanner banner={record}/>;
                }
            },
            {
                title: 'Title',
                dataIndex: 'title',
                sorter: true
            },
            {
                title: 'Position',
                dataIndex: 'position',
                sorter: true
            },
            {
                title: 'Status',
                dataIndex: 'status',
                sorter: true,
                render(status) {
                    switch (status) {
                        case 'active':
                            return <antd_1.Tag color="green">Active</antd_1.Tag>;
                        case 'inactive':
                            return <antd_1.Tag color="red">Inactive</antd_1.Tag>;
                        default: return <antd_1.Tag color="default">{status}</antd_1.Tag>;
                    }
                }
            },
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
                render: (id) => (<dropdown_action_1.DropdownAction menuOptions={[
                        {
                            key: 'update',
                            name: 'Update',
                            children: (<link_1.default href={{
                                    pathname: '/banner/update',
                                    query: { id }
                                }} as={`/banner/update?id=${id}`}>
                    <a>
                      <icons_1.EditOutlined />
                      {' '}
                      Update
                    </a>
                  </link_1.default>)
                        },
                        {
                            key: 'delete',
                            name: 'Delete',
                            children: (<span>
                    <icons_1.DeleteOutlined />
                    {' '}
                    Delete
                  </span>),
                            onClick: () => deleteBanner && deleteBanner(id)
                        }
                    ]}/>)
            }
        ];
        const { dataSource, rowKey, loading, pagination, onChange } = this.props;
        return (<antd_1.Table dataSource={dataSource} columns={columns} rowKey={rowKey} loading={loading} pagination={pagination} onChange={onChange.bind(this)} scroll={{ x: 700, y: 650 }}/>);
    }
}
exports.TableListBanner = TableListBanner;
