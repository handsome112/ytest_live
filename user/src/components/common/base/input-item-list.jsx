"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const antd_1 = require("antd");
const react_1 = __importDefault(require("react"));
exports.default = ({ fields }) => (<>
    {fields.map((field) => (<antd_1.Form.Item {...field} key={field.id || (field.name || field.fieldKey).toString()}>
        {field.children}
      </antd_1.Form.Item>))}
  </>);
