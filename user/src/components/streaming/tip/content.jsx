"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
const antd_1 = require("antd");
require("./content.less");
const tokens = [20, 50, 100, 200];
class SendTipContent extends react_1.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            radioValue: 20,
            errorMessage: '',
            token: 1
        };
    }
    componentDidMount() {
        this.inputNumberRef = react_1.createRef();
    }
    onRadioChange(e) {
        const { setDisableOk } = this.props;
        setDisableOk(false);
        this.setState({ radioValue: e.target.value });
        if (e.target.value > 0)
            this.setState({ token: e.target.value });
    }
    onInputChange(value) {
        const { setDisableOk } = this.props;
        setDisableOk(false);
        if (typeof (value) !== 'number') {
            return;
        }
        if (value <= 0 || value % 1 !== 0) {
            setDisableOk(true);
            this.setState({ errorMessage: 'Token must be positive interger number!' });
            return;
        }
        this.setState({ token: value, errorMessage: '' });
    }
    getValueToken() {
        const { token } = this.state;
        return token;
    }
    render() {
        const { radioValue, token, errorMessage } = this.state;
        return (<div>
        <strong>Tipping A Model Is Simple!</strong>
        <h3>How Many Tokens Would You Like To Tip?</h3>
        {errorMessage && <antd_1.Alert type="error" message={errorMessage}/>}
        <antd_1.Radio.Group value={radioValue} defaultValue={radioValue} onChange={this.onRadioChange.bind(this)} size="large">
          {tokens.map((v) => (<antd_1.Radio value={v} key={v}>
              <antd_1.Space className="token-radio" align="start">
                <span>{`${v} Tokens`}</span>
                <span className="tip-description">{`Tip The Model ${v} Tokens!`}</span>
              </antd_1.Space>
            </antd_1.Radio>))}
          <antd_1.Radio value={-1}>
            <antd_1.Space className="token-radio">
              <span>Custom Amount</span>
              <antd_1.InputNumber className="amount" ref={this.inputNumberRef} onFocus={() => this.setState({ radioValue: -1 })} type="number" min={1} max={1000} step={10} placeholder="Enter Amount" onChange={this.onInputChange.bind(this)} value={token}/>
            </antd_1.Space>
          </antd_1.Radio>
        </antd_1.Radio.Group>
      </div>);
    }
}
exports.default = SendTipContent;
