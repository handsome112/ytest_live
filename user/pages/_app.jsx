"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ROLE = void 0;
const app_1 = __importDefault(require("next/app"));
const react_1 = __importDefault(require("react"));
const react_redux_1 = require("react-redux");
const next_cookies_1 = __importDefault(require("next-cookies"));
const withReduxSaga_1 = __importDefault(require("@redux/withReduxSaga"));
const base_layout_1 = __importDefault(require("@layouts/base-layout"));
const index_1 = require("@services/index");
const router_1 = __importDefault(require("next/router"));
const actions_1 = require("@redux/auth/actions");
const actions_2 = require("@redux/user/actions");
const actions_3 = require("@redux/performer/actions");
const setting_service_1 = require("@services/setting.service");
const actions_4 = require("@redux/studio/actions");
const actions_5 = require("@redux/ui/actions");
const api_request_1 = require("src/services/api-request");
const socket_1 = require("src/socket");
require("../style/index.less");
const actions_6 = require("@redux/settings/actions");
const actions_7 = require("@redux/banner/actions");
const constants_1 = require("src/constants");
const actions_8 = require("@redux/streaming/actions");
const lodash_1 = require("lodash");
const head_1 = __importDefault(require("next/head"));
const cookie_1 = __importDefault(require("cookie"));
exports.ROLE = {
    STUDIO: 'studio',
    PERFORMER: 'performer',
    USER: 'user'
};
function redirectLogin(ctx, authenticate) {
    if (process.browser) {
        index_1.authService.removeToken();
        index_1.authService.removeRemember();
        if (authenticate && authenticate === exports.ROLE.STUDIO) {
            router_1.default.push('/studio/login');
            return;
        }
        router_1.default.push('/auth/login/user');
        return;
    }
    // fix for production build
    // ctx.res.clearCookie && ctx.res.clearCookie('token');
    const authCookie = cookie_1.default.serialize('token', '', {
        maxAge: -1
    });
    ctx.res.writeHead
        && ctx.res.writeHead(302, {
            'Set-Cookie': authCookie,
            Location: authenticate && authenticate === exports.ROLE.STUDIO
                ? '/studio/login'
                : '/auth/login/user'
        });
    ctx.res.end && ctx.res.end();
}
async function auth(ctx, authenticate) {
    try {
        if (process.browser && !authenticate)
            return;
        const { store } = ctx;
        const state = store.getState();
        if (state.auth && state.auth.loggedIn) {
            return;
        }
        // TODO - move to a service
        const { token, role } = next_cookies_1.default(ctx);
        if (token && role) {
            index_1.authService.setAuthHeaderToken(token);
            let resp;
            if (role === api_request_1.PERFORMER_ROLE) {
                resp = await index_1.performerService.me({
                    Authorization: token
                });
                store.dispatch(actions_3.updateCurrentPerformer(resp.data));
            }
            if (role === api_request_1.USER_ROLE) {
                resp = await index_1.userService.me({
                    Authorization: token
                });
                store.dispatch(actions_2.updateCurrentUser(resp.data));
            }
            if (role === exports.ROLE.STUDIO) {
                resp = await index_1.studioService.me({
                    Authorization: token
                });
                store.dispatch(actions_4.updateCurrentStudio(resp.data));
            }
            // TODO - check permission
            store.dispatch(actions_1.loginSuccess());
        }
        else if (authenticate) {
            redirectLogin(ctx, authenticate);
            return;
        }
    }
    catch (e) {
        if (authenticate) {
            redirectLogin(ctx, authenticate);
        }
    }
}
async function updateSettingsStore(ctx, settings) {
    try {
        const { store } = ctx;
        store.dispatch(actions_6.updateSettings({ tipSound: settings.tipSound }));
        store.dispatch(actions_7.getBannersSuccess(settings.banners));
        store.dispatch(actions_5.updateUIValue({
            placeholderLoginUrl: settings.placeholderLoginUrl,
            placeholderAvatarUrl: settings.placeholderAvatarUrl,
            logo: settings.logoUrl,
            siteName: settings.siteName,
            menus: settings.menus,
            footerContent: settings.footerContent,
            currencySymbol: settings.currencySymbol,
            singularTextModel: settings.singularTextModel,
            pluralTextModel: settings.pluralTextModel,
            popup18Enabled: settings.popup18Enabled,
            popup18ContentId: settings.popup18ContentId
        }));
        store.dispatch(actions_8.updateLiveStreamSettings(lodash_1.pick(settings, [
            constants_1.SETTING_KEYS.VIEWER_URL,
            constants_1.SETTING_KEYS.PUBLISHER_URL,
            constants_1.SETTING_KEYS.SUBSCRIBER_URL,
            constants_1.SETTING_KEYS.OPTION_FOR_BROADCAST,
            constants_1.SETTING_KEYS.OPTION_FOR_PRIVATE,
            constants_1.SETTING_KEYS.OPTION_FOR_GROUP,
            constants_1.SETTING_KEYS.DEFAULT_OFFLINE_MODEL_IMAGE,
            constants_1.SETTING_KEYS.DEFAULT_MODEL_PRIVATECALL_WITH_USER_IMAGE,
            constants_1.SETTING_KEYS.DEFAULT_MODEL_IN_GROUP_CHAT_IMAGE,
            constants_1.SETTING_KEYS.ANT_MEDIA_APPNAME
        ])));
        // TODO - update others like meta data
    }
    catch (e) {
        // TODO - implement me
        // eslint-disable-next-line no-console
        console.log(e);
    }
}
class Application extends app_1.default {
    // TODO - consider if we need to use get static props in children component instead?
    // or check in render?
    static async getInitialProps({ Component, ctx }) {
        var _a;
        // won't check auth for un-authenticated page such as login, register
        // use static field in the component
        await auth(ctx, Component.authenticate);
        // server side to load settings, once time only
        let settings = {};
        if (!process.browser) {
            const [_settings, _banner] = await Promise.all([
                setting_service_1.settingService.all(),
                index_1.bannerService.search({ status: 'active' })
            ]);
            // TODO encrypt, decypt header script, footer script or other info if needed
            settings = _settings.data || {};
            await updateSettingsStore(ctx, Object.assign(Object.assign({}, settings), { banners: ((_a = _banner === null || _banner === void 0 ? void 0 : _banner.data) === null || _a === void 0 ? void 0 : _a.data) || [] }));
        }
        let pageProps = {};
        if (Component.getInitialProps) {
            pageProps = await Component.getInitialProps({ ctx });
        }
        // TODO - overwrite for ui config by using redux-store
        return {
            settings,
            pageProps,
            layout: Component.layout
        };
    }
    render() {
        const { Component, pageProps, store, settings } = this.props;
        const { layout } = Component;
        return (<react_redux_1.Provider store={store}>
        <head_1.default>
          <title>
            {typeof settings.siteName === 'string'
                && settings.siteName.length > 0
                ? settings.siteName
                : 'Application'}
          </title>
          <meta name="viewport" content="initial-scale=1.0, width=device-width"/>
        </head_1.default>
        <socket_1.Socket>
          <base_layout_1.default layout={layout} maintenanceMode={settings.maintenanceMode}>
            <Component {...pageProps}/>
          </base_layout_1.default>
        </socket_1.Socket>
      </react_redux_1.Provider>);
    }
}
Application.settingQuery = false;
exports.default = withReduxSaga_1.default(Application);
