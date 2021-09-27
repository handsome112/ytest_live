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
const lib_1 = require("src/lib");
const antd_1 = require("antd");
const router_1 = __importDefault(require("next/router"));
const icons_1 = require("@ant-design/icons");
const input_item_list_1 = __importDefault(require("@components/common/base/input-item-list"));
require("./index.less");
const numberformat_1 = __importDefault(require("@components/common/layout/numberformat"));
const fileStyle = {
    height: 'auto',
    width: 225,
    objectFit: 'cover',
    marginTop: 10
};
const renderDigitalFile = (digitalFile, metadata) => {
    const { type, name } = metadata;
    if (type.match('image/*')) {
        return <img src={digitalFile} style={fileStyle} alt=""/>;
    }
    if (type.match('video/*')) {
        return <video src={digitalFile} style={fileStyle} controls/>;
    }
    if (type.match('audio/*')) {
        return <audio src={digitalFile} controls/>;
    }
    return (<antd_1.Button type="link" style={{ padding: 0 }}>
      {name}
    </antd_1.Button>);
};
const initialValues = {
    description: '',
    publish: false,
    type: 'digital'
};
const radioStyle = {
    display: 'block',
    height: '30px',
    lineHeight: '30px'
};
const leftFormItem = [
    {
        name: 'name',
        label: 'Name',
        rules: [
            {
                required: true,
                message: 'Please input product name!'
            }
        ],
        children: <antd_1.Input placeholder="Enter Product Name"/>
    },
    {
        name: 'description',
        label: 'Description',
        children: <antd_1.Input.TextArea placeholder="Enter Product Description"/>
    },
    {
        name: 'publish',
        label: 'Publish',
        rules: [
            {
                required: true,
                message: 'Please input product name!'
            }
        ],
        children: (<antd_1.Radio.Group>
        <antd_1.Radio style={radioStyle} value key="publish">
          Yes
        </antd_1.Radio>
        <antd_1.Radio style={radioStyle} value={false} key="unpublish">
          No
        </antd_1.Radio>
      </antd_1.Radio.Group>)
    }
];
const ProductForm = ({ onFinish, loading, product }) => {
    let inputRef;
    let selectRef;
    const [form] = antd_1.Form.useForm();
    const [image, setImage] = React.useState(product ? product.image : '');
    const [digitalFileMetaData, setDigitalFileMetaData] = React.useState([]);
    const [productType, setProductType] = React.useState((product === null || product === void 0 ? void 0 : product.type) || 'digital');
    const onImageFileChange = ({ fileList }) => {
        const reader = new FileReader();
        reader.onload = (e) => {
            setImage(e.target.result);
        };
        reader.readAsDataURL(fileList[0].originFileObj);
    };
    const onDigitalFileChange = ({ file }) => {
        setDigitalFileMetaData([Object.assign(Object.assign({}, file), { status: 'success', percent: 100 })]);
    };
    if ((product === null || product === void 0 ? void 0 : product.token) && !lib_1.unitPrices.find((p) => p.value === product.token)) {
        lib_1.unitPrices.push({
            value: product.token,
            text: <numberformat_1.default value={product.token} suffix=" tokens"/>
        });
        lib_1.unitPrices.sort((a, b) => a.value - b.value);
    }
    const [tokens, setTokenPrice] = React.useState(lib_1.unitPrices);
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
                    message: 'Please input product token!'
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
            name: 'type',
            label: 'Type',
            rules: [
                {
                    required: true
                }
            ],
            children: (<antd_1.Radio.Group onChange={(e) => setProductType(e.target.value)}>
          <antd_1.Radio style={radioStyle} value="digital" key="digital">
            Digital
          </antd_1.Radio>
          <antd_1.Radio style={radioStyle} value="physical" key="physical">
            Physical
          </antd_1.Radio>
        </antd_1.Radio.Group>)
        },
        {
            name: 'stock',
            label: 'Stock',
            rules: [
                {
                    required: true,
                    message: 'Please input product instock!'
                },
                {
                    pattern: new RegExp(/^[1-9]\d*$/gm),
                    message: 'Stock must be positve integer number'
                }
            ],
            children: <antd_1.Input type="number" placeholder="Enter Product Stock"/>
        }
    ];
    return (<antd_1.Form form={form} onFinish={onFinish} name="productsForm" className="product-form" initialValues={Object.assign(Object.assign({}, initialValues), product)} layout="vertical">
      <antd_1.Row gutter={25}>
        <antd_1.Col sm={12} xs={24}>
          <input_item_list_1.default fields={leftFormItem}/>
        </antd_1.Col>
        <antd_1.Col sm={12} xs={24}>
          {/* <FormInputItem fields={rightInputFrom} /> */}
          <antd_1.Form.Item {...rightInputFrom[0]}/>
          <antd_1.Form.Item {...rightInputFrom[1]}/>
          {productType === 'physical' && <antd_1.Form.Item {...rightInputFrom[2]}/>}
          <antd_1.Form.Item name="image" label="Image File">
            <antd_1.Upload showUploadList={false} accept="image/*" customRequest={() => true} onChange={onImageFileChange}>
              <antd_1.Button type="primary">
                <icons_1.UploadOutlined />
                {' '}
                Upload File
              </antd_1.Button>
              <div>{image && <img src={image} style={fileStyle} alt=""/>}</div>
            </antd_1.Upload>
          </antd_1.Form.Item>
          {productType === 'digital' && (<>
              <antd_1.Form.Item name="digitalFile" label="Digital File">
                <antd_1.Upload showUploadList={{
                showRemoveIcon: false,
                showPreviewIcon: true,
                showDownloadIcon: false
            }} listType="picture" fileList={digitalFileMetaData} customRequest={() => true} onChange={onDigitalFileChange}>
                  <antd_1.Button type="primary">
                    <icons_1.UploadOutlined />
                    {' '}
                    Upload File
                  </antd_1.Button>
                </antd_1.Upload>
              </antd_1.Form.Item>
              <antd_1.Form.Item>
                <div>
                  {!digitalFileMetaData.length && (product === null || product === void 0 ? void 0 : product.digitalFile) && (<a className="upload-item-name" href={product.digitalFile} download>
                      {product.digitalFile}
                    </a>)}
                </div>
              </antd_1.Form.Item>
            </>)}
        </antd_1.Col>
      </antd_1.Row>
      <antd_1.Form.Item {...lib_1.tailFormItemLayout}>
        <antd_1.Space>
          <antd_1.Button type="primary" onClick={() => router_1.default.push('/account/performer/products')}>
            Back
          </antd_1.Button>
          <antd_1.Button type="primary" htmlType="submit" disabled={loading} loading={loading}>
            Save Changes
          </antd_1.Button>
        </antd_1.Space>
      </antd_1.Form.Item>
    </antd_1.Form>);
};
ProductForm.defaultProps = {
    product: null
};
exports.default = ProductForm;
