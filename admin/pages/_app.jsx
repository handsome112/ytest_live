"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
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
const actions_3 = require("@redux/ui/actions");
const setting_service_1 = require("@services/setting.service");
const head_1 = __importDefault(require("next/head"));
require("../style/index.less");
const actions_4 = require("@redux/settings/actions");
function redirectLogin(ctx) {
    if (process.browser) {
        index_1.authService.removeToken();
        return router_1.default.push('/auth/login');
    }
    // fix for production build
    ctx.res.clearCookie && ctx.res.clearCookie('token');
    ctx.res.writeHead && ctx.res.writeHead(302, { Location: '/auth/login' });
    ctx.res.end && ctx.res.end();
}
async function updateSettingsStore(ctx, settings) {
    try {
        const { store } = ctx;
        store.dispatch(actions_3.updateUIValue({
            logo: settings.logoUrl,
            siteName: settings.siteName,
        }));
        store.dispatch(actions_4.updateSettings(settings));
        // TODO - update others like meta data
    }
    catch (e) {
        // TODO - implement me
        console.log(e);
    }
}
async function auth(ctx) {
    try {
        const { store } = ctx;
        const state = store.getState();
        if (state.auth && state.auth.loggedIn) {
            return;
        }
        // TODO - move to a service
        const { token } = next_cookies_1.default(ctx);
        if (!token) {
            // log out and redirect to login page
            // TODO - reset app state?
            return redirectLogin(ctx);
        }
        index_1.authService.setAuthHeaderToken(token);
        const user = await index_1.userService.me({
            Authorization: token
        });
        // TODO - check permission
        if (user.data && !user.data.roles.includes('admin')) {
            return redirectLogin(ctx);
        }
        store.dispatch(actions_1.loginSuccess());
        store.dispatch(actions_2.updateCurrentUser(user.data));
    }
    catch (e) {
        return redirectLogin(ctx);
    }
}
class Application extends app_1.default {
    // TODO - consider if we need to use get static props in children component instead?
    // or check in render?
    static async getInitialProps({ Component, ctx }) {
        // won't check auth for un-authenticated page such as login, register
        // use static field in the component
        if (Component.authenticate !== false) {
            await auth(ctx);
        }
        let settings = {};
        if (!process.browser) {
            try {
                const resp = await setting_service_1.settingService.public();
                // TODO encrypt, decypt header script, footer script or other info if needed
                settings = resp.data;
                if (settings)
                    await updateSettingsStore(ctx, settings);
            }
            catch (e) {
                console.log(await e);
            }
        }
        let pageProps = {};
        if (Component.getInitialProps) {
            pageProps = await Component.getInitialProps({ ctx });
        }
        return {
            settings,
            pageProps,
            layout: Component.layout
        };
    }
    render() {
        const { Component, pageProps, store, settings } = this.props;
        const layout = Component.layout;
        return (<react_redux_1.Provider store={store}>
        <head_1.default>
          <link rel="icon" href={settings && settings.favicon} sizes="64x64"></link>
        </head_1.default>
        <base_layout_1.default layout={layout}>
          <Component {...pageProps}/>
        </base_layout_1.default>
      </react_redux_1.Provider>);
    }
}
exports.default = withReduxSaga_1.default(Application);
