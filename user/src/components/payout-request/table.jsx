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
const link_1 = __importDefault(require("next/link"));
const lib_1 = require("src/lib");
const breakPoint = ['md'];
const format = 'DD/MM/YYYY';
const PayoutRequestList = ({ payouts, searching, total, pageSize, role, onChange }) => {
    const columns = [
        {
            title: 'Pay Period',
            key: 'payPeriod',
            responsive: breakPoint,
            render: ({ fromDate, toDate }) => (<span>
          {`${lib_1.formatDate(fromDate, format)} - ${lib_1.formatDate(toDate, format)}`}
        </span>)
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            render: (status) => <antd_1.Tag color="magenta">{status}</antd_1.Tag>
        },
        {
            title: 'Date Requested',
            key: 'createdAt',
            dataIndex: 'createdAt',
            render: (createdAt) => <span>{lib_1.formatDate(createdAt)}</span>,
            sorter: true
        },
        {
            title: 'Payment Details',
            key: 'details',
            render: (request) => (<link_1.default href={{
                    pathname: role === 'studio'
                        ? '/studio/payout-requests/update'
                        : '/account/performer/payout-requests/update',
                    query: {
                        // eslint-disable-next-line react/destructuring-assignment
                        id: request._id,
                        data: JSON.stringify(request)
                    }
                }} as={role === 'studio'
                    // eslint-disable-next-line react/destructuring-assignment
                    ? `/studio/payout-requests/${request._id}/update`
                    // eslint-disable-next-line react/destructuring-assignment
                    : `/account/performer/payout-requests/${request._id}/update`}>
          <a>Click here to know more</a>
        </link_1.default>)
        }
    ];
    const dataSource = payouts.map((p) => (Object.assign(Object.assign({}, p), { key: p._id })));
    return (<antd_1.Table dataSource={dataSource} columns={columns} className="table" pagination={{
            total,
            pageSize
        }} scroll={{ x: true }} showSorterTooltip={false} loading={searching} onChange={onChange}/>);
};
PayoutRequestList.defaultProps = {
    role: ''
};
exports.default = PayoutRequestList;
