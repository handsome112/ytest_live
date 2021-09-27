"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const antd_1 = require("antd");
exports.default = ({ title, extra }) => (<>
    <antd_1.PageHeader title={title} extra={extra}/>
    <antd_1.Divider />
  </>);
