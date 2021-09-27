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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const React = __importStar(require("react"));
const antd_1 = require("antd");
const icons_1 = require("@ant-design/icons");
const services_1 = require("src/services");
const api_request_1 = require("src/services/api-request");
const js_cookie_1 = __importDefault(require("js-cookie"));
require("./index.less");
const formItemLayout = {
    labelCol: {
        xs: {
            span: 24
        },
        sm: {
            span: 4
        }
    },
    wrapperCol: {
        xs: {
            span: 24
        },
        sm: {
            span: 8
        }
    }
};
const tailFormItemLayout = {
    wrapperCol: {
        xs: {
            span: 24,
            offset: 0
        },
        sm: {
            span: 16,
            offset: 0
        }
    }
};
const DocumentsSettingForm = ({ onFinish, loading, performer }) => {
    const [idVerification, setIdVerification] = React.useState([]);
    const [documentVerification, setDocumentVerification] = React.useState([]);
    const [releaseForm, setRelaseForm] = React.useState([]);
    const [idVerificationId, setIdVerificationId] = React.useState(performer.idVerificationId);
    const [documentVerificationId, setDocumentVerificationId] = React.useState(performer.documentVerificationId);
    const [releaseFormId, setReleaseFormId] = React.useState(performer.releaseFormId);
    const [form] = antd_1.Form.useForm();
    React.useEffect(() => {
        const { idVerification: idVerificationFile, documentVerification: documentVerificationFile, releaseForm: releaseFormFile } = performer;
        if (idVerificationFile) {
            setIdVerification([
                {
                    uid: idVerificationFile._id,
                    name: idVerificationFile.name,
                    status: 'done',
                    url: idVerificationFile.url
                }
            ]);
        }
        if (documentVerificationFile) {
            setDocumentVerification([
                {
                    uid: documentVerificationFile._id,
                    name: documentVerificationFile.name,
                    status: 'done',
                    url: documentVerificationFile.url
                }
            ]);
        }
        if (releaseFormFile) {
            setRelaseForm([
                {
                    uid: releaseFormFile._id,
                    name: releaseFormFile.name,
                    status: 'done',
                    url: releaseFormFile.url
                }
            ]);
        }
    }, []);
    const onDocumentVerificationChange = ({ file, fileList }) => {
        if (file.status === 'done' && file.response) {
            const { data } = file.response;
            setDocumentVerificationId(data._id);
            setDocumentVerification([
                {
                    uid: data._id,
                    name: data.name,
                    status: 'done',
                    url: data.url
                }
            ]);
        }
        else {
            setDocumentVerification(fileList);
        }
    };
    const onIdVerificationChange = ({ file, fileList }) => {
        if (file.status === 'done' && file.response) {
            const { data } = file.response;
            setIdVerificationId(data._id);
            setIdVerification([
                {
                    uid: data._id,
                    name: data.name,
                    status: 'done',
                    url: data.url
                }
            ]);
        }
        else {
            setIdVerification(fileList);
        }
    };
    const onReleaseFormChange = ({ file, fileList }) => {
        if (file.status === 'done' && file.response) {
            const { data } = file.response;
            setReleaseFormId(data._id);
            setRelaseForm([
                {
                    uid: data._id,
                    name: data.name,
                    status: 'done',
                    url: data.url
                }
            ]);
        }
        else {
            setRelaseForm(fileList);
        }
    };
    const submit = () => {
        onFinish({
            idVerificationId,
            documentVerificationId,
            releaseFormId
        });
    };
    return (<antd_1.Form {...formItemLayout} form={form} onFinish={submit} name="documentSettingForm" className="performerEditForm" initialValues={{
            documentVerificationId: performer.documentVerificationId,
            idVerificationId: performer.idVerificationId
        }} layout="vertical">
      <antd_1.Form.Item name="documentVerification" rules={[
            {
                validator: () => {
                    if (idVerificationId)
                        return Promise.resolve();
                    return Promise.reject(new Error('Verification document is required!'));
                }
            }
        ]}>
        <antd_1.Upload showUploadList={{
            showPreviewIcon: true,
            showRemoveIcon: false,
            showDownloadIcon: true
        }} name="file" headers={{
            Authorization: process.browser ? js_cookie_1.default.get(api_request_1.TOKEN) : ''
        }} disabled={loading} fileList={documentVerification} listType="picture" action={services_1.performerService.getDocumentsUploadUrl()} onChange={onDocumentVerificationChange}>
          <antd_1.Button type="primary">
            <icons_1.UploadOutlined />
            {' '}
            Upload Document For Verification
          </antd_1.Button>
        </antd_1.Upload>
      </antd_1.Form.Item>
      <antd_1.Form.Item name="idVerification" rules={[
            {
                validator: () => {
                    if (idVerificationId)
                        return Promise.resolve();
                    return Promise.reject(new Error('Id Verification is required'));
                }
            }
        ]}>
        <antd_1.Upload showUploadList={{
            showPreviewIcon: true,
            showRemoveIcon: false,
            showDownloadIcon: true
        }} name="file" headers={{
            Authorization: process.browser ? js_cookie_1.default.get(api_request_1.TOKEN) : ''
        }} fileList={idVerification} listType="picture" disabled={loading} action={services_1.performerService.getDocumentsUploadUrl()} onChange={onIdVerificationChange}>
          <antd_1.Button type="primary">
            <icons_1.UploadOutlined />
            Upload Id Verification
          </antd_1.Button>
        </antd_1.Upload>
      </antd_1.Form.Item>
      <antd_1.Form.Item name="releaseForm">
        <antd_1.Upload showUploadList={{
            showPreviewIcon: true,
            showRemoveIcon: false,
            showDownloadIcon: true
        }} name="file" headers={{
            Authorization: process.browser ? js_cookie_1.default.get(api_request_1.TOKEN) : ''
        }} fileList={releaseForm} listType="text" action={services_1.performerService.getReleaseFormUrl()} onChange={onReleaseFormChange} disabled={loading}>
          <antd_1.Button type="primary">
            <icons_1.UploadOutlined />
            Upload Release Form
          </antd_1.Button>
        </antd_1.Upload>
      </antd_1.Form.Item>
      <antd_1.Form.Item {...tailFormItemLayout}>
        <antd_1.Button type="primary" htmlType="submit" disabled={loading} loading={loading}>
          Save Changes
        </antd_1.Button>
      </antd_1.Form.Item>
    </antd_1.Form>);
};
exports.default = DocumentsSettingForm;
