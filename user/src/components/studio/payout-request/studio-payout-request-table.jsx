"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const React = __importStar(require("react"));
const antd_1 = require("antd");
const lib_1 = require("src/lib");
const icons_1 = require("@ant-design/icons");
const router_1 = __importDefault(require("next/router"));
const breakPoint = ['md'];
const StudioPayoutRequestTable = ({ requests, searching, total, pageSize, onChange, showDetail }) => {
    const columns = [
        {
            title: 'Date',
            key: 'daterange',
            responsive: breakPoint,
            render(data, record) {
                return (<span>
            {`${lib_1.formatDate(record.fromDate, 'DD/MM/YYYY')} - ${lib_1.formatDate(record.toDate, 'DD/MM/YYYY')}`}
          </span>);
            }
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            render(status) {
                switch (status) {
                    case 'pending':
                        return <antd_1.Tag color="orange">Pending</antd_1.Tag>;
                    case 'approved':
                        return <antd_1.Tag color="blue">Approved</antd_1.Tag>;
                    case 'cancelled':
                        return <antd_1.Tag color="volcano">Canceled</antd_1.Tag>;
                    case 'completed':
                        return <antd_1.Tag color="green">Completed</antd_1.Tag>;
                    default:
                        return <antd_1.Tag color="green">Completed</antd_1.Tag>;
                }
            }
        },
        {
            title: 'Request Date',
            key: 'createdAt',
            dataIndex: 'createdAt',
            render(data, record) {
                return <span>{lib_1.formatDate(record.fromDate)}</span>;
            }
        },
        {
            title: 'Action',
            dataIndex: 'performer',
            key: 'performer',
            render(data, record) {
                const { id } = record === null || record === void 0 ? void 0 : record._id;
                return (<antd_1.Space>
            <icons_1.EyeOutlined onClick={() => showDetail(record)}/>
            <icons_1.EditOutlined onClick={() => router_1.default.push(`/studio/payout-requests/update?id=${id}`)}/>
          </antd_1.Space>);
            }
        }
    ];
    const dataSource = requests.map((p) => (Object.assign(Object.assign({}, p), { key: p._id })));
    return (<antd_1.Table dataSource={dataSource} columns={columns} className="table" pagination={{
            total,
            pageSize
        }} scroll={{ x: true }} showSorterTooltip={false} loading={searching} onChange={onChange}/>);
};
StudioPayoutRequestTable.defaultProps = {
    showDetail: null
};
exports.default = StudioPayoutRequestTable;
