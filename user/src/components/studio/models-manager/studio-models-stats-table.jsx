"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const lib_1 = require("src/lib");
const antd_1 = require("antd");
const StudioModelStatsTable = ({ data, searching, total, pageSize, onChange }) => {
    const columns = [
        {
            title: 'Username',
            key: 'username',
            dataIndex: 'username'
        },
        {
            title: 'Total Favorite',
            key: 'totalFavorite',
            render: (record) => { var _a; return ((_a = record === null || record === void 0 ? void 0 : record.stats) === null || _a === void 0 ? void 0 : _a.favorites) || 0; }
        },
        {
            title: 'Total Galleries',
            key: 'totalGalleries',
            render: (record) => { var _a; return ((_a = record === null || record === void 0 ? void 0 : record.stats) === null || _a === void 0 ? void 0 : _a.totalGalleries) || 0; }
        },
        {
            title: 'Total Photos',
            key: 'totalPhotos',
            render: (record) => { var _a; return ((_a = record === null || record === void 0 ? void 0 : record.stats) === null || _a === void 0 ? void 0 : _a.totalPhotos) || 0; }
        },
        {
            title: 'Total Product',
            key: 'totalProducts',
            render: (record) => { var _a; return ((_a = record === null || record === void 0 ? void 0 : record.stats) === null || _a === void 0 ? void 0 : _a.totalProducts) || 0; }
        },
        {
            title: 'Total Videos',
            key: 'totalVideos',
            render: (record) => { var _a; return ((_a = record === null || record === void 0 ? void 0 : record.stats) === null || _a === void 0 ? void 0 : _a.totalVideos) || 0; }
        },
        {
            title: 'Total Stream Time',
            key: 'totalStreamTime',
            render: (record) => { var _a; return lib_1.converDuration(((_a = record === null || record === void 0 ? void 0 : record.stats) === null || _a === void 0 ? void 0 : _a.totalStreamTime) || 0); }
        },
        {
            title: 'Total Earned',
            key: 'totalTokenEarned',
            render: (record) => { var _a; return (_a = record === null || record === void 0 ? void 0 : record.stats) === null || _a === void 0 ? void 0 : _a.totalTokenEarned; }
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            render: (status) => <span style={{ textTransform: 'capitalize' }}>{status}</span>
        }
    ];
    const dataSource = data.map((d) => (Object.assign(Object.assign({}, d), { key: d._id })));
    return (<antd_1.Table dataSource={dataSource} columns={columns} loading={searching} pagination={{ pageSize, total }} onChange={onChange} scroll={{ x: true }}/>);
};
exports.default = StudioModelStatsTable;
