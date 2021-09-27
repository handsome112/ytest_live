"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PerformerDocument = void 0;
const react_1 = require("react");
const antd_1 = require("antd");
const index_1 = require("@services/index");
const file_upload_1 = require("@components/file/file-upload");
const layout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 16 }
};
class PerformerDocument extends react_1.PureComponent {
    constructor() {
        super(...arguments);
        this.state = {
            idVerificationUrl: this.props.performer && this.props.performer.idVerification
                ? this.props.performer.idVerification.url
                : '',
            documentVerificationUrl: this.props.performer && this.props.performer.documentVerification
                ? this.props.performer.documentVerification.url
                : '',
            releaseFormUrl: this.props.performer && this.props.performer.releaseForm
                ? this.props.performer.releaseForm.url
                : ''
        };
    }
    render() {
        const { onUploaded, onFormRefSubmit, submiting, update } = this.props;
        const { idVerificationUrl, documentVerificationUrl, releaseFormUrl } = this.state;
        const uploadHeaders = {
            authorization: index_1.authService.getToken()
        };
        return (<antd_1.Form {...layout} name="form-performer" onFinish={() => onFormRefSubmit()} initialValues={{}}>
        <div key="verificationId" className="ant-row ant-form-item ant-form-item-with-help">
          {/* <div className="ant-col ant-col-lg-8 ant-col-md-10  ant-col-sm-12 ant-form-item-label"> */}
          <div className={update === true ? "ant-col ant-col-lg-10 ant-col-md-10  ant-col-sm-12 ant-form-item-label" : "ant-col ant-col-lg-8 ant-col-md-10  ant-col-sm-12 ant-form-item-label"}>
            <label>ID For Verification</label>
          </div>
          <div className="ant-col ant-col-16 ant-form-item-control">
            <file_upload_1.FileUpload uploadUrl={index_1.performerService.getUploadDocumentUrl()} headers={uploadHeaders} onUploaded={(resp) => {
                this.setState({ idVerificationUrl: resp.response.data.url });
                onUploaded('idVerificationId', resp);
            }}/>
            {idVerificationUrl && (<a target="_blank" href={idVerificationUrl}>ID For Verification Link </a>)}
          </div>
        </div>
        <div key="documentVerificationId" className="ant-row ant-form-item ant-form-item-with-help">
          <div className={update === true ? "ant-col ant-col-lg-10 ant-col-md-10  ant-col-sm-12 ant-form-item-label" : "ant-col ant-col-lg-8 ant-col-md-10  ant-col-sm-12 ant-form-item-label"}>
            <label>Document For Verification</label>
          </div>
          <div className="ant-col ant-col-16 ant-form-item-control">
            <file_upload_1.FileUpload uploadUrl={index_1.performerService.getUploadDocumentUrl()} headers={uploadHeaders} onUploaded={(resp) => {
                this.setState({
                    documentVerificationUrl: resp.response.data.url
                });
                onUploaded('documentVerificationId', resp);
            }}/>
            {documentVerificationUrl && (<a target="_blank" href={documentVerificationUrl}>Document For Verification</a>)}
          </div>
        </div>
        <div key="releaseForm" className="ant-row ant-form-item ant-form-item-with-help">
          <div className={update === true ? "ant-col ant-col-lg-10 ant-col-md-10  ant-col-sm-12 ant-form-item-label" : "ant-col ant-col-lg-8 ant-col-md-10  ant-col-sm-12 ant-form-item-label"}>
            <label>Release Form</label>
          </div>
          <div className="ant-col ant-col-16 ant-form-item-control">
            <file_upload_1.FileUpload uploadUrl={index_1.performerService.getUploadDocumentUrl()} headers={uploadHeaders} onUploaded={(resp) => {
                this.setState({ releaseFormUrl: resp.response.data.url });
                onUploaded('releaseFormId', resp);
            }}/>
            {releaseFormUrl && <a target="_blank" href={releaseFormUrl}>Release Form</a>}
          </div>
        </div>
        <antd_1.Form.Item wrapperCol={Object.assign(Object.assign({}, layout.wrapperCol), { offset: 4 })}>
          <antd_1.Button type="primary" htmlType="submit" loading={submiting}>
            Submit
          </antd_1.Button>
        </antd_1.Form.Item>
      </antd_1.Form>);
    }
}
exports.PerformerDocument = PerformerDocument;
