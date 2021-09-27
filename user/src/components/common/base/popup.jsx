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
const react_1 = __importStar(require("react"));
const antd_1 = require("antd");
require("./popup.less");
class Popup extends react_1.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            visible: false
        };
    }
    onOk() {
        const { onOk } = this.props;
        onOk && onOk();
    }
    onCancel() {
        const { onCancel } = this.props;
        onCancel && onCancel();
        this.setState({ visible: false });
    }
    setVisible(visible) {
        this.setState({ visible });
    }
    render() {
        const { visible } = this.state;
        const { content, loading, okText, cancelText, okButtonProps } = this.props;
        let { footer } = this.props;
        if (footer) {
            footer = [
                <antd_1.Button key="back" type="default" onClick={this.onCancel.bind(this)}>
          {cancelText || 'Cancel'}
        </antd_1.Button>,
                ...footer,
                <antd_1.Button key="submit" type="primary" onClick={this.onOk.bind(this)} loading={loading} {...okButtonProps}>
          {okText || 'OK'}
        </antd_1.Button>
            ];
        }
        else {
            footer = [
                <antd_1.Button key="back" type="default" onClick={this.onCancel.bind(this)}>
          {cancelText || 'Cancel'}
        </antd_1.Button>,
                <antd_1.Button key="submit" type="primary" onClick={this.onOk.bind(this)} disabled={loading} loading={loading} {...okButtonProps}>
          {okText || 'OK'}
        </antd_1.Button>
            ];
        }
        return (<antd_1.Modal {...this.props} visible={visible} centered closeIcon className="popup" footer={footer} onCancel={this.onCancel.bind(this)}>
        {content}
      </antd_1.Modal>);
    }
}
exports.default = Popup;
