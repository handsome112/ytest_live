"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
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
    const isLt2M = file.size / 1024 / 1024 < (env_1.default.maximuSizeUploadSound || 2);
    if (!isLt2M) {
        antd_1.message.error(`Image must smaller than ${env_1.default.maximumSizeUploadImage || 2}MB!`);
    }
    return isLt2M;
}
class SoundUpload extends react_1.PureComponent {
    constructor(props) {
        super(props);
        this.handleChange = (info) => {
            const { onUploaded } = this.props;
            if (info.file.status === 'uploading') {
                this.setState({ loading: true });
            }
            if (info.file.status === 'done') {
                this.setState({ loading: false });
            }
            let fileList = [...info.fileList];
            fileList = fileList.slice(-1);
            fileList = fileList.map((file) => {
                if (file.response) {
                    const { data } = file.response;
                    file.url = data.url;
                    file.uid = data._id;
                    file.name = data.name;
                    file.status = 'done';
                    onUploaded &&
                        onUploaded({
                            response: info.file.response
                        });
                    this.setState({ loading: false });
                }
                return file;
            });
            this.setState({ fileList });
        };
        this.state = {
            loading: false
        };
    }
    componentDidMount() {
        const { fileUrl } = this.props;
        if (fileUrl) {
            this.setState({
                fileList: [
                    {
                        uid: '-1',
                        name: fileUrl,
                        status: 'done',
                        url: fileUrl
                    }
                ]
            });
        }
    }
    render() {
        const { options = {} } = this.props;
        const { fileList, loading } = this.state;
        const { headers, uploadUrl } = this.props;
        const UploadButton = () => (<div>
        <antd_1.Button type="primary" loading={loading}>
          <icons_1.PlusOutlined /> Upload
        </antd_1.Button>
      </div>);
        return (<antd_1.Upload name={options.fieldName || 'file'} showUploadList={{
                showPreviewIcon: true,
                showRemoveIcon: false,
                showDownloadIcon: false
            }} fileList={fileList} multiple={false} listType="text" className="avatar-uploader" action={uploadUrl} beforeUpload={beforeUpload} onChange={this.handleChange} headers={headers} accept={env_1.default.soundAccept}>
        <UploadButton />
      </antd_1.Upload>);
    }
}
exports.default = SoundUpload;
