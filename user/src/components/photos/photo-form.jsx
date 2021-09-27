"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const antd_1 = require("antd");
const router_1 = __importDefault(require("next/router"));
const icons_1 = require("@ant-design/icons");
const galleries_1 = __importDefault(require("@components/common/base/select/galleries"));
const lib_1 = require("src/lib");
const input_item_list_1 = __importDefault(require("@components/common/base/input-item-list"));
require("./index.less");
const imageStyle = {
    height: 225,
    width: 225,
    objectFit: 'cover',
    marginTop: 10
};
const initialValues = {
    description: '',
    status: 'draft'
};
const PERFORMER_PHOTO_STATUS = [
    { key: 'draft', name: 'Draft' },
    { key: 'active', name: 'Active' },
    { key: 'inactive', name: 'Inactive' }
];
const FormPhoto = ({ onFinish, loading, photo }) => {
    const [form] = antd_1.Form.useForm();
    const formInput = [
        {
            name: 'title',
            label: 'Title',
            rules: [
                {
                    required: true,
                    message: 'Please input photo title!'
                }
            ],
            children: <antd_1.Input placeholder="Title Photo"/>
        },
        {
            name: 'galleryId',
            label: 'Gallery',
            rules: [{ required: true, message: 'please select photo gallery' }],
            children: <galleries_1.default form={form} defaultGalleryId={photo.galleryId}/>
        },
        {
            name: 'description',
            label: 'Description',
            children: <antd_1.Input.TextArea placeholder="Title Description"/>
        },
        {
            name: 'status',
            label: 'Status',
            children: (<antd_1.Radio.Group>
          {PERFORMER_PHOTO_STATUS.map((status) => (<antd_1.Radio value={status.key} key={status.key}>
              {status.name}
            </antd_1.Radio>))}
        </antd_1.Radio.Group>)
        }
    ];
    const [file, setFile] = react_1.default.useState(photo.photo ? photo.photo.url : null);
    const onFileChange = (info) => {
        const reader = new FileReader();
        reader.onload = (e) => {
            setFile(e.target.result);
        };
        reader.readAsDataURL(info.fileList[0].originFileObj);
        return false;
    };
    return (<antd_1.Form {...lib_1.formItemLayout} form={form} onFinish={onFinish} name="photoCreatingForm" initialValues={Object.assign(Object.assign({}, initialValues), photo)} layout="vertical">
      <input_item_list_1.default fields={formInput}/>
      <antd_1.Form.Item name="photo" label="Photo File">
        <antd_1.Upload showUploadList={false} accept="image/*" customRequest={() => true} onChange={onFileChange}>
          <antd_1.Button>
            <icons_1.UploadOutlined />
            {' '}
            Upload File
          </antd_1.Button>
        </antd_1.Upload>
      </antd_1.Form.Item>
      {file && (<antd_1.Form.Item>
        <img src={file} style={imageStyle} alt=""/>
      </antd_1.Form.Item>)}
      <antd_1.Form.Item {...lib_1.tailFormItemLayout}>
        <antd_1.Space>
          <antd_1.Button type="primary" htmlType="submit" disabled={loading} loading={loading}>
            Save Changes
          </antd_1.Button>
          <antd_1.Button type="primary" onClick={() => router_1.default.back()}>
            Back
          </antd_1.Button>
        </antd_1.Space>
      </antd_1.Form.Item>
    </antd_1.Form>);
};
FormPhoto.defaultProps = {
    photo: null
};
exports.default = FormPhoto;
