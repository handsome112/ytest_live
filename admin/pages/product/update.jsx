"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const head_1 = __importDefault(require("next/head"));
const react_1 = require("react");
const page_1 = __importDefault(require("@components/common/layout/page"));
const antd_1 = require("antd");
const product_service_1 = require("@services/product.service");
const loader_1 = __importDefault(require("@components/common/base/loader"));
const common_1 = require("@components/common");
const form_product_1 = require("@components/product/form-product");
class ProductUpdate extends react_1.PureComponent {
    constructor() {
        super(...arguments);
        this.state = {
            submitting: false,
            fetching: true,
            product: {},
            uploadPercentage: 0
        };
        this._files = {
            image: null,
            digitalFile: null
        };
    }
    static async getInitialProps({ ctx }) {
        return ctx.query;
    }
    async componentDidMount() {
        try {
            const resp = await product_service_1.productService.findById(this.props.id);
            this.setState({ product: resp.data });
        }
        catch (e) {
            antd_1.message.error('Product not found!');
        }
        finally {
            this.setState({ fetching: false });
        }
    }
    beforeUpload(file, field) {
        this._files[field] = file;
    }
    onUploading(resp) {
        if (this._files['image'] || this._files['digitalFile']) {
            this.setState({ uploadPercentage: resp.percentage });
        }
    }
    async submit(data) {
        try {
            const files = Object.keys(this._files).reduce((files, key) => {
                if (this._files[key]) {
                    files.push({
                        fieldname: key,
                        file: this._files[key] || null
                    });
                }
                return files;
            }, []);
            this.setState({ submitting: true });
            const submitData = Object.assign({}, data);
            await product_service_1.productService.update(this.props.id, files, submitData, this.onUploading.bind(this));
            antd_1.message.success('Updated successfully');
            this.setState({ submitting: false });
        }
        catch (e) {
            // TODO - check and show error here
            antd_1.message.error('Something went wrong, please try again!');
            this.setState({ submitting: false });
        }
    }
    render() {
        const { product, submitting, fetching, uploadPercentage } = this.state;
        return (<react_1.Fragment>
        <head_1.default>
          <title>Update Product</title>
        </head_1.default>
        <common_1.BreadcrumbComponent breadcrumbs={[
                { title: 'Product', href: '/product' },
                { title: product.name ? product.name : 'Detail product' },
                { title: 'Update' }
            ]}/>
        <page_1.default>
          {fetching ? (<loader_1.default />) : (<form_product_1.FormProduct product={product} submit={this.submit.bind(this)} uploading={submitting} beforeUpload={this.beforeUpload.bind(this)} uploadPercentage={uploadPercentage}/>)}
        </page_1.default>
      </react_1.Fragment>);
    }
}
exports.default = ProductUpdate;
