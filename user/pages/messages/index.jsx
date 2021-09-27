"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable react/react-in-jsx-scope */
const antd_1 = require("antd");
const react_1 = require("react");
const react_redux_1 = require("react-redux");
const head_1 = __importDefault(require("next/head"));
const Messenger_1 = __importDefault(require("@components/messages/Messenger"));
const actions_1 = require("@redux/message/actions");
const { Content } = antd_1.Layout;
class Messages extends react_1.PureComponent {
    static getInitialProps({ ctx }) {
        return {
            query: ctx.query
        };
    }
    componentWillUnmount() {
        const { resetMessageState: resetStateHandler } = this.props;
        resetStateHandler();
    }
    render() {
        const { query = {} } = this.props;
        return (<>
        <head_1.default>
          <title>
            Messages
          </title>
        </head_1.default>
        <antd_1.Layout>
          <Content>
            <div className="main-container">
              <Messenger_1.default toSource={query.toSource} toId={query.toId}/>
            </div>
          </Content>
        </antd_1.Layout>
      </>);
    }
}
Messages.authenticate = true;
Messages.layout = 'primary';
const mapStates = (state) => ({
    ui: Object.assign({}, state.ui)
});
const mapDispatch = { resetMessageState: actions_1.resetMessageState };
exports.default = react_redux_1.connect(mapStates, mapDispatch)(Messages);
