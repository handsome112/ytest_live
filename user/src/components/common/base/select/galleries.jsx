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
const React = __importStar(require("react"));
const antd_1 = require("antd");
const services_1 = require("src/services");
const utils_1 = require("@lib/utils");
const { Option } = antd_1.Select;
const filter = (value, option) => option.children.toLowerCase().indexOf(value.toLowerCase()) > -1;
const Galleries = ({ autoFocus, disabled, form, defaultGalleryId }) => {
    const [galleries, setGalleries] = React.useState([]);
    const [galleryId, setGalleryId] = React.useState(defaultGalleryId);
    const getGalleryList = async (q = '') => {
        try {
            const resp = await services_1.galleryService.search({ q });
            setGalleries(resp.data.data);
        }
        catch (e) {
            const err = await Promise.resolve(e);
            antd_1.message.error(utils_1.getResponseError(err));
        }
    };
    const setInputValue = (value) => {
        setGalleryId(value);
        form && form.setFieldsValue({ galleryId: value });
    };
    React.useEffect(() => {
        getGalleryList();
    }, []);
    return (<antd_1.Select showSearch autoFocus={autoFocus} disabled={disabled} filterOption={filter} value={galleryId} onChange={(value) => setInputValue(value)} placeholder="Select your photo gallries">
      {galleries.map((gallery) => (<Option key={gallery._id} value={gallery._id}>
          {gallery.name}
        </Option>))}
    </antd_1.Select>);
};
Galleries.defaultProps = {
    autoFocus: false,
    disabled: false,
    // performerId: '',
    form: null,
    defaultGalleryId: ''
};
exports.default = Galleries;
