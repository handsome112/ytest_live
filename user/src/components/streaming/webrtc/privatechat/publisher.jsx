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
const services_1 = require("src/services");
const router_1 = __importDefault(require("next/router"));
const react_1 = __importStar(require("react"));
const antmedia_1 = __importDefault(require("src/antmedia"));
const constants_1 = require("src/antmedia/constants");
const socket_1 = require("src/socket");
const video_js_1 = __importDefault(require("video.js"));
const plugin_1 = __importDefault(require("src/videojs/mic-controls/plugin"));
require("./index.less");
class Publisher extends react_1.PureComponent {
    constructor(props) {
        super(props);
        this.onbeforeunload = () => {
            const { publish_started, webRTCAdaptor } = this.props;
            const { conversationId, streamId } = this.state;
            if (streamId && publish_started) {
                webRTCAdaptor && webRTCAdaptor.leaveFromRoom(conversationId);
                this.socket.emit('private-stream/leave', {
                    conversationId,
                    streamId
                });
            }
            if (this.publisher) {
                this.publisher.dispose();
                this.publisher = undefined;
            }
            this.setState({
                conversationId: null,
                streamId: null
            });
        };
        this.state = {
            conversationId: null,
            streamId: null
        };
    }
    componentDidMount() {
        this.socket = this.context;
        video_js_1.default.registerPlugin('webRTCMicControlsPlugin', plugin_1.default);
        router_1.default.events.on('routeChangeStart', this.onbeforeunload);
        window.addEventListener('beforeunload', this.onbeforeunload);
    }
    componentWillUnmount() {
        window.removeEventListener('beforeunload', this.onbeforeunload);
        router_1.default.events.off('routeChangeStart', this.onbeforeunload);
    }
    async handelWebRTCAdaptorCallback(info, obj) {
        const { webRTCAdaptor, settings, muteLocalMic, unmuteLocalMic } = this.props;
        const { conversationId, streamId } = this.state;
        if (info === constants_1.WEBRTC_ADAPTOR_INFORMATIONS.INITIALIZED) {
            webRTCAdaptor.joinRoom(conversationId, streamId);
        }
        else if (info === constants_1.WEBRTC_ADAPTOR_INFORMATIONS.JOINED_THE_ROOM) {
            const token = await services_1.streamService.getPublishToken({ streamId, settings });
            webRTCAdaptor.publish(streamId, token);
        }
        else if (info === constants_1.WEBRTC_ADAPTOR_INFORMATIONS.PUBLISH_STARTED) {
            const player = video_js_1.default('private-publishe', {
                liveui: true,
                controls: true,
                muted: true,
                controlBar: {
                    playToggle: false,
                    currentTimeDisplay: false,
                    fullscreenToggle: false,
                    pictureInPictureToggle: false,
                    volumePanel: false
                }
            });
            player.error(null);
            player.one('play', () => {
                this.publisher = player;
                // eslint-disable-next-line dot-notation
                this.publisher['webRTCMicControlsPlugin']({
                    muteLocalMic,
                    unmuteLocalMic,
                    isMicMuted: false
                });
            });
            this.socket.emit('private-stream/join', {
                conversationId,
                streamId: obj.streamId
            });
        }
        else if (info === constants_1.WEBRTC_ADAPTOR_INFORMATIONS.PUBLISH_FINISHED) {
            this.socket.emit('private-stream/leave', {
                conversationId,
                streamId: obj.streamId
            });
        }
    }
    start(conversationId) {
        this.setState({ conversationId });
    }
    publish(streamId) {
        const { initWebRTCAdaptor } = this.props;
        this.setState({ streamId });
        initWebRTCAdaptor(this.handelWebRTCAdaptorCallback.bind(this));
    }
    stop() {
        const { leaveSession } = this.props;
        leaveSession && leaveSession();
    }
    render() {
        const { publish_started } = this.props;
        return (<video id="private-publisher" hidden={!publish_started} autoPlay playsInline muted/>);
    }
}
Publisher.contextType = socket_1.SocketContext;
exports.default = antmedia_1.default(Publisher);
