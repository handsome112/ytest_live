"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable dot-notation */
/* eslint-disable camelcase */
const react_1 = __importDefault(require("react"));
const router_1 = __importDefault(require("next/router"));
const constants_1 = require("src/constants");
const antd_1 = require("antd");
const env_1 = __importDefault(require("../env"));
const constants_2 = require("./constants");
function withAntmedia(Component) {
    class AntMediaComponent extends react_1.default.Component {
        constructor(props) {
            super(props);
            this.onbeforeunload = () => {
                this.leaveSession();
            };
            const { sessionId } = this.props;
            this.state = {
                initialized: false,
                publish_started: false,
                isMicMuted: false,
                streamId: sessionId
            };
        }
        static async getInitialProps(ctx) {
            const pageProps = Component.getInitialProps && (await Component.getInitialProps(ctx));
            // Return props.
            return Object.assign({}, pageProps);
        }
        componentDidMount() {
            const { initImmediately } = this.props;
            initImmediately && this.initWebRTCAdaptor();
            router_1.default.events.on('routeChangeStart', this.onbeforeunload);
            // window.addEventListener('beforeunload', this.onbeforeunload);
        }
        componentWillUnmount() {
            router_1.default.events.off('routeChangeStart', this.onbeforeunload);
            // window.removeEventListener('beforeunload', this.onbeforeunload);
        }
        leaveSession() {
            const { streamId, initialized } = this.state;
            const { configs: { isPlayMode } } = this.props;
            if (this.autoRepublishIntervalJob) {
                window.clearInterval(this.autoRepublishIntervalJob);
            }
            if (this.webRTCAdaptor) {
                if (streamId) {
                    this.webRTCAdaptor.stop(streamId);
                    this.webRTCAdaptor.closePeerConnection(streamId);
                    if (!isPlayMode) {
                        this.webRTCAdaptor.closeStream(streamId);
                    }
                }
                if (initialized) {
                    this.webRTCAdaptor.closeWebSocket();
                }
                this.webRTCAdaptor = undefined;
            }
            this.setState({
                streamId: '',
                initialized: false,
                isMicMuted: false
            });
        }
        initWebRTCAdaptor(cb, cbError) {
            const { configs, settings, autoRepublishDisabled, callback } = this.props;
            const { isPlayMode } = configs;
            const { debug } = env_1.default;
            const publisherURL = isPlayMode
                ? settings[constants_1.SETTING_KEYS.SUBSCRIBER_URL]
                : settings[constants_1.SETTING_KEYS.PUBLISHER_URL];
            if (!publisherURL) {
                antd_1.message.error('Undefined WebsocketURL!');
                return;
            }
            if (!this.webRTCAdaptor && autoRepublishDisabled)
                return;
            const pc_config = {
                iceServers: [
                    {
                        urls: 'stun:stun.l.google.com:19302'
                    }
                ]
            };
            const sdpConstraints = {
                OfferToReceiveAudio: false,
                OfferToReceiveVideo: false
            };
            const mediaConstraints = {
                video: true,
                audio: true
            };
            const appName = configs.appName || settings.AntMediaAppname;
            const path = `${publisherURL}/${appName}/websocket`;
            let websocketURL = `ws://${path}`;
            if (window.location.protocol.startsWith('https')) {
                websocketURL = `wss://${path}`;
            }
            this.setState({ cb, cbError });
            this.webRTCAdaptor = new window['WebRTCAdaptor'](Object.assign(Object.assign({ websocket_url: websocketURL, mediaConstraints,
                debug, peerconnection_config: pc_config, sdp_constraints: sdpConstraints, bandwidth: env_1.default.maxVideoBitrateKbps, isPlayMode: false }, configs), { callback: (info, obj) => {
                    if (info === 'initialized') {
                        this.setState({ initialized: true });
                    }
                    else if (info === 'publish_started') {
                        this.setState({
                            publish_started: true,
                            streamId: obj.streamId
                        });
                        if (!this.autoRepublishIntervalJob && !autoRepublishDisabled) {
                            this.autoRepublishIntervalJob = setInterval(this.checkAndRepublishIfRequired.bind(this), 5000);
                        }
                    }
                    else if (info === 'publish_finished') {
                        this.setState({ publish_started: false, streamId: '' });
                        // if (this.autoRepublishIntervalJob) {
                        //   window.clearInterval(this.autoRepublishIntervalJob);
                        // }
                    }
                    else if (info === constants_2.WEBRTC_ADAPTOR_INFORMATIONS.ICE_CONNECTION_STATE_CHANGED) {
                        this.setState({
                            iceConnectionState: obj.state
                        });
                    }
                    else if (info === constants_2.WEBRTC_ADAPTOR_INFORMATIONS.REFRESH_CONNECTION) {
                        const { publish_started } = this.state;
                        if (publish_started && !autoRepublishDisabled) {
                            this.checkAndRepublishIfRequired();
                        }
                    }
                    else if (info === constants_2.WEBRTC_ADAPTOR_INFORMATIONS.CLOSED) {
                        // this.leaveSession();
                        if (typeof obj !== 'undefined') {
                            // eslint-disable-next-line no-console
                            console.log(`Connecton closed: ${JSON.stringify(obj)}`);
                        }
                    }
                    callback && typeof callback === 'function' && callback(info, obj); // props
                    cb && typeof cb === 'function' && cb(info, obj); // param
                }, callbackError: (error, message) => {
                    cbError && typeof cbError === 'function' && cbError(error, message);
                    this.callbackError(error, message, { websocketURL });
                } }));
        }
        checkAndRepublishIfRequired() {
            try {
                const { streamId, cb, cbError } = this.state;
                if (!this.webRTCAdaptor || !streamId)
                    return;
                const iceState = this.webRTCAdaptor.iceConnectionState(streamId);
                if (iceState == null
                    || iceState === 'failed'
                    || iceState === 'disconnected') {
                    // eslint-disable-next-line no-console
                    console.error('Publish has stopped and will try to re-publish');
                    this.webRTCAdaptor.stop(streamId);
                    this.webRTCAdaptor.closePeerConnection(streamId);
                    this.webRTCAdaptor.closeWebSocket();
                    this.initWebRTCAdaptor(cb, cbError);
                }
            }
            catch (e) {
                // eslint-disable-next-line no-console
                console.error('error republish', e);
            }
        }
        callbackError(error, message, options) {
            // some of the possible errors, NotFoundError, SecurityError,PermissionDeniedError
            // eslint-disable-next-line no-console
            console.error(`error callback: ${JSON.stringify(error)}`);
            const { websocketURL } = options;
            if (typeof message === 'string') {
                // eslint-disable-next-line no-console
                console.error('error message:', message);
                antd_1.message.error(message, 3);
                return;
            }
            let errorMessage = JSON.stringify(error);
            if (errorMessage.indexOf('noStreamNameSpecified') !== -1) {
                // eslint-disable-next-line no-console
                console.warn(errorMessage);
                return;
            }
            if (errorMessage.indexOf('NotFoundError') !== -1) {
                errorMessage = 'Camera or Mic are not found or not allowed in your device';
            }
            else if (errorMessage.indexOf('NotReadableError') !== -1
                || errorMessage.indexOf('TrackStartError') !== -1) {
                errorMessage = 'Camera or Mic is being used by some other process that does not let read the devices';
            }
            else if (errorMessage.indexOf('OverconstrainedError') !== -1
                || errorMessage.indexOf('ConstraintNotSatisfiedError') !== -1) {
                errorMessage = 'There is no device found that fits your video and audio constraints. You may change video and audio constraints';
            }
            else if (errorMessage.indexOf('NotAllowedError') !== -1
                || errorMessage.indexOf('PermissionDeniedError') !== -1) {
                errorMessage = 'You are not allowed to access camera and mic.';
            }
            else if (errorMessage.indexOf('TypeError') !== -1) {
                errorMessage = 'Video/Audio is required';
            }
            else if (errorMessage.indexOf('ScreenSharePermissionDenied') !== -1) {
                errorMessage = 'You are not allowed to access screen share';
            }
            else if (errorMessage.indexOf('WebSocketNotConnected') !== -1) {
                errorMessage = 'WebRTCAdaptor Connection is disconnected';
            }
            else if (errorMessage.indexOf('unauthorized_access') !== -1) {
                errorMessage = 'Access Denied. You don’t have permission to access';
            }
            else if (errorMessage.indexOf('streamIdInUse') !== -1) {
                errorMessage = 'Stream have been already published. Please close the previous connection.';
            }
            else if (errorMessage.indexOf('publishTimeoutError') !== -1) {
                errorMessage = 'WebRTC Publishing Timeout Error';
            }
            else if (errorMessage.indexOf('not_allowed_unregistered_streams') !== -1) {
                errorMessage = 'Stream with an unregistered id is not allowed';
            }
            else if (errorMessage.indexOf('UnsecureContext') !== -1) {
                errorMessage = 'Fatal Error: Browser cannot access camera and mic because of unsecure context. Please install SSL and access via https';
            }
            else if (errorMessage.indexOf('WebSocketNotSupported') !== -1) {
                errorMessage = 'Fatal Error: WebSocket not supported in this browser';
            }
            else if (errorMessage.indexOf('AudioAlreadyActive') !== -1) {
                errorMessage = 'AudioAlreadyActive';
            }
            else if (errorMessage.indexOf('isTrusted') !== -1) {
                errorMessage = `WebSocket connection to ${websocketURL} failed`;
                window.location.reload();
            }
            else {
                errorMessage = 'WebRTCAdaptor Connection Error';
            }
            errorMessage && antd_1.message.error(errorMessage, 3);
        }
        muteLocalMic() {
            if (this.webRTCAdaptor) {
                this.webRTCAdaptor.muteLocalMic();
                this.setState({ isMicMuted: true });
                antd_1.message.success('Muted local mic successfully');
            }
        }
        unmuteLocalMic() {
            if (this.webRTCAdaptor) {
                this.webRTCAdaptor.unmuteLocalMic();
                this.setState({ isMicMuted: false });
                antd_1.message.success('Unmuted local mic successfully');
            }
        }
        render() {
            const { forwardedRef } = this.props;
            return (<Component {...this.props} {...this.state} webRTCAdaptor={this.webRTCAdaptor} initWebRTCAdaptor={this.initWebRTCAdaptor.bind(this)} muteLocalMic={this.muteLocalMic.bind(this)} unmuteLocalMic={this.unmuteLocalMic.bind(this)} leaveSession={this.leaveSession.bind(this)} ref={forwardedRef}/>);
        }
    }
    return react_1.default.forwardRef((props, ref) => (<AntMediaComponent {...props} forwardedRef={ref}/>));
    // const mapStateToProps = (state) => ({ settings: state.streaming.settings });
    // const MapComponent = connect(mapStateToProps)(AntMediaComponent);
}
exports.default = withAntmedia;
