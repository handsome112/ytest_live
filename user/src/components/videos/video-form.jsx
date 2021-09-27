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
/* eslint-disable no-return-assign */
/* eslint-disable @typescript-eslint/no-unused-vars */
const React = __importStar(require("react"));
const antd_1 = require("antd");
const router_1 = __importDefault(require("next/router"));
const icons_1 = require("@ant-design/icons");
const lib_1 = require("src/lib");
const input_item_list_1 = __importDefault(require("@components/common/base/input-item-list"));
const numberformat_1 = __importDefault(require("@components/common/layout/numberformat"));
require("./index.less");
const imageStyle = {
    height: 225,
    width: 225,
    objectFit: 'cover',
    marginTop: 10
};
const defaultValue = {
    description: '',
    isSaleVideo: false,
    isBought: false
};
const { Option } = antd_1.Select;
const PERFORMER_VIDEO_STATUS = [
    { key: 'draft', name: 'Draft' },
    { key: 'active', name: 'Active' },
    { key: 'inactive', name: 'Inactive' }
];
const leftInputFrom = [
    {
        name: 'title',
        label: 'Title',
        rules: [
            {
                required: true,
                message: 'Please input video title!'
            }
        ],
        children: <antd_1.Input placeholder="Enter Video Title"/>
    },
    {
        name: 'description',
        label: 'Description',
        children: <antd_1.Input.TextArea placeholder="Enter Video Description"/>
    }
];
const VideoForm = ({ onFinish, loading, video }) => {
    var _a, _b;
    let inputRef;
    let selectRef;
    const [form] = antd_1.Form.useForm();
    if ((video === null || video === void 0 ? void 0 : video.token) && !lib_1.unitPrices.find((p) => p.value === video.token)) {
        lib_1.unitPrices.push({ value: video.token, text: <numberformat_1.default value={video.token} suffix=" tokens"/> });
        lib_1.unitPrices.sort((a, b) => a.value - b.value);
    }
    const [tokens, setTokenPrice] = React.useState(lib_1.unitPrices);
    const [isSaleVideo, setIsSaleVideo] = React.useState(video.isSaleVideo);
    const [thumbnailFile, setThumbnail] = React.useState(video.thumbnail || '');
    const priceSelectOptions = tokens.map((price) => ({
        label: price.text,
        value: price.value
    }));
    const rightInputFrom = [
        {
            name: 'token',
            label: 'Token',
            rules: [
                {
                    required: true,
                    message: 'Please input video token!'
                },
                {
                    validator: (_, value) => new Promise((resolve, reject) => {
                        if (parseInt(value, 10) > 0)
                            return resolve(null);
                        return reject(new Error('Price must be positive integer number!'));
                    })
                }
            ],
            children: (<antd_1.Select ref={(ref) => (selectRef = ref)} placeholder="Please Select Number of Token" onKeyDown={(e) => {
                    if (e.keyCode === 13) {
                        return e.preventDefault();
                    }
                    return {};
                }} options={priceSelectOptions} dropdownRender={(menu) => (<>
              {menu}
              <antd_1.Divider dashed/>
              <antd_1.Input placeholder="Input number of token" type="number" min={1} ref={(ref) => (inputRef = ref)} onPressEnter={() => {
                        let token = parseInt(inputRef.state.value, 10);
                        if (token < 1)
                            token = 1;
                        setTimeout(() => {
                            form.setFieldsValue({ token });
                        }, 100);
                        if (tokens.find((t) => t.value === token))
                            return;
                        setTokenPrice([
                            ...tokens,
                            {
                                text: `${token} tokens`,
                                value: token
                            }
                        ].sort((a, b) => a.value - b.value));
                    }}/>
            </>)}/>)
        },
        {
            name: 'status',
            label: 'Status',
            rules: [
                {
                    required: true,
                    message: 'Please input video status!'
                }
            ],
            children: (<antd_1.Select placeholder="Select Video Status">
          {PERFORMER_VIDEO_STATUS.map((status) => (<Option key={status.key} value={status.key}>
              {status.name}
            </Option>))}
        </antd_1.Select>)
        }
    ];
    const [videoFIle, setVideoFile] = React.useState([]);
    const [trailerFile, setTrailerFile] = React.useState([]);
    const onVideoFileChange = ({ file }) => {
        setVideoFile([Object.assign(Object.assign({}, file), { status: 'success', percent: 100 })]);
    };
    const onVideoTrailerChange = ({ file }) => {
        setTrailerFile([Object.assign(Object.assign({}, file), { status: 'success', percent: 100 })]);
    };
    const onThumbnailChange = (info) => {
        const reader = new FileReader();
        reader.onload = (e) => {
            setThumbnail(e.target.result);
        };
        reader.readAsDataURL(info.fileList[0].originFileObj);
    };
    return (<antd_1.Form 
    // {...formItemLayout}
    form={form} onFinish={onFinish} className="video-form" initialValues={Object.assign(Object.assign({}, defaultValue), video)} layout="vertical">
      <antd_1.Row gutter={25}>
        <antd_1.Col sm={12} xs={24}>
          <input_item_list_1.default fields={leftInputFrom}/>

          <antd_1.Form.Item name="video" label="Video" rules={[{ required: true, message: 'File is required' }]}>
            <antd_1.Upload showUploadList={{
            showRemoveIcon: false,
            showPreviewIcon: true,
            showDownloadIcon: false
        }} listType="picture" fileList={videoFIle} accept="video/*" customRequest={() => true} onChange={onVideoFileChange}>
              <antd_1.Button block>
                <icons_1.UploadOutlined />
                {' '}
                Upload File
              </antd_1.Button>
            </antd_1.Upload>
          </antd_1.Form.Item>
          {((_a = video === null || video === void 0 ? void 0 : video.video) === null || _a === void 0 ? void 0 : _a.url) && (<antd_1.Form.Item>
              <video src={video.video.url} style={imageStyle} controls/>
            </antd_1.Form.Item>)}
          <antd_1.Form.Item name="trailer" label="Trailer">
            <antd_1.Upload showUploadList={{
            showRemoveIcon: false,
            showPreviewIcon: true,
            showDownloadIcon: false
        }} listType="picture" fileList={trailerFile} accept="video/*,.mkv" customRequest={() => true} onChange={onVideoTrailerChange}>
              <antd_1.Button block>
                <icons_1.UploadOutlined />
                {' '}
                Upload File
              </antd_1.Button>
            </antd_1.Upload>
          </antd_1.Form.Item>
          {((_b = video === null || video === void 0 ? void 0 : video.trailer) === null || _b === void 0 ? void 0 : _b.url) && (<antd_1.Form.Item>
              <video src={video.trailer.url} style={imageStyle} controls/>
            </antd_1.Form.Item>)}
          <antd_1.Form.Item name="thumbnail" label="Thumbnail">
            <antd_1.Upload showUploadList={false} accept="image/*" customRequest={() => true} onChange={onThumbnailChange}>
              <antd_1.Button block>
                <icons_1.UploadOutlined />
                {' '}
                Upload File
              </antd_1.Button>
              <div>
                {thumbnailFile && (<img src={thumbnailFile} style={imageStyle} alt=""/>)}
              </div>
            </antd_1.Upload>
          </antd_1.Form.Item>
        </antd_1.Col>
        <antd_1.Col sm={12} xs={24}>
          <antd_1.Form.Item {...rightInputFrom[1]}/>
          <antd_1.Form.Item name="isSaleVideo" required>
            <antd_1.Checkbox checked={isSaleVideo} onChange={(e) => [
            setIsSaleVideo(!isSaleVideo),
            form.setFieldsValue({ isSaleVideo: !isSaleVideo })
        ]}>
              Is for sale?
            </antd_1.Checkbox>
          </antd_1.Form.Item>
          {isSaleVideo && <antd_1.Form.Item {...rightInputFrom[0]}/>}
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
VideoForm.defaultProps = {
    video: null
};
exports.default = VideoForm;
