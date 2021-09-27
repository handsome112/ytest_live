"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FileUpload = void 0;
const antd_1 = require("antd");
const icons_1 = require("@ant-design/icons");
const react_1 = require("react");
const env_1 = __importDefault(require("../../env"));
function beforeUpload(file) {
    const isLt2M = file.size / 1024 / 1024 < (env_1.default.maximumSizeUploadFile || 20);
    if (!isLt2M) {
        antd_1.message.error(`File must smaller than ${env_1.default.maximumSizeUploadFile || 20}MB!`);
    }
    return isLt2M;
}
class FileUpload extends react_1.PureComponent {
    constructor() {
        super(...arguments);
        this.state = {
            loading: false,
            fileUrl: this.props.fileUrl
        };
        this.handleChange = (info) => {
            if (info.file.status === 'uploading') {
                this.setState({ loading: true });
                return;
            }
            if (info.file.status === 'done') {
                // Get this url from response in real world.
                this.setState({
                    loading: false,
                    fileUrl: info.file.response.data ? info.file.response.data.url : 'Done!'
                });
                this.props.onUploaded &&
                    this.props.onUploaded({
                        response: info.file.response
                    });
            }
        };
    }
    render() {
        const uploadButton = (<div>
        {this.state.loading ? <icons_1.LoadingOutlined /> : <icons_1.PlusOutlined />}
        <div className="ant-upload-text">Upload</div>
      </div>);
        const { fileUrl } = this.state;
        const { headers, uploadUrl, fieldName = 'file' } = this.props;
        return (<antd_1.Upload name={fieldName} listType="picture-card" className="avatar-uploader" showUploadList={false} action={uploadUrl} beforeUpload={beforeUpload} onChange={this.handleChange} {...this.props}>
        {fileUrl ? <span>Click to download</span> : uploadButton}
      </antd_1.Upload>);
    }
}
exports.FileUpload = FileUpload;
