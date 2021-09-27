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
const moment_1 = __importDefault(require("moment"));
const lib_1 = require("src/lib");
const router_1 = __importDefault(require("next/router"));
const { Item } = antd_1.Form;
const { RangePicker } = antd_1.TimePicker;
const formItemLayout = {
    labelCol: {
        xs: {
            span: 24
        },
        sm: {
            span: 4
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
const checkboxLayout = {
    wrapperCol: {
        xs: {
            span: 24
        },
        sm: {
            span: 16,
            offset: 4
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
const PerformerScheduleForm = ({ schedule, onFinish, updating }) => {
    const [formInput, setFormInput] = React.useState(schedule);
    const [form] = antd_1.Form.useForm();
    const submit = () => {
        onFinish({ schedule: formInput });
    };
    return (<antd_1.Form onFinish={submit} className="performerEditForm" form={form} {...formItemLayout}>
      {Object.keys(schedule).map((key) => (<div key={key}>
          <Item label={lib_1.formatDate(moment_1.default().day(key).toDate(), 'dddd')} name={key} initialValue={[
                moment_1.default(schedule[key].start || '00:00', 'HH:mm'),
                moment_1.default(schedule[key].end || '00:00', 'HH:mm')
            ]}>
            <RangePicker format="HH:mm" onChange={(values) => setFormInput(Object.assign(Object.assign({}, formInput), { [key]: Object.assign(Object.assign({}, formInput[key]), { start: values[0].format('HH:mm'), end: values[1].format('HH:mm') }) }))}/>
          </Item>
          <Item {...checkboxLayout} name={`${key}closed`} valuePropName="checked" initialValue={!schedule[key].closed}>
            <antd_1.Checkbox value onChange={(event) => setFormInput(Object.assign(Object.assign({}, formInput), { [key]: Object.assign(Object.assign({}, formInput[key]), { closed: !event.target.checked }) }))}>
              Available
            </antd_1.Checkbox>
          </Item>
        </div>))}
      <Item {...tailFormItemLayout}>
        <antd_1.Space>
          <antd_1.Button type="primary" htmlType="submit" disabled={updating} loading={updating}>
            Save Changes
          </antd_1.Button>
          <antd_1.Button type="primary" onClick={() => router_1.default.back()}>
            Back
          </antd_1.Button>
        </antd_1.Space>
      </Item>
    </antd_1.Form>);
};
exports.default = PerformerScheduleForm;
