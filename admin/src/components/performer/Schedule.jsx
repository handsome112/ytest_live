"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PerformerSchedule = void 0;
const react_1 = require("react");
const antd_1 = require("antd");
const moment_1 = __importDefault(require("moment"));
const layout = {
    labelCol: { lg: { span: 4 }, sm: { span: 6 } },
    wrapperCol: { lg: { span: 16 }, sm: { span: 14 } }
};
const validateMessages = {
    required: 'This field is required!',
    types: {
        email: 'Not a validate email!',
        number: 'Not a validate number!'
    },
    number: {
        range: 'Must be between ${min} and ${max}'
    }
};
class PerformerSchedule extends react_1.PureComponent {
    render() {
        const { onFormRefSubmit, submiting, onChangeTime, scheduleValue, onChangeCloded } = this.props;
        const dayValue = {
            mon: {
                day: 'Monday'
            },
            tue: {
                day: 'Tuesday'
            },
            wed: {
                day: 'Wednesday'
            },
            thu: {
                day: 'Thursday'
            },
            fri: {
                day: 'Friday'
            },
            sat: {
                day: 'Saturday'
            },
            sun: {
                day: 'Sunday'
            }
        };
        const format = 'HH:mm';
        const { RangePicker } = antd_1.TimePicker;
        return (<antd_1.Form {...layout} name="form-performer-schedule" onFinish={() => onFormRefSubmit()} validateMessages={validateMessages}>
        {Object.keys(dayValue).map((key) => (<antd_1.Form.Item key={key} label={dayValue[key].day} initialValue={[
                    moment_1.default(scheduleValue[key].start, format),
                    scheduleValue[key].end
                        ? moment_1.default(scheduleValue[key].end, format)
                        : moment_1.default()
                ]}>
            <RangePicker onChange={(dates, dateStrings) => onChangeTime(dates, dateStrings, key)} picker="time" format={format} style={{ marginRight: 10 }}/>
            <antd_1.Checkbox name={key} key={key} defaultChecked={scheduleValue[key].closed} onChange={(e) => onChangeCloded(e.target.checked, key)}>
              Not Available
            </antd_1.Checkbox>
          </antd_1.Form.Item>))}
        <antd_1.Form.Item wrapperCol={Object.assign(Object.assign({}, layout.wrapperCol), { offset: 4 })}>
          <antd_1.Button type="primary" htmlType="submit" loading={submiting}>
            Submit
          </antd_1.Button>
        </antd_1.Form.Item>
      </antd_1.Form>);
    }
}
exports.PerformerSchedule = PerformerSchedule;
