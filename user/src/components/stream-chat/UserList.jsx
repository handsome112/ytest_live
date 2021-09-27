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
const React = __importStar(require("react"));
const antd_1 = require("antd");
const icons_1 = require("@ant-design/icons");
const react_redux_1 = require("react-redux");
const utils_1 = require("@lib/utils");
const perfomer_service_1 = require("@services/perfomer.service");
const StreamingChatUsers = ({ loggedIn, members, currentPerformer, placeholderAvatarUrl }) => {
    const blockUser = React.useCallback(async ({ key }) => {
        if (!window.confirm('Are you sure to block this user?'))
            return;
        try {
            await perfomer_service_1.performerService.geoBlock({ userIds: [key] });
        }
        catch (e) {
            const error = await Promise.resolve(e);
            antd_1.message.error(utils_1.getResponseError(error));
        }
    }, [members]);
    return (<div className="conversation-users">
      <div className="users">
        {members.length > 0
            && members.map((m) => (<div className="user" key={m._id}>
            {loggedIn && currentPerformer && currentPerformer._id ? (<antd_1.Dropdown overlay={(<antd_1.Menu>
                    <antd_1.Menu.Item onClick={blockUser} key={m._id}>
                      <span>
                        <icons_1.StopOutlined size={16}/>
                        {' '}
                        Block this user
                      </span>
                    </antd_1.Menu.Item>
                  </antd_1.Menu>)} placement="bottomLeft" trigger={['hover', 'click']}>
                <span className="username">
                  <img alt="avatar" src={(m === null || m === void 0 ? void 0 : m.avatar) || placeholderAvatarUrl} width="35px" style={{ borderRadius: '50%', marginRight: '5px' }}/>
                  {m.username}
                  {' '}
                  <icons_1.DownOutlined />
                </span>
              </antd_1.Dropdown>) : (<span className="username">
                <img alt="avatar" src={(m === null || m === void 0 ? void 0 : m.avatar) || '/default-user-icon.png'} width="35px" style={{ borderRadius: '50%', marginRight: '5px' }}/>
                {m.username}
              </span>)}
          </div>))}
      </div>
    </div>);
};
const mapStates = (state) => ({
    placeholderAvatarUrl: state.ui.placeholderAvatarUrl
});
exports.default = react_redux_1.connect(mapStates)(StreamingChatUsers);
