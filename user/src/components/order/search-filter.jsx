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
exports.OrderSearchFilter = void 0;
const react_1 = __importStar(require("react"));
const antd_1 = require("antd");
class OrderSearchFilter extends react_1.PureComponent {
    constructor() {
        super(...arguments);
        this.state = {
            deliveryStatus: ''
        };
    }
    render() {
        const { statuses = [], onSubmit } = this.props;
        return (<antd_1.Row gutter={24}>
        {statuses.length ? (<antd_1.Col xl={{ span: 4 }} md={{ span: 8 }} xs={{ span: 10 }}>
            <span>Status</span>
            <antd_1.Select onChange={(val) => this.setState({ deliveryStatus: val })} style={{ width: '100%' }} placeholder="Select delivery status" defaultValue="">
              {statuses.map((s) => (<antd_1.Select.Option key={s.key} value={s.key}>
                  {s.text || s.key}
                </antd_1.Select.Option>))}
            </antd_1.Select>
          </antd_1.Col>) : null}
        <antd_1.Col xl={{ span: 4 }} md={{ span: 8 }}>
          <antd_1.Button style={{ marginTop: '22px' }} type="primary" onClick={() => onSubmit(this.state)}>
            Search
          </antd_1.Button>
        </antd_1.Col>
      </antd_1.Row>);
    }
}
exports.OrderSearchFilter = OrderSearchFilter;
