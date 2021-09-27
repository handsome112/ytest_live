"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const antd_1 = require("antd");
const lib_1 = require("src/lib");
const interfaces_1 = require("src/interfaces");
const services_1 = require("src/services");
require("./index.less");
const moment_1 = __importDefault(require("moment"));
const PayoutRequestForm = ({ payout, submit, submitting, role }) => {
    const [tokenMustPay, setTokenMustPay] = react_1.default.useState(payout.tokenMustPay || 0);
    const [previousPaidOut, setPreviousPaidOut] = react_1.default.useState(payout.previousPaidOut || 0);
    const [pendingToken, setPendingToken] = react_1.default.useState(payout.pendingToken || 0);
    const handleDateChange = async (_, dateStrings) => {
        try {
            if (!dateStrings[0] || !dateStrings[1])
                return;
            const query = {
                fromDate: dateStrings[0],
                toDate: dateStrings[1]
            };
            const resp = await services_1.payoutRequestService.calculate(query, role);
            setTokenMustPay(resp.data.totalPrice);
            setPreviousPaidOut(resp.data.paidPrice);
            setPendingToken(resp.data.remainingPrice);
        }
        catch (_a) {
            antd_1.message.error('Something went wrong. Please try to input date againƒ!');
        }
    };
    const [form] = antd_1.Form.useForm();
    const { paymentAccountType, requestNote, fromDate, toDate } = payout;
    return (<antd_1.Form form={form} layout="vertical" className="payout-request-form" name="payoutRequestForm" onFinish={submit} initialValues={{
            paymentAccountType: paymentAccountType || interfaces_1.PAYMENT_ACCOUNT.WIRE,
            requestNote: requestNote || '',
            date: fromDate && toDate ? [moment_1.default(fromDate), moment_1.default(toDate)] : []
        }}>
      <antd_1.Row>
        <antd_1.Col xs={24} sm={8}>
          <antd_1.Form.Item name="date" label="Date" rules={[{ required: true, message: 'Please input the date!' }]}>
            <antd_1.DatePicker.RangePicker onChange={handleDateChange} disabled={!!(payout === null || payout === void 0 ? void 0 : payout._id)}/>
          </antd_1.Form.Item>
        </antd_1.Col>
        <antd_1.Col xs={24} sm={16}>
          <antd_1.Space size="large">
            <antd_1.Statistic title="Earnings For The Selected Date" value={tokenMustPay} precision={2}/>
            <antd_1.Statistic title="Previous Payout" value={previousPaidOut} precision={2}/>
            <antd_1.Statistic title="Earnings Pending In Your Account" value={pendingToken} precision={2}/>
          </antd_1.Space>
        </antd_1.Col>
      </antd_1.Row>
      <antd_1.Form.Item label="Payment Account Type" name="paymentAccountType">
        <antd_1.Select disabled={!!(payout === null || payout === void 0 ? void 0 : payout._id)}>
          {interfaces_1.paymentAccountTypes.map((t) => (<antd_1.Select.Option value={t.value} key={t.value}>
              {t.title}
            </antd_1.Select.Option>))}
        </antd_1.Select>
      </antd_1.Form.Item>
      <antd_1.Form.Item label="Comment" name="requestNote">
        <antd_1.Input.TextArea rows={4}/>
      </antd_1.Form.Item>
      <antd_1.Form.Item {...lib_1.tailFormItemLayout}>
        <antd_1.Button type="primary" loading={submitting} htmlType="submit" disabled={!tokenMustPay}>
          Save Change
        </antd_1.Button>
      </antd_1.Form.Item>
    </antd_1.Form>);
};
PayoutRequestForm.defaultProps = {
    role: 'performer'
};
exports.default = PayoutRequestForm;
