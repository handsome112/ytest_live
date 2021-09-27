"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TableListVideo = void 0;
const react_1 = require("react");
const antd_1 = require("antd");
const icons_1 = require("@ant-design/icons");
const date_1 = require("@lib/date");
const link_1 = __importDefault(require("next/link"));
const thumbnail_video_1 = require("@components/video/thumbnail-video");
const dropdown_action_1 = require("@components/common/dropdown-action");
class TableListVideo extends react_1.PureComponent {
    render() {
        const columns = [
            {
                title: '',
                dataIndex: 'thumbnail',
                render(data, record) {
                    return <thumbnail_video_1.ThumbnailVideo video={record}/>;
                }
            },
            {
                title: 'Title',
                dataIndex: 'title',
                sorter: true
            },
            {
                title: 'Token',
                dataIndex: 'token',
                sorter: true,
                render(token) {
                    return <span>{token}</span>;
                }
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
                    }
                    return <antd_1.Tag color="default">{status}</antd_1.Tag>;
                }
            },
            {
                title: 'Performer',
                dataIndex: 'performer',
                render(data, record) {
                    return <span>{record.performer && record.performer.username}</span>;
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
                render: (id) => {
                    return (<dropdown_action_1.DropdownAction menuOptions={[
                            {
                                key: 'update',
                                name: 'Update',
                                children: (<link_1.default href={{
                                        pathname: '/video/update',
                                        query: { id }
                                    }} as={`/video/update?id=${id}`}>
                      <a>
                        <icons_1.EditOutlined /> Update
                      </a>
                    </link_1.default>)
                            }
                            // {
                            //   key: 'delete',
                            //   name: 'Delete',
                            //   children: (
                            //     <span>
                            //       <DeleteOutlined /> Delete
                            //     </span>
                            //   ),
                            //   onClick: () =>
                            //     this.props.deleteVideo && this.props.deleteVideo(id)
                            // }
                        ]}/>);
                }
            }
        ];
        const { dataSource, rowKey, loading, pagination, onChange } = this.props;
        return (<antd_1.Table dataSource={dataSource} columns={columns} rowKey={rowKey} loading={loading} pagination={pagination} onChange={onChange.bind(this)} scroll={{ x: 700, y: 650 }}/>);
    }
}
exports.TableListVideo = TableListVideo;
