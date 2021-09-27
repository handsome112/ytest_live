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
const form_menu_1 = require("@components/menu/form-menu");
const common_1 = require("@components/common");
const router_1 = __importDefault(require("next/router"));
class MenuCreate extends react_1.PureComponent {
    constructor() {
        super(...arguments);
        this.state = {
            submitting: false
        };
    }
    async submit(data) {
        try {
            this.setState({ submitting: true });
            const submitData = Object.assign(Object.assign({}, data), { value: data.value / 100 });
            const resp = await menu_service_1.menuService.create(submitData);
            antd_1.message.success('Created successfully');
            // TODO - redirect
            await this.setState({
                submitting: false
            }, () => window.setTimeout(() => {
                router_1.default.push({
                    pathname: '/menu'
                }, `/menu`);
            }, 1000));
        }
        catch (e) {
            // TODO - check and show error here
            const err = (await Promise.resolve(e)) || {};
            antd_1.message.error(err.message || 'Something went wrong, please try again!');
            this.setState({ submitting: false });
        }
    }
    render() {
        return (<react_1.Fragment>
        <head_1.default>
          <title>Create new menu</title>
        </head_1.default>
        <common_1.BreadcrumbComponent breadcrumbs={[{ title: 'Menus', href: '/menu' }, { title: 'Create new menu' }]}/>
        <page_1.default>
          <form_menu_1.FormMenu onFinish={this.submit.bind(this)} submitting={this.state.submitting}/>
        </page_1.default>
      </react_1.Fragment>);
    }
}
exports.default = MenuCreate;
