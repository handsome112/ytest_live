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
const React = __importStar(require("react"));
const antd_1 = require("antd");
require("./index.less");
const formItemLayout = {
    labelCol: {
        xs: {
            span: 24
        },
        sm: {
            span: 24
        }
    },
    wrapperCol: {
        xs: {
            span: 24
        },
        sm: {
            span: 16
        }
    }
};
const tailFormItemLayout = {
    wrapperCol: {
        xs: {
            span: 24,
            offset: 0
        },
        sm: {
            span: 16,
            offset: 0
        }
    }
};
const BroadcastSetting = ({ onFinish, maxParticipantsAllowed, loading }) => {
    const [form] = antd_1.Form.useForm();
    return (<antd_1.Form {...formItemLayout} form={form} onFinish={onFinish} name="broadcastSettingForm" className="performerEditForm" initialValues={{
            maxParticipantsAllowed: typeof maxParticipantsAllowed === 'number'
                ? maxParticipantsAllowed
                : 0
        }} layout="vertical">
      <antd_1.Row gutter={25}>
        <antd_1.Col sm={12} xs={24}>
          <antd_1.Form.Item name="maxParticipantsAllowed" label="Max Participants Allowed" extra="Set 0 to unlimit participants allowed">
            <antd_1.InputNumber type="number" min={0} style={{ width: '100%' }} placeholder="Input max participants allowed"/>
          </antd_1.Form.Item>
        </antd_1.Col>
      </antd_1.Row>
      <antd_1.Form.Item {...tailFormItemLayout}>
        <antd_1.Button type="primary" htmlType="submit" disabled={loading} loading={loading}>
          Save Changes
        </antd_1.Button>
      </antd_1.Form.Item>
    </antd_1.Form>);
};
exports.default = BroadcastSetting;
