"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const lib_1 = require("src/lib");
const antd_1 = require("antd");
const react_1 = __importDefault(require("react"));
const button_update_status_member_1 = __importDefault(require("./button-update-status-member"));
const StudioModelsTable = ({ data, searching, total, pageSize, updateMemberStatus, onChange, placeholderAvatarUrl }) => {
    const columns = [
        {
            title: 'Avatar',
            key: 'avatar',
            dataIndex: 'avatar',
            render(avatar) {
                return (<img src={avatar || placeholderAvatarUrl || '/no-avatar.png'} style={{ width: '100px ' }} alt=""/>);
            }
        },
        {
            title: 'Email',
            key: 'email',
            dataIndex: 'email'
        },
        {
            title: 'Username',
            key: 'username',
            dataIndex: 'username'
        },
        {
            title: 'Age',
            key: 'age',
            dataIndex: 'dateOfBirth',
            render: (dateOfBirth) => lib_1.getAge(dateOfBirth)
        },
        {
            title: 'Gender',
            key: 'gender',
            dataIndex: 'gender'
        },
        {
            title: 'Country',
            key: 'country',
            dataIndex: 'country'
        },
        // {
        //   title: 'Total Stream Time',
        //   key: 'totalStreamTime',
        //   render(record) {
        //     return <span>{converDuration(record.stats.totalStreamTime)}</span>;
        //   }
        // },
        // {
        //   title: 'Earned',
        //   key: 'totalTokenEarned',
        //   render(record) {
        //     return <span>${record.stats.totalTokenEarned}</span>;
        //   }
        // },
        {
            title: 'Status',
            key: 'status',
            dataIndex: 'status',
            render(status) {
                switch (status) {
                    case 'active':
                        return <antd_1.Tag color="green">Active</antd_1.Tag>;
                    case 'inactive':
                        return <antd_1.Tag color="Red">Inactive</antd_1.Tag>;
                    case 'pending':
                        return <antd_1.Tag color="orange">Pending</antd_1.Tag>;
                    default:
                        return <antd_1.Tag color="orange">Pending</antd_1.Tag>;
                }
            }
        },
        {
            title: 'Actions',
            key: 'actions',
            render: (member) => (<button_update_status_member_1.default member={member} updateMemberStatus={updateMemberStatus}/>)
        }
    ];
    const dataSource = data.map((d) => (Object.assign(Object.assign({}, d), { key: d._id })));
    return (<antd_1.Table dataSource={dataSource} columns={columns} loading={searching} pagination={{ pageSize, total }} onChange={onChange} scroll={{ x: true }}/>);
};
StudioModelsTable.defaultProps = { placeholderAvatarUrl: '' };
exports.default = StudioModelsTable;
