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
/* eslint-disable no-return-assign */
const react_1 = __importStar(require("react"));
const icons_1 = require("@ant-design/icons");
const icons_2 = require("@components/common/base/icons");
const antd_1 = require("antd");
const index_1 = require("src/services/index");
const reselect_1 = require("reselect");
const react_redux_1 = require("react-redux");
const link_1 = __importDefault(require("next/link"));
const router_1 = __importStar(require("next/router"));
const actions_1 = require("@redux/auth/actions");
const actions_2 = require("@redux/performer/actions");
const actions_3 = require("@redux/settings/actions");
const socket_1 = require("src/socket");
const actions_4 = require("@redux/streaming/actions");
const dynamic_1 = __importDefault(require("next/dynamic"));
const lib_1 = require("src/lib");
const actions_5 = require("src/redux/studio/actions");
const sound_1 = __importDefault(require("src/components/common/base/sound"));
const actions_6 = require("@redux/message/actions");
const numberformat_1 = __importDefault(require("@components/common/layout/numberformat"));
require("./header.less");
const constants_1 = require("src/constants");
const LeftHeaderContent = dynamic_1.default(() => Promise.resolve().then(() => __importStar(require('./left-header-content'))), {
    ssr: false
});
const roundBalance = (balance) => {
    if (balance < 10000)
        return Math.round(balance);
    return '9999+';
};
const EVENT = {
    RECEIVED_PRIVATE_CHAT_REQUEST: 'private-chat-request',
    NOTIFY_READ_MESSAGE: 'nofify_read_messages_in_conversation',
    TIPPED: 'tipped'
};
class Header extends react_1.PureComponent {
    constructor(props) {
        super(props);
        this.handleMessage = (event) => {
            const { countNotReadMessage: dispatchCountNotReadMessage } = this.props;
            event && dispatchCountNotReadMessage(event.total);
        };
        this.handlePrivateChat = (data) => {
            const { addPrivateRequest: dispatchAddPrivateRequest, settings } = this.props;
            const path = settings[constants_1.SETTING_KEYS.OPTION_FOR_PRIVATE] === 'webrtc' ? 'webrtc/' : '';
            antd_1.message.success({
                content: (<span>
          {data.user.username}
          {' '}
          sent you a private chat request.
        </span>),
                duration: 10,
                key: data.conversationId,
                onClick: () => router_1.default.push({
                    pathname: `/live/${path}privatechat`,
                    query: { id: data.conversationId }
                }, `/live/${path}privatechat/${data.conversationId}`)
            });
            this.soundRef && this.soundRef.play();
            dispatchAddPrivateRequest(Object.assign(Object.assign({}, data), { createdAt: new Date() }));
        };
        this.sendTipHandler = ({ token, senderInfo }) => {
            antd_1.message.success(`${senderInfo.username} tip ${token === null || token === void 0 ? void 0 : token.toFixed(2)} tokens`, 10);
            this.soundRef && this.soundRef.play();
        };
        this.initSocketEvent = () => {
            this.socket = this.context;
            const { currentUser } = this.props;
            if (this.socket.connected) {
                if (currentUser.role === 'performer') {
                    this.socket.on(EVENT.RECEIVED_PRIVATE_CHAT_REQUEST, this.handlePrivateChat);
                    this.socket.on(EVENT.TIPPED, this.sendTipHandler);
                }
                this.socket.on(EVENT.NOTIFY_READ_MESSAGE, this.handleMessage);
            }
            else {
                this.socket.on('connect', () => {
                    if (currentUser.role === 'performer') {
                        this.socket.on(EVENT.RECEIVED_PRIVATE_CHAT_REQUEST, this.handlePrivateChat);
                        this.socket.on(EVENT.TIPPED, this.sendTipHandler);
                    }
                    this.socket.on(EVENT.NOTIFY_READ_MESSAGE, this.handleMessage);
                });
            }
        };
        this.state = {
            showSearch: false
        };
    }
    async componentDidMount() {
        const { getPerformerCategories: dispatchGetPerformerCategories, getCountries: dispatchGetCountries, getStudioStats: dispatchGetStudioStats, currentUser, loggedIn, countNotReadMessage: dispatchCountNotReadMessage } = this.props;
        // this.socket = this.context;
        dispatchGetPerformerCategories({ limit: 0 });
        dispatchGetCountries();
        if (currentUser === null || currentUser === void 0 ? void 0 : currentUser._id) {
            const data = await (await index_1.messageService.countTotalNotRead()).data;
            if (data) {
                dispatchCountNotReadMessage(data.total);
            }
        }
        if ((currentUser === null || currentUser === void 0 ? void 0 : currentUser._id) && currentUser.role === 'studio') {
            dispatchGetStudioStats();
        }
        if (loggedIn) {
            this.initSocketEvent();
            this.checkPermissionAccess();
        }
    }
    componentDidUpdate(prevProps) {
        const { loggedIn, router: { query: { unauthorized } } } = this.props;
        if (loggedIn && prevProps.loggedIn !== loggedIn) {
            setTimeout(this.initSocketEvent, 1000);
        }
        if (unauthorized !== prevProps.router.query.unauthorized) {
            this.checkPermissionAccess();
        }
    }
    componentWillUnmount() {
        if (this.socket) {
            this.socket.off(EVENT.NOTIFY_READ_MESSAGE);
            this.socket.off(EVENT.RECEIVED_PRIVATE_CHAT_REQUEST);
            this.socket.off(EVENT.TIPPED);
        }
    }
    onSearchPerformer(key) {
        this.search(key);
    }
    onPressEnter(event) {
        const target = event.currentTarget;
        const key = target.value;
        this.search(key);
    }
    search(key) {
        router_1.default.push({ pathname: '/', query: { q: key } }, `/?q=${key}`);
    }
    async checkPermissionAccess() {
        const { loggedIn, router: { query: { unauthorized } } } = this.props;
        if (!loggedIn || !unauthorized) {
            return;
        }
        this.beforeLogout();
    }
    async beforeLogout() {
        const { logout: dispatchLogout } = this.props;
        dispatchLogout();
        router_1.default.replace('/');
    }
    render() {
        const { ui, loggedIn, privateRequests, currentUser, tipSound, totalNotReadMessage, settings } = this.props;
        const { showSearch } = this.state;
        const path = settings[constants_1.SETTING_KEYS.OPTION_FOR_PRIVATE] === 'webrtc' ? 'webrtc/' : '';
        const rightContent = loggedIn ? (<>
        <link_1.default href={loggedIn && currentUser.role === 'user'
                ? '/account/user/funds-tokens'
                : '#'}>
          <antd_1.Tooltip title={`${(currentUser.balance && currentUser.balance.toFixed(2)) || 0} Tokens`}>
            <antd_1.Button style={{ margin: '0px 10px', color: '#ff0066' }} className="btn-tokens">
              {`${roundBalance((currentUser === null || currentUser === void 0 ? void 0 : currentUser.balance) || 0)} Tokens`}
            </antd_1.Button>
          </antd_1.Tooltip>
        </link_1.default>
        {currentUser.role === 'performer' && (<antd_1.Dropdown overlay={(<antd_1.Menu>
                {privateRequests.length > 0 ? (privateRequests.map((request) => {
                        var _a, _b, _c;
                        return (<antd_1.Menu.Item onClick={() => antd_1.message.destroy(request.conversationId)}>
                      <link_1.default href={{
                                pathname: `/live/${path}privatechat`,
                                query: {
                                    id: request.conversationId,
                                    streamId: request.id
                                }
                            }} as={`/live/${path}privatechat/${request.conversationId}?streamId=${request.id}`} key={request.conversationId}>
                        <a>
                          <antd_1.Card bordered={false} hoverable={false}>
                            <antd_1.Card.Meta avatar={(<antd_1.Avatar src={((_a = request.user) === null || _a === void 0 ? void 0 : _a.avatar)
                                    || '/default-user-icon.png'}/>)} title={(<>
                                  <span>{(_b = request.user) === null || _b === void 0 ? void 0 : _b.username}</span>
                                  {' '}
                                  (
                                  <numberformat_1.default value={((_c = request.user) === null || _c === void 0 ? void 0 : _c.balance) || 0} suffix=" tokens"/>
                                  )
                                </>)} description={lib_1.formatDate(request === null || request === void 0 ? void 0 : request.createdAt)}/>
                          </antd_1.Card>
                        </a>
                      </link_1.default>
                    </antd_1.Menu.Item>);
                    })) : (<antd_1.Menu.Item>There are no private request.</antd_1.Menu.Item>)}
              </antd_1.Menu>)}>
            <span className="call-requests">
              <antd_1.Badge count={privateRequests.length} showZero>
                <icons_1.BellOutlined style={{ color: '#ffffff' }}/>
              </antd_1.Badge>
            </span>
          </antd_1.Dropdown>)}
        <antd_1.Dropdown overlay={(<antd_1.Menu key="menu-right-content">
              {currentUser.role === 'user' && [
                    <antd_1.Menu.Item key="settings-menu-right-content" onClick={() => router_1.default.push('/account/user/account-settings')}>
                  <span>
                    <icons_1.SettingOutlined className="primary-icon"/>
                    {' '}
                    Profile
                  </span>
                </antd_1.Menu.Item>,
                    <antd_1.Menu.Item key="favorite-menu-right-content" onClick={() => router_1.default.push('/account/user/favorites')}>
                  <span>
                    <icons_1.HeartOutlined className="primary-icon"/>
                    {' '}
                    My Favorites
                  </span>
                </antd_1.Menu.Item>,
                    <antd_1.Menu.Item key="funds-tokens-menu-right-content" onClick={() => router_1.default.push('/account/user/funds-tokens')}>
                  <span>
                    <span className="anticon primary-icon">
                      <icons_2.FundsIcon />
                    </span>
                    {' '}
                    Funds / Tokens
                  </span>
                </antd_1.Menu.Item>,
                    <antd_1.Menu.Item key="user-messages-menu-right-content" onClick={() => router_1.default.push('/messages')}>
                  <span>
                    <icons_1.MessageOutlined className="primary-icon"/>
                    {' '}
                    Messages (
                    {totalNotReadMessage || 0}
                    )
                  </span>
                </antd_1.Menu.Item>
                ]}

              {currentUser.role === 'performer' && [
                    <antd_1.Menu.Item key="profile-menu-right-content" onClick={() => router_1.default.push('/account/performer/profile')}>
                  <span>
                    <icons_1.UserOutlined className="primary-icon"/>
                    {' '}
                    Profile
                  </span>
                </antd_1.Menu.Item>,
                    <antd_1.Menu.Item key="account-settings-menu-right-content" onClick={() => router_1.default.push('/account/performer/account-settings')}>
                  <span>
                    <icons_1.SettingOutlined className="primary-icon"/>
                    {' '}
                    Account
                    Settings
                  </span>
                </antd_1.Menu.Item>,
                    <antd_1.Menu.Item key="model-messages-menu-right-content" onClick={() => router_1.default.push('/messages')}>
                  <span>
                    <icons_1.MessageOutlined className="primary-icon"/>
                    {' '}
                    Messages (
                    {totalNotReadMessage}
                    )
                  </span>
                </antd_1.Menu.Item>
                ]}
              {currentUser.role === 'studio' && [
                    <antd_1.Menu.Item key="account-settings-menu-right-content" onClick={() => router_1.default.push('/studio/account-settings')}>
                  <span>
                    <icons_1.SettingOutlined className="primary-icon"/>
                    {' '}
                    Account
                    Settings
                  </span>
                </antd_1.Menu.Item>
                ]}
              <antd_1.Menu.Item key="log-out" onClick={this.beforeLogout.bind(this)}>
                <icons_1.LogoutOutlined className="primary-icon"/>
                {' '}
                Log out
              </antd_1.Menu.Item>
            </antd_1.Menu>)}>
          <antd_1.Avatar style={{
                margin: '0 15px',
                cursor: 'pointer',
                background: '#ffffff'
            }} src={(currentUser === null || currentUser === void 0 ? void 0 : currentUser.avatar) || '/default-user-icon.png'}/>
        </antd_1.Dropdown>
      </>) : (<antd_1.Button className="btn-login" onClick={() => router_1.default.push('/auth/login/user', '/auth/login')}>
        Login
      </antd_1.Button>);
        return (<antd_1.Layout.Header className="header" id="layoutHeader">
        <sound_1.default ref={(ref) => (this.soundRef = ref)} soundUrl={tipSound}/>
        <div className="left-container">
          <link_1.default href="/">
            <a className="header-logo">
              <img src={typeof ui.logo === 'string' && ui.logo.length > 0
                ? ui.logo
                : '/xcam-logo-white.png'} alt="header-logo"/>
            </a>
          </link_1.default>
          <LeftHeaderContent {...this.props} current={currentUser}/>
        </div>
        <div className="right-container">
          <div className={showSearch ? 'search-icon active' : 'search-icon'} aria-hidden onClick={() => this.setState({ showSearch: !showSearch })}>
            {showSearch ? <icons_1.CloseOutlined /> : <icons_1.SearchOutlined />}
          </div>
          <div className={!showSearch ? 'hide search-bar' : 'search-bar'}>
            <antd_1.Input.Search placeholder="Enter keyword" loading={false} allowClear enterButton onPressEnter={this.onPressEnter.bind(this)} onSearch={this.onSearchPerformer.bind(this)}/>
          </div>
          {rightContent}
        </div>
      </antd_1.Layout.Header>);
    }
}
Header.contextType = socket_1.SocketContext;
const userSelecter = (state) => state.user.current;
const performerSelecter = (state) => state.performer.current;
const studioSelecter = (state) => state.studio.current;
const authSelecter = (state) => state.auth;
const currentUserSelecter = reselect_1.createSelector(userSelecter, performerSelecter, studioSelecter, authSelecter, (user, performer, studio, auth) => {
    if (!auth.loggedIn)
        return {};
    if (user === null || user === void 0 ? void 0 : user._id) {
        return Object.assign(Object.assign({}, user), { role: 'user' });
    }
    if (performer === null || performer === void 0 ? void 0 : performer._id) {
        return Object.assign(Object.assign({}, performer), { role: 'performer' });
    }
    if (studio === null || studio === void 0 ? void 0 : studio._id) {
        return Object.assign(Object.assign({}, studio), { role: 'studio' });
    }
    return {};
});
Header.contextType = socket_1.SocketContext;
const mapStateToProps = (state) => (Object.assign({ ui: Object.assign({}, state.ui), currentUser: currentUserSelecter(state), tipSound: state.settings.tipSound, loggedIn: state.auth.loggedIn, performerCategories: state.performer.categories, totalNotReadMessage: state.message.totalNotReadMessage }, state.streaming));
const mapDispatch = {
    logout: actions_1.logout,
    getPerformerCategories: actions_2.getPerformerCategories,
    getCountries: actions_3.getCountries,
    addPrivateRequest: actions_4.addPrivateRequest,
    getStudioStats: actions_5.getStudioStats,
    countNotReadMessage: actions_6.countNotReadMessage
};
exports.default = react_redux_1.connect(mapStateToProps, mapDispatch)(router_1.withRouter(Header));
