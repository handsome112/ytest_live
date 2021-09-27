"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const socket_io_client_1 = __importDefault(require("socket.io-client"));
const auth_service_1 = require("@services/auth.service");
const react_redux_1 = require("react-redux");
const utils_1 = require("./utils");
const SocketContext_1 = require("./SocketContext");
const env_1 = __importDefault(require("../env"));
class Socket extends react_1.default.Component {
    constructor(props) {
        super(props);
        this.connect();
    }
    componentDidUpdate(nextProps) {
        const { loggedIn } = this.props;
        if (nextProps.loggedIn !== loggedIn) {
            this.connect();
        }
        return true;
    }
    componentWillUnmount() {
        this.socket && this.socket.close();
    }
    connect() {
        const { loggedIn } = this.props;
        const token = loggedIn && auth_service_1.authService.getToken();
        if (!process.browser) {
            return;
        }
        const { uri = env_1.default.socketEndpoint } = this.props;
        const options = {
            transports: ['websocket', 'polling', 'long-polling'],
            query: token ? `token=${token}` : ''
        };
        this.socket && this.socket.close();
        this.socket = socket_io_client_1.default(uri, this.mergeOptions(options));
        this.socket.status = 'initialized';
        this.socket.on('connect', () => {
            this.socket.status = 'connected';
            utils_1.debug('connected');
        });
        this.socket.on('disconnect', () => {
            this.socket.status = 'disconnected';
            utils_1.debug('disconnect');
        });
        this.socket.on('error', (err) => {
            this.socket.status = 'failed';
            utils_1.warning('error', err);
        });
        this.socket.on('reconnect', (data) => {
            this.socket.status = 'connected';
            utils_1.debug('reconnect', data);
        });
        this.socket.on('reconnect_attempt', () => {
            utils_1.debug('reconnect_attempt');
        });
        this.socket.on('reconnecting', () => {
            this.socket.status = 'reconnecting';
            utils_1.debug('reconnecting');
        });
        this.socket.on('reconnect_failed', (error) => {
            this.socket.status = 'failed';
            utils_1.warning('reconnect_failed', error);
        });
    }
    mergeOptions(options = {}) {
        const defaultOptions = {
            reconnection: true,
            reconnectionAttempts: Infinity,
            reconnectionDelay: 1 * 1000,
            reconnectionDelayMax: 5 * 1000,
            autoConnect: true,
            transports: ['websocket', 'polling', 'long-polling'],
            rejectUnauthorized: true
        };
        return Object.assign(Object.assign({}, defaultOptions), options);
    }
    render() {
        const { children } = this.props;
        return (<SocketContext_1.SocketContext.Provider value={this.socket}>
        {react_1.default.Children.only(children)}
      </SocketContext_1.SocketContext.Provider>);
    }
}
const mapStates = (state) => ({
    loggedIn: state.auth.loggedIn
});
exports.default = react_redux_1.connect(mapStates)(Socket);
