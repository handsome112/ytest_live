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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StatusTitle = void 0;
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
const React = __importStar(require("react"));
const antd_1 = require("antd");
const lib_1 = require("src/lib");
const services_1 = require("src/services");
const icons_1 = require("@ant-design/icons");
class StatusTitle extends React.PureComponent {
    render() {
        return <icons_1.EditOutlined />;
    }
}
exports.StatusTitle = StatusTitle;
const { Option } = antd_1.Select;
const STUDIO_PAYOUT_REQUEST_STATUS = [
    { lable: 'Pending', key: 'pending' },
    { lable: 'Approved', key: 'approved' },
    { lable: 'Rejected', key: 'rejected' },
    { lable: 'Done', key: 'done' }
];
const EditableCell = (_a) => {
    var { 
    // title,
    editable, children, 
    // dataIndex,
    record, handleSave } = _a, props = __rest(_a, ["editable", "children", "record", "handleSave"]);
    const [editing, setEditing] = React.useState(false);
    let childNode = children;
    const toggleEdit = () => {
        setEditing(!editing);
    };
    if (editable) {
        childNode = editing ? (<antd_1.Select defaultValue={record.status} onChange={async (value) => {
                await handleSave(Object.assign(Object.assign({}, record), { status: value }));
                toggleEdit();
            }}>
        {STUDIO_PAYOUT_REQUEST_STATUS.map((s) => (<Option key={s.key} value={s.key}>
            {s.lable}
          </Option>))}
      </antd_1.Select>) : (<div className="" style={{
                paddingRight: 24,
                cursor: 'pointer'
            }} onMouseEnter={toggleEdit} onClick={toggleEdit}>
        {children}
      </div>);
    }
    return <td {...props}>{childNode}</td>;
};
const breakPoint = ['md'];
const format = 'DD/MM/YYYY';
const PayoutRequestList = ({ payouts, searching, total, pageSize, onChange }) => {
    const [dataSource, setDataSource] = React.useState([]);
    const columns = [
        {
            title: 'Name',
            key: 'q',
            dataIndex: 'performerInfo',
            render: ({ name }) => name
        },
        {
            title: 'Pay Period',
            key: 'payPeriod',
            responsive: breakPoint,
            render: ({ fromDate, toDate }) => (<span>
          {lib_1.formatDate(fromDate, format)}
          {' '}
          -
          {lib_1.formatDate(toDate, format)}
        </span>),
            editable: false
        },
        {
            title: 'Payment Account Type',
            key: 'paymentAccountType',
            dataIndex: 'paymentAccountType',
            editable: false
        },
        {
            title: 'Tokens',
            key: 'tokenMustPay',
            dataIndex: 'tokenMustPay',
            editable: false
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            render: (status) => (<antd_1.Tag color="magenta" style={{ cursor: 'pointer' }}>
          {status}
        </antd_1.Tag>),
            editable: true
        },
        {
            title: 'Date Requested',
            key: 'createdAt',
            dataIndex: 'createdAt',
            render: (createdAt) => <span>{lib_1.formatDate(createdAt)}</span>,
            sorter: true,
            editable: false
        }
    ];
    const save = async (request) => {
        try {
            await services_1.studioService.updateStatusPerformerRequest(request._id, {
                status: request.status
            });
            const newData = [...dataSource];
            const item = newData.find((d) => d.key === request._id);
            item.status = request.status;
            setDataSource(newData);
            antd_1.message.success('Update Status Success');
        }
        catch (e) {
            const error = await Promise.resolve(e);
            antd_1.message.error(lib_1.getResponseError(error));
        }
    };
    const mergeColumn = columns.map((c) => (Object.assign(Object.assign({}, c), { onCell: (record) => ({
            record,
            editable: c.editable,
            dataIndex: c.dataIndex,
            title: c.title,
            handleSave: save
        }) })));
    React.useEffect(() => {
        setDataSource(payouts.map((p) => (Object.assign(Object.assign({}, p), { key: p._id }))));
    }, [payouts]);
    return (<antd_1.Table dataSource={dataSource} components={{ body: { cell: EditableCell } }} rowClassName={() => 'editable-row'} columns={mergeColumn} className="table" pagination={{
            total,
            pageSize
        }} scroll={{ x: true }} showSorterTooltip={false} loading={searching} onChange={onChange}/>);
};
exports.default = PayoutRequestList;
