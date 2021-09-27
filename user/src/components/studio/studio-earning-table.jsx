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
Object.defineProperty(exports, "__esModule", { value: true });
const React = __importStar(require("react"));
const antd_1 = require("antd");
const breakPoint = ['md'];
const EarningHistoryTable = ({ earnings, searching, total, pageSize, onChange }) => {
    const columns = [
        {
            title: 'Commission Time',
            key: 'daterange',
            responsive: breakPoint,
            render(data, record) {
                return <span>{`${record.fromDate} - ${record.toDate}`}</span>;
            }
        },
        {
            title: 'Amount',
            dataIndex: 'amount',
            key: 'amount'
        },
        {
            title: 'Type',
            key: 'type',
            dataIndex: 'type'
        },
        {
            title: 'From',
            dataIndex: 'performer',
            key: 'performer'
        },
        {
            title: 'Date & Time',
            dataIndex: 'time',
            key: 'time'
        }
    ];
    const dataSource = earnings.map((p) => (Object.assign(Object.assign({}, p), { key: p._id })));
    return (<antd_1.Table dataSource={dataSource} columns={columns} className="table" pagination={{
            total,
            pageSize
        }} scroll={{ x: true }} showSorterTooltip={false} loading={searching} onChange={onChange}/>);
};
exports.default = EarningHistoryTable;
