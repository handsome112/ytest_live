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
const head_1 = __importDefault(require("next/head"));
const antd_1 = require("antd");
const page_header_1 = __importDefault(require("@components/common/layout/page-header"));
const react_1 = __importStar(require("react"));
const post_service_1 = require("@services/post.service");
const react_redux_1 = require("react-redux");
const loader_1 = __importDefault(require("@components/common/base/loader"));
const lib_1 = require("src/lib");
class PostDetail extends react_1.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            fetching: false,
            post: null
        };
    }
    static async getInitialProps({ ctx }) {
        const { query } = ctx;
        return query;
    }
    async componentDidMount() {
        this.getPost();
    }
    async componentDidUpdate(prevProps) {
        const { id } = this.props;
        if (prevProps.id !== id) {
            this.getPost();
        }
    }
    async getPost() {
        const { id } = this.props;
        try {
            this.setState({ fetching: true });
            const resp = await post_service_1.postService.findById(id);
            this.setState({ post: resp.data });
        }
        catch (e) {
            const error = await Promise.resolve(e);
            antd_1.message.error(lib_1.getResponseError(error));
        }
        finally {
            this.setState({ fetching: false });
        }
    }
    render() {
        const { post, fetching } = this.state;
        // const { ui } = this.props;
        return (<>
        <head_1.default>
          <title>
            {post && post.title}
          </title>
        </head_1.default>
        {fetching && (<loader_1.default spinning fullScreen/>)}
        <div className="page-container">
          <page_header_1.default title={post && post.title}/>
          <div className="page-content" 
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: post && post.content }}/>
        </div>
      </>);
    }
}
PostDetail.authenticate = false;
const mapProps = (state) => ({
    ui: state.ui
});
exports.default = react_redux_1.connect(mapProps)(PostDetail);
