"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ImageUpload = void 0;
const antd_1 = require("antd");
const icons_1 = require("@ant-design/icons");
const react_1 = require("react");
const env_1 = __importDefault(require("../../env"));
function getBase64(img, callback) {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
}
function beforeUpload(file) {
    const ext = file.name.split('.').pop().toLowerCase();
    const isImageAccept = env_1.default.imageAccept
        .split(',')
        .map((item) => item.trim())
        .indexOf(`.${ext}`);
    if (isImageAccept === -1) {
        antd_1.message.error(`You can only upload ${env_1.default.imageAccept} file!`);
    }
    const isLt2M = file.size / 1024 / 1024 < (env_1.default.maximumSizeUploadImage || 2);
    if (!isLt2M) {
        antd_1.message.error(`Image must smaller than ${env_1.default.maximumSizeUploadImage || 2}MB!`);
    }
    return isImageAccept > -1 && isLt2M;
}
class ImageUpload extends react_1.PureComponent {
    constructor() {
        super(...arguments);
        this.state = {
            loading: false,
            imageUrl: this.props.imageUrl
        };
        this.handleChange = (info) => {
            if (info.file.status === 'uploading') {
                this.setState({ loading: true });
                return;
            }
            if (info.file.status === 'done') {
                // Get this url from response in real world.
                getBase64(info.file.originFileObj, (imageUrl) => {
                    this.setState({
                        imageUrl,
                        loading: false
                    });
                    this.props.onUploaded &&
                        this.props.onUploaded({
                            response: info.file.response,
                            base64: imageUrl
                        });
                });
            }
        };
    }
    render() {
        const { options = {} } = this.props;
        const uploadButton = (<div>
        {this.state.loading ? <icons_1.LoadingOutlined /> : <icons_1.PlusOutlined />}
        <div className="ant-upload-text">Upload</div>
      </div>);
        const { imageUrl } = this.state;
        const { headers, uploadUrl } = this.props;
        return (<antd_1.Upload name={options.fieldName || 'file'} listType="picture-card" className="avatar-uploader" showUploadList={false} action={uploadUrl} beforeUpload={beforeUpload} onChange={this.handleChange} headers={headers} accept={env_1.default.imageAccept}>
        {imageUrl ? (<img src={imageUrl} alt="file" style={{ width: '100%' }}/>) : (uploadButton)}
      </antd_1.Upload>);
    }
}
exports.ImageUpload = ImageUpload;
