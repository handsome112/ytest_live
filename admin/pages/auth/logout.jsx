"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
const react_redux_1 = require("react-redux");
require("./index.less");
const head_1 = __importDefault(require("next/head"));
const actions_1 = require("@redux/auth/actions");
const page_1 = __importDefault(require("@components/common/layout/page"));
class Logout extends react_1.PureComponent {
    componentDidMount() {
        this.props.logout();
    }
    render() {
        return (<react_1.Fragment>
        <head_1.default>
          <title>Log out</title>
        </head_1.default>
        <page_1.default>
          <span>Logout...</span>
        </page_1.default>
      </react_1.Fragment>);
    }
}
Logout.authenticate = false;
const mapStates = (state) => ({
    sLogout: state.auth.logout
});
exports.default = react_redux_1.connect(mapStates, { logout: actions_1.logout })(Logout);
