"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable no-return-assign */
/* eslint-disable @typescript-eslint/no-unused-vars */
const react_1 = __importDefault(require("react"));
const antd_1 = require("antd");
const icons_1 = require("@ant-design/icons");
const router_1 = __importDefault(require("next/router"));
const lib_1 = require("src/lib");
const input_item_list_1 = __importDefault(require("@components/common/base/input-item-list"));
const services_1 = require("src/services");
require("./index.less");
const numberformat_1 = __importDefault(require("@components/common/layout/numberformat"));
// const imageStyle: React.CSSProperties = {
//   height: 225,
//   width: 225,
//   objectFit: 'cover',
//   marginTop: 10
// };
const initialValues = {
    description: '',
    isSale: false,
    status: 'draft'
};
const PERFORMER_GALLERY_STATUS = [
    { key: 'draft', name: 'Draft' },
    { key: 'active', name: 'Active' },
    { key: 'inactive', name: 'Inactive' }
];
const FormGallery = ({ onFinish, loading, gallery, performer }) => {
    let inputRef;
    const [form] = antd_1.Form.useForm();
    const [uploading, setUploading] = react_1.default.useState(false);
    const [fileList, setFileList] = react_1.default.useState([]);
    if ((gallery === null || gallery === void 0 ? void 0 : gallery.token)
        && !lib_1.unitPrices.find((p) => p.value === gallery.token)) {
        lib_1.unitPrices.push({ value: gallery.token, text: <numberformat_1.default value={gallery.token} suffix=" tokens"/> });
        lib_1.unitPrices.sort((a, b) => a.value - b.value);
    }
    const [tokens, setTokenPrice] = react_1.default.useState(lib_1.unitPrices);
    const priceSelectOptions = (tokens || []).map((price) => ({
        label: price.text,
        value: price.value
    }));
    const dependencies = ['isSale', 'token'];
    const formInput = [
        {
            name: 'name',
            label: 'Name',
            rules: [
                {
                    required: true,
                    message: 'Please input gallery name!'
                }
            ],
            children: <antd_1.Input placeholder="Title Gallery"/>
        },
        {
            name: 'description',
            label: 'Description',
            children: <antd_1.Input.TextArea placeholder="Title Description"/>
        },
        {
            name: 'isSale',
            valuePropName: 'checked',
            children: (<antd_1.Checkbox>
          Is sale Gallery?
        </antd_1.Checkbox>)
        },
        {
            fieldKey: 'tokenPrice',
            label: 'Token',
            dependencies,
            children: () => (<antd_1.Form.Item name="token" dependencies={dependencies} rules={[
                    ({ getFieldValue }) => ({
                        validator: (_, value) => new Promise((resolve, reject) => {
                            const isValid = getFieldValue('isSale');
                            if (!isValid || (isValid && parseInt(value, 10) > 0)) {
                                return resolve(null);
                            }
                            return reject(new Error('Price must be positive integer number!'));
                        })
                    })
                ]}>
          <antd_1.Select disabled={!form.getFieldValue('isSale')} placeholder="Please Select Number of Token" onKeyDown={(e) => {
                    if (e.keyCode === 13) {
                        return e.preventDefault();
                    }
                    return {};
                }} options={priceSelectOptions} dropdownRender={(menu) => (<div>
                {menu}
                <antd_1.Divider dashed/>
                <antd_1.Space>
                  <antd_1.Input placeholder="Input number of token" type="number" min={1} ref={(ref) => (inputRef = ref)}/>
                  <antd_1.Button onClick={() => {
                        let token = parseInt(inputRef.state.value, 10);
                        if (token < 1)
                            token = 1;
                        if (tokens.find((t) => t.value === token))
                            return;
                        setTokenPrice([
                            ...tokens,
                            {
                                text: <numberformat_1.default value={token} suffix=" tokens"/>,
                                value: token
                            }
                        ].sort((a, b) => a.value - b.value));
                    }}>
                    Add
                  </antd_1.Button>
                </antd_1.Space>
              </div>)}/>
        </antd_1.Form.Item>)
        },
        {
            name: 'status',
            label: 'Status',
            children: (<antd_1.Radio.Group>
          {PERFORMER_GALLERY_STATUS.map((status) => (<antd_1.Radio value={status.key} key={status.key}>
              {status.name}
            </antd_1.Radio>))}
        </antd_1.Radio.Group>)
        }
    ];
    const searchGalleryPhoto = async () => {
        var _a, _b;
        try {
            if (gallery._id) {
                const resp = await services_1.photoService.search({
                    galleryId: gallery._id,
                    performerId: performer._id
                });
                if (resp.data.total > 0) {
                    setFileList((_b = (_a = resp.data) === null || _a === void 0 ? void 0 : _a.data) === null || _b === void 0 ? void 0 : _b.map((p) => (Object.assign(Object.assign({}, p), { uid: p._id, name: p.title, status: 'done', uploadStatus: p.status, url: p.photo.url }))));
                }
            }
        }
        catch (err) {
            const error = await Promise.resolve(err);
            antd_1.message.error(lib_1.getResponseError(error));
        }
    };
    const onUploading = (file) => {
        // console.log(file);
    };
    const handleUploadPhotos = async () => {
        if (!gallery && !gallery._id)
            return;
        if (!fileList || !fileList.length) {
            antd_1.message.error('Please select photo!');
            return;
        }
        const data = {
            galleryId: gallery._id,
            token: 0,
            performerId: performer._id,
            status: 'active'
        };
        const uploadFiles = [...fileList].filter((f) => f.status === 'uploading' && f.originFileObj);
        if (!uploadFiles.length) {
            antd_1.message.error('Please select new file!');
            return;
        }
        setUploading(true);
        /**
         * Upload photos
         */
        try {
            const resp = (await Promise.all(uploadFiles.map((file) => services_1.photoService.uploadImages(file.originFileObj, data, onUploading))));
            const uploadedFiles = fileList.filter((f) => f.status === 'done');
            const uploadingFiles = fileList.filter((f) => f.status === 'uploading');
            setFileList([
                ...uploadedFiles,
                ...resp.map(({ data: d }, index) => d._id && Object.assign(Object.assign(Object.assign({}, uploadingFiles[index]), d), { uid: d._id, status: 'done', uploadStatus: d.status, name: d.title }))
            ]);
        }
        catch (err) {
            const error = await Promise.resolve(err);
            antd_1.message.error(lib_1.getResponseError(error));
        }
        setUploading(false);
    };
    const handleBeforeUpload = () => false;
    const handleChange = async ({ fileList: fl }) => {
        const files = await Promise.all(fl
            .filter((file) => file.status !== 'done')
            .map((file) => lib_1.getBase64(file.originFileObj, 'uploading', file)));
        const uploadedFiles = fl.filter((file) => file.status === 'done');
        setFileList([
            ...uploadedFiles,
            ...files.map((file) => (Object.assign({}, file)))
        ]);
    };
    const onPreview = (f) => {
        const file = f;
        file.status = file.uploadStatus;
        router_1.default.push({
            pathname: '/account/performer/photos/update',
            query: { data: JSON.stringify(file) }
        }, `/account/performer/photos/${file.uid}/update`);
    };
    const onRemove = async (file) => {
        try {
            setUploading(true);
            await services_1.photoService.remove(file.uid);
            antd_1.message.success('Removed!');
        }
        catch (e) {
            const err = await Promise.resolve(e);
            antd_1.message.error(lib_1.getResponseError(err));
            setTimeout(() => setFileList(fileList), 1000);
        }
        finally {
            setUploading(false);
        }
    };
    react_1.default.useEffect(() => {
        if (!uploading && (fileList === null || fileList === void 0 ? void 0 : fileList.length)) {
            const uploadingFiles = fileList.filter((f) => f.status === 'uploading');
            uploadingFiles.length > 0 && handleUploadPhotos();
        }
    }, [fileList, uploading]);
    react_1.default.useEffect(() => {
        searchGalleryPhoto();
    }, []);
    return (<antd_1.Form {...lib_1.formItemLayout} form={form} onFinish={onFinish} name="galleryCreatingForm" initialValues={Object.assign(Object.assign({}, initialValues), gallery)} layout="vertical">
      <antd_1.Row>
        <antd_1.Col sm={24} xs={24}>
          <input_item_list_1.default fields={formInput}/>
          {gallery._id && (<antd_1.Upload accept="image/*" multiple showUploadList onPreview={onPreview} onRemove={onRemove} listType="picture-card" disabled={uploading} fileList={fileList} onChange={handleChange} beforeUpload={handleBeforeUpload}>
              <icons_1.PlusOutlined />
              <div className="ant-upload-text">Upload</div>
            </antd_1.Upload>)}
        </antd_1.Col>
      </antd_1.Row>
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
FormGallery.defaultProps = {
    gallery: null,
    performer: null,
    remove: null
};
exports.default = FormGallery;
