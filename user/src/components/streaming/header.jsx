"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const antd_1 = require("antd");
const icons_1 = require("@components/common/base/icons");
const popup_1 = __importDefault(require("@components/common/base/popup"));
const lib_1 = require("src/lib");
const icons_2 = require("@ant-design/icons");
const services_1 = require("src/services");
const utils_1 = require("src/lib/utils");
const router_1 = __importDefault(require("next/router"));
const numberformat_1 = __importDefault(require("@components/common/layout/numberformat"));
const content_1 = __importDefault(require("./tip/content"));
require("./header.less");
const btnStyle = { height: 35, margin: 8 };
exports.default = ({ performer, ui, loggedIn, user, updateCurrentUserBalance, activeConversation }) => {
    const tipPopupRef = react_1.default.createRef();
    let contentRef;
    const { _id, username } = performer;
    const [isFavorite, setIsFavorite] = react_1.default.useState(performer.isFavorite || false);
    const [disableOk, setDisableOk] = react_1.default.useState(false);
    const [tipping, setTipping] = react_1.default.useState(false);
    const handleError = async (e) => {
        const error = await Promise.resolve(e);
        antd_1.message.error(utils_1.getResponseError(error));
    };
    const onLike = async () => {
        if (!utils_1.checkUserLogin(loggedIn, user)) {
            antd_1.message.error('Please login to add favorite!');
            return;
        }
        try {
            await services_1.favouriteService.favorite(_id, isFavorite);
            setIsFavorite(!isFavorite);
        }
        catch (e) {
            handleError(e);
        }
    };
    const sendGift = () => {
        if (!utils_1.checkUserLogin(loggedIn, user)) {
            antd_1.message.error(`Please login to send gift to ${username}!`);
        }
    };
    const notify = () => {
        if (!utils_1.checkUserLogin(loggedIn, user)) {
            antd_1.message.error(`Please login to notify ${username}!`);
        }
    };
    const sendMessage = () => {
        if (!utils_1.checkUserLogin(loggedIn, user)) {
            if (process.browser) {
                router_1.default.push('/auth/login');
            }
            return;
        }
        router_1.default.push({
            pathname: '/messages',
            query: {
                toSource: 'performer',
                toId: _id || ''
            }
        });
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
    return (<>
      <popup_1.default title={`Tips to ${username}`} okButtonProps={{ disabled: disableOk }} content={(<content_1.default ref={(ref) => {
                contentRef = ref;
            }} setDisableOk={setDisableOk}/>)} loading={tipping} ref={tipPopupRef} onOk={onOk} width={567}/>
      <antd_1.Row className="stream-header">
        <antd_1.Col sm={12} xs={24}>

          <div className="left-content">
            <img src={performer.avatar || (ui === null || ui === void 0 ? void 0 : ui.placeholderAvatarUrl) || '/user.png'} alt="" className="stream-avatar"/>
            {' '}
            <div className="stream-title">
              <span>
                {performer.username}
              </span>
              {performer.streamingTitle && (<span>
                {performer.streamingTitle}
              </span>)}
            </div>
          </div>
          {/* <span>Report abuse</span> */}
        </antd_1.Col>
        <antd_1.Col sm={12} xs={24}>
          {/* <Space className="button-block"> */}
          <antd_1.Row className="button-block">
            <antd_1.Button type="primary" hidden icon={<icons_1.GiftIcon />} style={btnStyle} onClick={() => sendGift()}>
              Send Gift
            </antd_1.Button>
            <antd_1.Button type="default" hidden style={btnStyle} icon={<icons_2.HeartOutlined />} onClick={() => notify()}>
              Notify me
            </antd_1.Button>
            <antd_1.Col>
              <antd_1.Button type="default" style={btnStyle} icon={<icons_2.MailOutlined />} onClick={() => sendMessage()}>
                Send message
              </antd_1.Button>
            </antd_1.Col>
            <antd_1.Col>
              <antd_1.Button type="default" style={Object.assign(Object.assign({}, btnStyle), { width: 100, flexDirection: 'row', justifyContent: 'center' })} onClick={() => onLike()} icon={isFavorite ? (<icons_2.HeartFilled style={{ color: lib_1.defaultColor.primaryColor }}/>) : (<icons_2.HeartOutlined style={{ color: lib_1.defaultColor.primaryColor }}/>)}>
                {isFavorite ? 'UnLike' : 'Like'}
              </antd_1.Button>
            </antd_1.Col>
            <antd_1.Col>
              <antd_1.Button type="primary" style={btnStyle} onClick={() => sendTip()} icon={<icons_2.PlusCircleOutlined />}>
                Send Tip
              </antd_1.Button>
            </antd_1.Col>

            {/* </Space> */}
          </antd_1.Row>
        </antd_1.Col>
      </antd_1.Row>
    </>);
};
