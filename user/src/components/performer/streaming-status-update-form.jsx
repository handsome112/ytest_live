"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const antd_1 = require("antd");
exports.default = ({ status, updating, submit }) => {
    const [statusInput, setStatusInput] = react_1.default.useState(status);
    const handleClick = () => {
        submit(statusInput);
    };
    return (<antd_1.Row gutter={{ sm: 10, xs: 0 }}>
      <antd_1.Col lg={20} md={18} sm={24} xs={24}>
        <antd_1.Input placeholder="Update your status" value={statusInput} onChange={(event) => setStatusInput(event.target.value)}/>
      </antd_1.Col>
      <antd_1.Col lg={4} md={6} sm={24} xs={24}>
        <antd_1.Button type="primary" onClick={handleClick} loading={updating} className="mb-10" block disabled={updating}>
          Update
        </antd_1.Button>
      </antd_1.Col>
    </antd_1.Row>);
};
