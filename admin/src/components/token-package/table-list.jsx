"use strict";
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TokenPackageTable = void 0;
const date_1 = require("@lib/date");
const antd_1 = require("antd");
const icons_1 = require("@ant-design/icons");
const link_1 = __importDefault(require("next/link"));
const dropdown_action_1 = require("@components/common/dropdown-action");
const TokenPackageTable = (_a) => {
    var props = __rest(_a, []);
    const Columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name'
        },
        {
            title: 'Price',
            dataIndex: 'price',
            key: 'price',
            align: 'center'
        },
        {
            title: 'Number of Tokens',
            dataIndex: 'tokens',
            key: 'address',
            align: 'center'
        },
        {
            title: 'Description',
            dataIndex: 'description',
            key: 'description'
        },
        {
            title: 'Updated At',
            dataIndex: 'updatedAt',
            key: 'updatedAt',
            render(data, record) {
                return date_1.formatDate(record.updatedAt);
            }
        },
        {
            title: 'Actions',
            dataIndex: '_id',
            fixed: 'right',
            key: 'action',
            render: (id) => {
                return (<dropdown_action_1.DropdownAction menuOptions={[
                        {
                            key: 'update',
                            name: 'Update',
                            children: (<link_1.default href={{
                                    pathname: '/token-package/update',
                                    query: { id }
                                }} as={`/token-package/update?id=${id}`}>
                    <a>
                      <icons_1.EditOutlined /> Update
                    </a>
                  </link_1.default>)
                        },
                        {
                            key: 'delete',
                            name: 'Delete',
                            children: (<span>
                    <icons_1.DeleteOutlined /> Delete
                  </span>),
                            onClick: () => props.delete && props.delete(id)
                        }
                    ]}/>);
            }
        }
    ];
    return (<antd_1.Table dataSource={props.dataSource} columns={Columns} pagination={false} rowKey={props.rowKey} scroll={{ x: 700, y: 650 }}/>);
};
exports.TokenPackageTable = TokenPackageTable;
