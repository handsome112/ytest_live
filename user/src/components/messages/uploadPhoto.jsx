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
exports.ImageMessageUpload = void 0;
const antd_1 = require("antd");
const react_1 = __importStar(require("react"));
function getBase64(img, callback) {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
}
function beforeUpload(file) {
    const isLt5M = file.size / 1024 / 1024 < 5;
    if (!isLt5M) {
        antd_1.message.error('Image must smaller than 5MB!');
    }
    return isLt5M;
}
class ImageMessageUpload extends react_1.PureComponent {
    constructor() {
        // state = {
        //   loading: false,
        //   imageUrl: this.props.imageUrl
        // };
        super(...arguments);
        this.handleChange = (info) => {
            // if (info.file.status === 'uploading') {
            //   this.setState({ loading: true });
            //   return;
            // }
            const { onFileReaded, onUploaded } = this.props;
            if (info.file.status === 'done') {
                onFileReaded
                    && onFileReaded(info.file.originFileObj);
                // Get this url from response in real world.
                getBase64(info.fileList[0].originFileObj, (imageUrl) => {
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
        const { options = {} } = this.props;
        const { headers, uploadUrl, messageData } = this.props;
        return (<antd_1.Upload accept={'image/*'} name={options.fieldName || 'file'} listType="picture-card" className="avatar-uploader" showUploadList={false} action={uploadUrl} beforeUpload={beforeUpload} onChange={this.handleChange} headers={headers} data={messageData}>
        <div className="ant-upload-text">Upload</div>
      </antd_1.Upload>);
    }
}
exports.ImageMessageUpload = ImageMessageUpload;
