"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const head_1 = __importDefault(require("next/head"));
const react_1 = require("react");
const page_1 = __importDefault(require("@components/common/layout/page"));
const antd_1 = require("antd");
const menu_service_1 = require("@services/menu.service");
const loader_1 = __importDefault(require("@components/common/base/loader"));
const common_1 = require("@components/common");
const form_menu_1 = require("@components/menu/form-menu");
class MenuUpdate extends react_1.PureComponent {
    constructor() {
        super(...arguments);
        this.state = {
            submitting: false,
            fetching: true,
            menu: {}
        };
    }
    static async getInitialProps({ ctx }) {
        return ctx.query;
    }
    async componentDidMount() {
        try {
            const resp = await menu_service_1.menuService.findById(this.props.id);
            this.setState({ menu: resp.data });
        }
        catch (e) {
            antd_1.message.error('Menu not found!');
        }
        finally {
            this.setState({ fetching: false });
        }
    }
    async submit(data) {
        try {
            this.setState({ submitting: true });
            const submitData = Object.assign({}, data);
            await menu_service_1.menuService.update(this.props.id, submitData);
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
        const { menu, submitting, fetching } = this.state;
        return (<react_1.Fragment>
        <head_1.default>
          <title>Update Menu</title>
        </head_1.default>
        <common_1.BreadcrumbComponent breadcrumbs={[{ title: 'Menu', href: '/menu' }, { title: menu.title ? menu.title : 'Detail menu' }]}/>
        <page_1.default>
          {fetching ? <loader_1.default /> : <form_menu_1.FormMenu menu={menu} onFinish={this.submit.bind(this)} submitting={submitting}/>}
        </page_1.default>
      </react_1.Fragment>);
    }
}
exports.default = MenuUpdate;
