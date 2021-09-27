"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const antd_1 = require("antd");
const icons_1 = require("@ant-design/icons");
const PopupConfirm = ({ confirm }) => (<antd_1.Popconfirm title="Are you sure want to delete this item?" okText="Yes I want to delete" cancelText="I dont'want to delete" placement="right" onConfirm={confirm}>
    <antd_1.Button type="link">
      <icons_1.DeleteOutlined />
    </antd_1.Button>
  </antd_1.Popconfirm>);
PopupConfirm.defaultProps = {};
exports.default = PopupConfirm;
