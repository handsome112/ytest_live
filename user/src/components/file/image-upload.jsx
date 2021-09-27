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
exports.ImageUpload = void 0;
const antd_1 = require("antd");
const icons_1 = require("@ant-design/icons");
const react_1 = __importStar(require("react"));
function getBase64(img, callback) {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
}
class ImageUpload extends react_1.PureComponent {
    constructor(props) {
        super(props);
        this.handleChange = (info) => {
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
                    const { onUploaded } = this.props;
                    onUploaded
                        && onUploaded({
                            response: info.file.response,
                            base64: imageUrl
                        });
                });
            }
        };
        const { imageUrl } = this.props;
        this.state = {
            loading: false,
            imageUrl
        };
    }
    render() {
        const { options = {}, beforeUpload } = this.props;
        const { loading } = this.state;
        const uploadButton = (<div>
        {loading ? <icons_1.LoadingOutlined /> : <icons_1.PlusOutlined />}
        <div className="ant-upload-text">Upload</div>
      </div>);
        const { imageUrl } = this.state;
        const { headers, uploadUrl } = this.props;
        return (<antd_1.Upload name={options.fieldName || 'file'} listType="picture-card" className="avatar-uploader" showUploadList={false} action={uploadUrl} beforeUpload={beforeUpload} onChange={this.handleChange} headers={headers}>
        {imageUrl ? (<img src={imageUrl} alt="file" style={{ width: '100%' }}/>) : (uploadButton)}
      </antd_1.Upload>);
    }
}
exports.ImageUpload = ImageUpload;
