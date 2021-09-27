"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const antd_1 = require("antd");
const link_1 = __importDefault(require("next/link"));
const react_redux_1 = require("react-redux");
const actions_1 = require("src/redux/ui/actions");
require("./left-header-content.less");
const constants_1 = require("src/constants");
const router_1 = require("next/router");
const LeftHeaderContent = ({ loggedIn, current, pluralTextModel, performerCategories, settings }) => {
    const router = router_1.useRouter();
    const path = settings[constants_1.SETTING_KEYS.OPTION_FOR_GROUP] === 'webrtc' ? 'webrtc/' : '';
    let MenuItem = [
        <antd_1.Menu.Item key="home">
      <link_1.default href="/" shallow>
        <a>Home</a>
      </link_1.default>
    </antd_1.Menu.Item>,
        <antd_1.Menu.SubMenu title="Categories" key="left-menu-performer-categories" popupClassName="menu-left-header-submenu-popup">
      {performerCategories.data.length > 0
                && performerCategories.data.map((category) => (<antd_1.Menu.Item key={`category-${category._id}`}>
            <link_1.default href={{
                        pathname: '/performer-category',
                        query: {
                            slug: category.slug,
                            category: JSON.stringify(category)
                        }
                    }} as={`/performer-category/${category.slug}`}>
              <a>{category.name}</a>
            </link_1.default>
          </antd_1.Menu.Item>))}
    </antd_1.Menu.SubMenu>,
        <antd_1.Menu.Item key="all-model">
      <link_1.default href="/performer-category" as="/all-models">
        <a>{`All ${pluralTextModel || 'Models'}`}</a>
      </link_1.default>
    </antd_1.Menu.Item>
    ];
    if (loggedIn && (current === null || current === void 0 ? void 0 : current._id) && (current === null || current === void 0 ? void 0 : current.role) === 'performer') {
        MenuItem = [
            ...MenuItem,
            <antd_1.Menu.Item disabled={router.route === '/live'} key="left-menu-live-chat">
        <link_1.default href="/live">
          <a>Go Live</a>
        </link_1.default>
      </antd_1.Menu.Item>,
            <antd_1.Menu.Item disabled={router.route === '/live/groupchat'} key="left-menu-groupchat">
        <link_1.default href={`/live/${path}groupchat`}>
          <a>Group Chat</a>
        </link_1.default>
      </antd_1.Menu.Item>
        ];
    }
    return (<>
      <antd_1.Menu mode="horizontal" className="menu-left-header">
        {MenuItem}
      </antd_1.Menu>
    </>);
};
LeftHeaderContent.defaultProps = {
    loggedIn: false,
    current: null,
    settings: null,
    pluralTextModel: '',
    performerCategories: {
        total: 0,
        data: []
    }
};
const mapStateToProps = (state) => (Object.assign(Object.assign({ loggedIn: state.auth.loggedIn }, state.performer.performers), state.ui));
const mapDispatch = { updateUIValue: actions_1.updateUIValue };
exports.default = react_redux_1.connect(mapStateToProps, mapDispatch)(LeftHeaderContent);
