"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const lib_1 = require("src/lib");
const antd_1 = require("antd");
const react_1 = __importDefault(require("react"));
const StudioCommissionsTable = ({ data, searching, total, pageSize, update, onChange }) => {
    const columns = [
        {
            title: 'Username',
            key: 'username',
            dataIndex: 'username'
        },
        {
            title: 'Commission',
            key: 'commission',
            dataIndex: 'commissionSetting',
            render(commissionSetting) {
                const { memberCommission } = commissionSetting;
                return (<span>
            {memberCommission}
            %
          </span>);
            }
        },
        {
            title: 'Created At',
            key: 'studioCommission',
            dataIndex: 'createdAt',
            render(createdAt) {
                return <span>{lib_1.formatDate(createdAt)}</span>;
            }
        },
        {
            title: 'Actions',
            key: 'actions',
            dataIndex: '_id',
            render: (_id) => (<antd_1.Button type="primary" onClick={() => update(_id)}>
          Update
        </antd_1.Button>)
        }
    ];
    const dataSource = data.map((d) => (Object.assign(Object.assign({}, d), { key: d._id })));
    return (<antd_1.Table dataSource={dataSource} columns={columns} loading={searching} pagination={{ pageSize, total }} onChange={onChange} scroll={{ x: true }}/>);
};
exports.default = StudioCommissionsTable;
