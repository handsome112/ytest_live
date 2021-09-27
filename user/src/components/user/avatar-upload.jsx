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
exports.AvatarUpload = void 0;
const antd_1 = require("antd");
const icons_1 = require("@ant-design/icons");
const react_1 = __importStar(require("react"));
function getBase64(img, callback) {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
}
function beforeUpload(file) {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
        antd_1.message.error('You can only upload JPG/PNG file!');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
        antd_1.message.error('Image must smaller than 2MB!');
    }
    return isJpgOrPng && isLt2M;
}
class AvatarUpload extends react_1.PureComponent {
    constructor() {
        super(...arguments);
        this.state = {
            loading: false,
            imageUrl: ''
        };
        this.handleChange = (info) => {
            const { onUploaded } = this.props;
            if (info.file.status === 'uploading') {
                this.setState({ loading: true });
                return;
            }
            if (info.file.status === 'done') {
                // Get this url from response in real world.
                getBase64(info.fileList[0].originFileObj, (imageUrl) => {
                    this.setState({
                        imageUrl,
                        loading: false
                    });
                    onUploaded
                        && onUploaded({
                            response: info.file.response,
                            base64: imageUrl
                        });
                });
            }
        };
    }
    render() {
        const { loading } = this.state;
        const uploadButton = (<div>
        {loading ? <icons_1.LoadingOutlined /> : <icons_1.PlusOutlined />}
        <div className="ant-upload-text">Upload</div>
      </div>);
        const { imageUrl } = this.state;
        const { headers, uploadUrl } = this.props;
        return (<antd_1.Upload name="avatar" listType="picture-card" className="avatar-uploader" showUploadList={false} action={uploadUrl} beforeUpload={beforeUpload} onChange={this.handleChange} headers={headers} disabled={loading}>
        {imageUrl ? (<img src={imageUrl} alt="avatar" style={{ width: '100%' }}/>) : (uploadButton)}
      </antd_1.Upload>);
    }
}
exports.AvatarUpload = AvatarUpload;
