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
const numberformat_1 = __importDefault(require("@components/common/layout/numberformat"));
const breakPoint = ['md'];
const EarningHistoryTable = ({ earnings, searching, total, pageSize, onChange }) => {
    const columns = [
        {
            title: 'Transaction',
            dataIndex: 'transactionTokenId',
            key: 'transaction',
            responsive: breakPoint,
            render: (transactionTokenId) => (transactionTokenId === null || transactionTokenId === void 0 ? void 0 : transactionTokenId.slice(16, 24).toUpperCase()) || 'N/A'
        },
        {
            title: 'From',
            dataIndex: 'sourceInfo',
            key: 'from',
            render: (sourceInfo) => (sourceInfo === null || sourceInfo === void 0 ? void 0 : sourceInfo.username) || 'N/A'
        },
        {
            title: 'Type',
            dataIndex: 'type',
            key: 'type',
            render: (type) => <antd_1.Tag color="magenta">{type}</antd_1.Tag>
        },
        {
            title: 'Gross Price',
            dataIndex: 'grossPrice',
            key: 'grossPrice',
            render: (grossPrice) => <numberformat_1.default value={grossPrice}/>,
            sorter: true
        },
        {
            title: 'Net Price',
            dataIndex: 'netPrice',
            key: 'netPrice',
            render: (netPrice) => <numberformat_1.default value={netPrice}/>,
            sorter: true
        },
        {
            title: 'Earned Money',
            dataIndex: 'price',
            key: 'price',
            render: (price) => <numberformat_1.default value={price}/>
        },
        {
            title: 'Percent',
            dataIndex: 'commission',
            key: 'commission'
        },
        {
            title: 'Is Paid?',
            key: 'isPaid',
            dataIndex: 'isPaid',
            render: (isPaid) => <span>{isPaid ? 'YES' : 'NO'}</span>
        },
        {
            title: 'Date',
            key: 'createdAt',
            dataIndex: 'createdAt',
            render: (createdAt) => <span>{lib_1.formatDate(createdAt)}</span>,
            sorter: true
        }
    ];
    const dataSource = earnings.map((p) => (Object.assign(Object.assign({}, p), { key: p._id })));
    return (<antd_1.Table dataSource={dataSource} columns={columns} className="table" pagination={{
            total,
            pageSize
        }} scroll={{ x: true }} showSorterTooltip={false} loading={searching} onChange={onChange}/>);
};
exports.default = EarningHistoryTable;
