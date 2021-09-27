"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const SocketContext_1 = require("./SocketContext");
const utils_1 = require("./utils");
class Event extends react_1.default.Component {
    constructor(props) {
        super(props);
    }
    componentDidMount() {
        const { event, handler } = this.props;
        const socket = this.context;
        if (!socket) {
            utils_1.warning('Socket IO connection has not been established.');
            return;
        }
        socket.on(event, handler);
    }
    componentWillUnmount() {
        const { event } = this.props;
        const socket = this.context;
        if (!socket) {
            utils_1.warning('Socket IO connection has not been established.');
            return;
        }
        socket.off(event);
    }
    render() {
        return false;
    }
}
Event.contextType = SocketContext_1.SocketContext;
exports.default = Event;
