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
const icons_1 = require("@ant-design/icons");
const breakPoint = ['md'];
const EarningHistoryTable = ({ commissions, searching, total, pageSize, onChange, deleteCommission }) => {
    const columns = [
        {
            title: 'Performer',
            dataIndex: 'performer',
            key: 'performer',
            responsive: breakPoint
        },
        {
            title: '(%) Commission',
            dataIndex: 'commission',
            key: 'performer'
        },
        {
            title: 'Active Date',
            key: 'activeDate',
            dataIndex: 'activeDate'
        },
        {
            title: 'Acions',
            dataIndex: '_id',
            render: (id) => (<span>
          <icons_1.DeleteOutlined onClick={() => deleteCommission(id)}/>
        </span>)
        }
    ];
    const dataSource = commissions.map((p) => (Object.assign(Object.assign({}, p), { key: p._id })));
    return (<antd_1.Table dataSource={dataSource} columns={columns} className="table" pagination={{
            total,
            pageSize
        }} scroll={{ x: true }} showSorterTooltip={false} loading={searching} onChange={onChange}/>);
};
exports.default = EarningHistoryTable;
