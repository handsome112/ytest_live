"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StudioDocumentForm = void 0;
const react_1 = require("react");
const antd_1 = require("antd");
const index_1 = require("@services/index");
const file_upload_1 = require("@components/file/file-upload");
const layout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 16 }
};
class StudioDocumentForm extends react_1.PureComponent {
    constructor() {
        super(...arguments);
        this.state = {
            documentVerificationFile: ''
        };
    }
    componentDidMount() {
        const { studio } = this.props;
        if (studio === null || studio === void 0 ? void 0 : studio.documentVerificationFile) {
            this.setState({
                documentVerificationFile: studio.documentVerificationFile
            });
        }
    }
    render() {
        const { onUploaded, studio, method } = this.props;
        const { documentVerificationFile } = this.state;
        const uploadHeaders = {
            authorization: index_1.authService.getToken()
        };
        return (<antd_1.Form {...layout} name="form-performer" initialValues={{}}>
        <div key="verificationId" className="ant-row ant-form-item ant-form-item-with-help">
          <div className="ant-col ant-col-4 ant-form-item-label">
            <label>ID For Verification</label>
          </div>
          <div className="ant-col ant-col-16 ant-form-item-control">
            <file_upload_1.FileUpload uploadUrl={studio
                ? index_1.studioService.getUploadDocumentUrl(studio._id)
                : index_1.studioService.getUploadDocumentUrl()} headers={uploadHeaders} onUploaded={(resp) => {
                this.setState({
                    documentVerificationFile: resp.response.data.url
                });
                onUploaded('documentVerification', resp);
            }} method={method} fieldName="documentVerification"/>
            {documentVerificationFile && (<a target="_blank" href={documentVerificationFile}>Document For Verification</a>)}
          </div>
        </div>
      </antd_1.Form>);
    }
}
exports.StudioDocumentForm = StudioDocumentForm;
