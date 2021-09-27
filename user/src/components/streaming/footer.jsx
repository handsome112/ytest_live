"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable no-return-assign */
require("./footer.less");
const constants_1 = require("src/constants");
const react_1 = __importDefault(require("react"));
const antd_1 = require("antd");
const icons_1 = require("@ant-design/icons");
const utils_1 = require("src/lib/utils");
const router_1 = __importDefault(require("next/router"));
const popup_1 = __importDefault(require("@components/common/base/popup"));
const services_1 = require("src/services");
const numberformat_1 = __importDefault(require("@components/common/layout/numberformat"));
const content_1 = __importDefault(require("./tip/content"));
const btnStyle = { height: 50, marginBottom: 1 };
const Footer = ({ activeConversation, performer, loggedIn, inGroupChat, inPrivateChat, user, updateCurrentUserBalance, settings }) => {
    const tipPopupRef = react_1.default.createRef();
    let contentRef;
    const { username, _id } = performer;
    const [tipping, setTipping] = react_1.default.useState(false);
    const [disableOk, setDisableOk] = react_1.default.useState(false);
    const handleError = async (e) => {
        const error = await Promise.resolve(e);
        antd_1.message.error(utils_1.getResponseError(error));
    };
    const goChatRoom = (roomName) => {
        if (!utils_1.checkUserLogin(loggedIn, user)) {
            if (process.browser) {
                router_1.default.push('/auth/login');
            }
            return;
        }
        const option = roomName === 'privatechat' ? constants_1.SETTING_KEYS.OPTION_FOR_PRIVATE : constants_1.SETTING_KEYS.OPTION_FOR_GROUP;
        const path = settings[option] === 'webrtc' ? 'webrtc/' : '';
        router_1.default.push({
            pathname: `/stream/${path}${roomName}`,
            query: { username, performer: JSON.stringify(performer) }
        }, `/stream/${path}${roomName}/${username}`);
    };
    const getMoreTokens = () => {
        if (!utils_1.checkUserLogin(loggedIn, user)) {
            if (process.browser) {
                router_1.default.push('/auth/login');
            }
            return;
        }
        router_1.default.push('/account/user/funds-tokens');
    };
    const sendTip = () => {
        if (!utils_1.checkUserLogin(loggedIn, user)) {
            antd_1.message.error(`Please login to send tip to ${username}!`);
            return;
        }
        tipPopupRef.current && tipPopupRef.current.setVisible(true);
    };
    const onOk = async () => {
        var _a;
        if ((_a = activeConversation === null || activeConversation === void 0 ? void 0 : activeConversation.data) === null || _a === void 0 ? void 0 : _a._id) {
            const ref = tipPopupRef.current;
            try {
                setTipping(true);
                const token = contentRef ? contentRef.getValueToken() : 0;
                if (parseInt(token, 10) <= 0)
                    return;
                await services_1.transactionService.sendTipToken(_id, token, activeConversation.data._id);
                ref && ref.setVisible(false);
                updateCurrentUserBalance && updateCurrentUserBalance(-token);
                const content = (<numberformat_1.default value={token} prefix="You sent " suffix=" tokens"/>);
                antd_1.message.success(content);
            }
            catch (e) {
                handleError(e);
            }
            finally {
                setTipping(false);
                ref && ref.setVisible(false);
            }
        }
    };
    return (<div className="stream-footer">
      <popup_1.default title={`Tips to ${username}`} okButtonProps={{ disabled: disableOk }} content={(<content_1.default ref={(ref) => (contentRef = ref)} setDisableOk={setDisableOk}/>)} ref={tipPopupRef} loading={tipping} onOk={onOk} width={567}/>
      <antd_1.Row gutter={[1, 1]} style={{ marginBottom: '15px', marginTop: '1px' }}>
        <antd_1.Col lg={6} xs={12} md={12}>
          <antd_1.Button disabled={inGroupChat} type="primary" style={Object.assign({}, btnStyle)} onClick={() => goChatRoom('groupchat')} block icon={(<img className="anticon" src="/icons/group.svg" height={16} alt=""/>)}>
            Group Chat
          </antd_1.Button>
        </antd_1.Col>
        <antd_1.Col lg={6} xs={12} md={12}>
          <antd_1.Button disabled={inPrivateChat} type="primary" style={Object.assign({}, btnStyle)} onClick={() => goChatRoom('privatechat')} block icon={<icons_1.UserOutlined />}>
            Private Chat
          </antd_1.Button>
        </antd_1.Col>
        <antd_1.Col lg={6} xs={12} md={12}>
          <antd_1.Button type="primary" style={Object.assign({}, btnStyle)} block onClick={() => getMoreTokens()} icon={<icons_1.CrownOutlined />}>
            Top-up My Tokens
          </antd_1.Button>
        </antd_1.Col>
        <antd_1.Col lg={6} xs={12} md={12}>
          <antd_1.Button type="primary" style={Object.assign({}, btnStyle)} onClick={() => sendTip()} block icon={<icons_1.PlusCircleOutlined />}>
            Send Tip
          </antd_1.Button>
        </antd_1.Col>
      </antd_1.Row>
    </div>);
};
Footer.defaultProps = {
    updateCurrentUserBalance: null,
    inGroupChat: false,
    inPrivateChat: false
};
exports.default = Footer;
