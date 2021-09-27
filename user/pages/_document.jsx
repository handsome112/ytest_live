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
/* eslint-disable react/react-in-jsx-scope */
const document_1 = __importStar(require("next/document"));
const setting_service_1 = require("@services/setting.service");
class CustomDocument extends document_1.default {
    static async getInitialProps(ctx) {
        const initialProps = await document_1.default.getInitialProps(ctx);
        const resp = await setting_service_1.settingService.all();
        const settings = resp.data;
        return Object.assign(Object.assign({}, initialProps), { settings });
    }
    render() {
        const { settings } = this.props;
        return (<document_1.Html>
        <document_1.Head>
          <link rel="icon" href={settings === null || settings === void 0 ? void 0 : settings.favicon} sizes="64x64"/>
          <meta name="keywords" content={settings === null || settings === void 0 ? void 0 : settings.metaKeywords}/>
          <meta name="description" content={settings === null || settings === void 0 ? void 0 : settings.metaDescription}/>
          {/* OG tags */}
          <meta property="og:title" content={settings === null || settings === void 0 ? void 0 : settings.siteName} key="title"/>
          <meta property="og:image" content={settings === null || settings === void 0 ? void 0 : settings.logoUrl}/>
          <meta property="og:keywords" content={settings === null || settings === void 0 ? void 0 : settings.metaKeywords}/>
          <meta property="og:description" content={settings === null || settings === void 0 ? void 0 : settings.metaDescription}/>
          {/* GA code */}
          {(settings === null || settings === void 0 ? void 0 : settings.gaCode) && (<script 
            // eslint-disable-next-line react/no-danger
            dangerouslySetInnerHTML={{
                    __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
              new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
              'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer', '${settings.gaCode}');`
                }}/>)}
          {/* extra script */}
          {settings && settings.headerScript && (
            // eslint-disable-next-line react/no-danger
            <div dangerouslySetInnerHTML={{ __html: settings.headerScript }}/>)}
        </document_1.Head>
        <body>
          <document_1.Main />
          <document_1.NextScript />

          {/* extra script */}
          {(settings === null || settings === void 0 ? void 0 : settings.afterBodyScript) && (
            // eslint-disable-next-line react/no-danger
            <div dangerouslySetInnerHTML={{ __html: settings.afterBodyScript }}/>)}
        </body>
      </document_1.Html>);
    }
}
exports.default = CustomDocument;
