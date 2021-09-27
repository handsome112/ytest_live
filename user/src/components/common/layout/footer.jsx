"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable react/no-danger */
require("./footer.less");
const react_1 = require("react");
const antd_1 = require("antd");
const react_redux_1 = require("react-redux");
class Footer extends react_1.PureComponent {
    render() {
        const { ui } = this.props;
        const { menus = [], siteName } = ui;
        return (<antd_1.Layout.Footer id="layoutFooter">
        <div className="footer-custom">
          <antd_1.Divider />
          {menus === null || menus === void 0 ? void 0 : menus.map((menu) => (<a href={menu.path || '/'} key={menu._id} className="mr-8" target="_blank" rel="noreferrer">
              {menu.title}
            </a>))}
          {(ui === null || ui === void 0 ? void 0 : ui.footerContent) ? (<div dangerouslySetInnerHTML={{ __html: ui.footerContent }}/>) : (<p>
              © Copyright
              {' '}
              {siteName}
              {' '}
              {new Date().getFullYear()}
              . All Rights Reserved
            </p>)}
        </div>
      </antd_1.Layout.Footer>);
    }
}
const mapStateToProps = (state) => ({
    ui: Object.assign({}, state.ui)
});
const mapDispatch = {};
exports.default = react_redux_1.connect(mapStateToProps, mapDispatch)(Footer);
