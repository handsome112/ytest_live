"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable react/no-danger */
require("./public-layout.less");
const react_1 = require("react");
const antd_1 = require("antd");
const react_redux_1 = require("react-redux");
const router_1 = __importDefault(require("next/router"));
const actions_1 = require("src/redux/ui/actions");
const header_1 = __importDefault(require("@components/common/layout/header"));
const loader_1 = __importDefault(require("@components/common/base/loader"));
const head_1 = __importDefault(require("next/head"));
const footer_1 = __importDefault(require("@components/common/layout/footer"));
const services_1 = require("src/services");
const layout_1 = require("src/components/common/layout");
class PrimaryLayout extends react_1.PureComponent {
    constructor() {
        super(...arguments);
        this.state = {
            routerChange: false,
            popupContent18: '',
            visiblePopup18: false
        };
        this.onThemeChange = (theme) => {
            const { updateUIValue: dispatchUpdateUIValue } = this.props;
            dispatchUpdateUIValue({ theme });
        };
        this.onCollapseChange = (collapsed) => {
            const { updateUIValue: dispatchUpdateUIValue } = this.props;
            dispatchUpdateUIValue({ collapsed });
        };
    }
    componentDidMount() {
        const { loadUIValue: dispatchLoadUIValue, popup18Enabled } = this.props;
        dispatchLoadUIValue();
        if (process.browser) {
            this.handleStateChange();
            const { agree18 } = localStorage;
            if (agree18 !== 'yes' && popup18Enabled) {
                this.getPopup18PlusContent();
            }
        }
    }
    handleStateChange() {
        router_1.default.events.on('routeChangeStart', () => this.setState({ routerChange: true }));
        router_1.default.events.on('routeChangeComplete', () => this.setState({ routerChange: false }));
    }
    handlePopup18Ok() {
        // set cookie / local storage and hide popup
        localStorage.setItem('agree18', 'yes');
        this.setState({ visiblePopup18: false });
    }
    handlePopup18Cancel() {
        window.location.href = 'http://www.google.com';
    }
    async getPopup18PlusContent() {
        var _a;
        try {
            const { popup18ContentId } = this.props;
            const resp = await services_1.postService.findById(popup18ContentId);
            this.setState({
                popupContent18: ((_a = resp.data) === null || _a === void 0 ? void 0 : _a.content) || ''
            });
        }
        catch (_b) {
            this.setState({ popupContent18: '' });
        }
        finally {
            this.setState({ visiblePopup18: true });
        }
    }
    render() {
        const { children, logo, 
        // siteName,
        theme, popup18ContentId } = this.props;
        const { routerChange, popupContent18, visiblePopup18 } = this.state;
        const headerProps = {
            logo,
            theme,
            onCollapseChange: this.onCollapseChange
        };
        return (<>
        <head_1.default>
          <script type="application/javascript" src="/lib/adapter-latest.js"/>
          <script type="application/javascript" src="/lib/webrtc_adaptor.js"/>
          <link href="https://unpkg.com/video.js@7.8.3/dist/video-js.css" rel="stylesheet"/>
          <script src="https://unpkg.com/video.js@7.8.3/dist/video.js"/>
          <script src="https://unpkg.com/@videojs/http-streaming@1.13.3/dist/videojs-http-streaming.js"/>
        </head_1.default>
        <antd_1.Layout id="publicLayout" className="container">
          <header_1.default {...headerProps}/>
          <div className="content">
            {routerChange && <loader_1.default spinning fullScreen/>}
            {/* <Bread routeList={newRouteList} /> */}
            {children}
          </div>
          <footer_1.default />
          <antd_1.Modal width={770} centered visible={visiblePopup18} title="Warning! This is content adult" onOk={this.handlePopup18Ok.bind(this)} onCancel={() => this.handlePopup18Cancel()}>
            {(popup18ContentId && popupContent18) ? <div dangerouslySetInnerHTML={{ __html: popupContent18 }}/> : <layout_1.Popup18PlusContent />}
          </antd_1.Modal>
          <antd_1.BackTop className="backTop" target={() => document.querySelector('#publicLayout')}/>
        </antd_1.Layout>
      </>);
    }
}
const mapStateToProps = (state) => (Object.assign(Object.assign({}, state.ui), state.auth));
const mapDispatchToProps = { updateUIValue: actions_1.updateUIValue, loadUIValue: actions_1.loadUIValue };
exports.default = react_redux_1.connect(mapStateToProps, mapDispatchToProps)(PrimaryLayout);
