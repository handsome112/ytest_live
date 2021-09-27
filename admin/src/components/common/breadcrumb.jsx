"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BreadcrumbComponent = void 0;
const react_1 = require("react");
const antd_1 = require("antd");
const icons_1 = require("@ant-design/icons");
const link_1 = __importDefault(require("next/link"));
class BreadcrumbComponent extends react_1.PureComponent {
    render() {
        const { breadcrumbs } = this.props;
        return (<div style={{ marginBottom: '16px' }}>
        <antd_1.Breadcrumb>
          <antd_1.Breadcrumb.Item href="/dashboard">
            <icons_1.HomeOutlined />
          </antd_1.Breadcrumb.Item>
          {breadcrumbs &&
                breadcrumbs.length > 0 &&
                breadcrumbs.map((b, index) => (<antd_1.Breadcrumb.Item key={index}>
                {b.href ? (<link_1.default href={b.href}>
                    <a>{b.title}</a>
                  </link_1.default>) : (b.title)}
              </antd_1.Breadcrumb.Item>))}
        </antd_1.Breadcrumb>
      </div>);
    }
}
exports.BreadcrumbComponent = BreadcrumbComponent;
