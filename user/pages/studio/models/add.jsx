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
const antd_1 = require("antd");
const page_header_1 = __importDefault(require("@components/common/layout/page-header"));
const head_1 = __importDefault(require("next/head"));
const router_1 = __importDefault(require("next/router"));
const react_1 = __importStar(require("react"));
const studio_add_model_form_1 = __importDefault(require("@components/studio/models-manager/studio-add-model-form"));
const utils_1 = require("@lib/utils");
const services_1 = require("src/services");
const actions_1 = require("src/redux/studio/actions");
const react_redux_1 = require("react-redux");
require("./index.less");
class StudioAddModel extends react_1.PureComponent {
    constructor() {
        super(...arguments);
        this.state = {
            error: false,
            loading: false,
            message: ''
        };
    }
    async onFinish(data) {
        const { updateTotalPerformer: dispatchUpdateTotalPerformer } = this.props;
        try {
            this.setState({ loading: true, error: false, message: '' });
            await services_1.studioService.addModel(data);
            antd_1.message.success('Added successfully');
            dispatchUpdateTotalPerformer(1);
            router_1.default.push('/studio/models');
        }
        catch (e) {
            const error = await Promise.resolve(e);
            this.setState({ error: true, message: utils_1.getResponseError(error) });
        }
        finally {
            this.setState({ loading: false });
        }
    }
    render() {
        const { error, loading, message: newMessage } = this.state;
        return (<>
        <head_1.default>
          <title>Add New Member</title>
        </head_1.default>
        <div className="studio-models-background">
          <page_header_1.default title=""/>
          <div className="studio-models-box">
            <studio_add_model_form_1.default onFinish={this.onFinish.bind(this)} loading={loading} error={error} message={newMessage}/>
          </div>
        </div>
      </>);
    }
}
StudioAddModel.authenticate = true;
StudioAddModel.layout = 'primary';
exports.default = react_redux_1.connect(null, { updateTotalPerformer: actions_1.updateTotalPerformer })(StudioAddModel);
