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
/* eslint-disable dot-notation */
/* eslint-disable camelcase */
const react_1 = __importStar(require("react"));
const antmedia_1 = __importDefault(require("src/antmedia"));
const antd_1 = require("antd");
const router_1 = __importDefault(require("next/router"));
const constants_1 = require("src/antmedia/constants");
const socket_1 = require("src/socket");
const services_1 = require("src/services");
const video_js_1 = __importDefault(require("video.js"));
const classnames_1 = __importDefault(require("classnames"));
const plugin_1 = __importDefault(require("src/videojs/mic-controls/plugin"));
require("./private-streaming-container.less");
const STREAM_JOINED = 'private-stream/streamJoined';
const STREAM_LEAVED = 'private-stream/streamLeaved';
const JOINED_THE_ROOM = 'JOINED_THE_ROOM';
class PrivateStreamingContainer extends react_1.PureComponent {
    constructor(props) {
        super(props);
        this.activeStreams = [];
        this.onbeforeunload = () => {
            this.leaveStream();
        };
        this.state = {
            sessionId: null,
            streamId: null,
            conversationId: null,
            loading: false
        };
    }
    componentDidMount() {
        this.socket = this.context;
        video_js_1.default.registerPlugin('webRTCMicControlsPlugin', plugin_1.default);
        router_1.default.events.on('routeChangeStart', this.onbeforeunload);
        window.addEventListener('beforeunload', this.onbeforeunload);
    }
    componentDidUpdate(prevProps, prevStates) {
        const { processing } = this.props;
        const { conversationId } = this.state;
        if (prevProps.processing !== processing) {
            this.handleLoading(processing);
        }
        if (conversationId && conversationId !== prevStates.conversationId) {
            this.initSocketEvent();
        }
    }
    componentWillUnmount() {
        router_1.default.events.off('routeChangeStart', this.onbeforeunload);
        window.removeEventListener('beforeunload', this.onbeforeunload);
    }
    handleLoading(v) {
        this.setState({ loading: v });
    }
    async handelWebRTCAdaptorCallback(info, obj) {
        const { sessionId, conversationId, streamId } = this.state;
        const { settings, webRTCAdaptor } = this.props;
        this.socket = this.context;
        if (info === constants_1.WEBRTC_ADAPTOR_INFORMATIONS.INITIALIZED) {
            if (settings.optionForPrivate === 'hls') {
                const token = await services_1.streamService.getPublishToken({
                    streamId,
                    settings
                });
                webRTCAdaptor.publish(streamId, token);
            }
            webRTCAdaptor.joinRoom(conversationId, streamId);
        }
        else if (info === constants_1.WEBRTC_ADAPTOR_INFORMATIONS.NEW_STREAM_AVAILABLE) {
            const activeStream = this.activeStreams.find((id) => id === obj.streamId);
            if (!activeStream) {
                this.activeStreams.push(obj.streamId);
                this.createRemoteVideo(obj.stream);
            }
        }
        else if (info === constants_1.WEBRTC_ADAPTOR_INFORMATIONS.JOINED_THE_ROOM) {
            if (settings.optionForPrivate === 'webrtc') {
                const token = await services_1.streamService.getPublishToken({
                    streamId,
                    settings
                });
                webRTCAdaptor.publish(streamId, token);
            }
        }
        else if (info === constants_1.WEBRTC_ADAPTOR_INFORMATIONS.PUBLISH_STARTED) {
            const { muteLocalMic, unmuteLocalMic } = this.props;
            const player = video_js_1.default('private-publisher', {
                liveui: true,
                controls: true,
                muted: true,
                bigPlayButton: false,
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
                streamId: obj.streamId,
                sessionId
            });
            this.setState({ loading: false });
        }
        else if (info === constants_1.WEBRTC_ADAPTOR_INFORMATIONS.PUBLISH_FINISHED) {
            this.socket.emit('private-stream/leave', {
                conversationId,
                streamId: obj.streamId,
                sessionId
            });
            this.setState({ loading: false });
        }
    }
    initSocketEvent() {
        const { initWebRTCAdaptor, role_data, performer } = this.props;
        this.socket = this.context;
        this.socket.on(JOINED_THE_ROOM, ({ streamId, streamList, conversationId: _id }) => {
            const { conversationId } = this.state;
            if (_id !== conversationId)
                return;
            this.setState({ streamId });
            initWebRTCAdaptor(this.handelWebRTCAdaptorCallback.bind(this));
            if (streamList.length) {
                this.subscribeHLS(streamList[0]);
            }
        });
        this.socket.on(STREAM_JOINED, (data) => {
            const { streamId, conversationId } = this.state;
            if (conversationId !== data.conversationId)
                return;
            if (streamId !== data.streamId) {
                this.subscribeHLS(data.streamId);
            }
        });
        this.socket.on(STREAM_LEAVED, (data) => {
            const { conversationId, streamId } = this.state;
            if (!conversationId
                || conversationId !== data.conversationId
                || streamId === data.streamId)
                return;
            antd_1.message.error('Private call has ended.');
            window.setTimeout(() => {
                if (role_data === 'performer') {
                    router_1.default.push('/live');
                }
                else if (role_data === 'user') {
                    router_1.default.push({
                        pathname: '/stream',
                        query: { performer: JSON.stringify(performer) }
                    }, `/profile/${performer.username}`);
                }
                else {
                    router_1.default.push('/');
                }
            }, 10 * 1000);
        });
        router_1.default.events.on('routeChangeStart', this.onbeforeunload.bind(this));
        window.addEventListener('beforeunload', this.onbeforeunload.bind(this));
    }
    start(sessionId, conversationId) {
        this.setState({ sessionId, conversationId });
    }
    leaveStream() {
        const { publish_started, webRTCAdaptor } = this.props;
        const { sessionId, conversationId, streamId } = this.state;
        if (this.publisher) {
            this.publisher.dispose();
            this.publisher = undefined;
        }
        if (this.player) {
            this.player.dispose();
            this.player = undefined;
        }
        this.getLiveStreamOrVodURLInterval
            && clearInterval(this.getLiveStreamOrVodURLInterval);
        this.socket.off(JOINED_THE_ROOM);
        this.socket.off(STREAM_JOINED);
        this.socket.off(STREAM_LEAVED);
        if (streamId && publish_started) {
            webRTCAdaptor && webRTCAdaptor.leaveFromRoom(conversationId);
            this.socket.emit('private-stream/leave', {
                conversationId,
                streamId,
                sessionId
            });
        }
        this.setState({
            streamId: null,
            sessionId: null,
            conversationId: null
        });
    }
    async ended(streamId) {
        this.player && this.player.error(null);
        const { settings } = this.props;
        const src = await services_1.streamService.getLiveStreamOrVodURL({
            streamId,
            settings,
            appName: settings.AntMediaAppname
        });
        if (src) {
            this.getLiveStreamOrVodURLInterval = setInterval(() => {
                fetch(src, { method: 'HEAD' }).then(() => {
                    this.subscribeHLS(streamId);
                    this.getLiveStreamOrVodURLInterval
                        && clearInterval(this.getLiveStreamOrVodURLInterval);
                });
            }, 5000);
        }
    }
    async subscribeHLS(streamId) {
        const { settings, configs } = this.props;
        const appName = configs.appName || settings.AntMediaAppname;
        this.getLiveStreamOrVodURLInterval
            && clearInterval(this.getLiveStreamOrVodURLInterval);
        const src = await services_1.streamService.getLiveStreamOrVodURL({
            appName,
            settings,
            streamId
        });
        if (!src) {
            return;
        }
        let video = document.querySelector('#private-subscriber');
        if (!video) {
            video = document.createElement('video');
            video.setAttribute('id', 'private-subscriber');
            video.setAttribute('class', 'video-js vjs-waiting');
            video.setAttribute('autoplay', 'autoplay');
            video.setAttribute('data-setup', '{"fluid": true}');
            document.querySelector('.private-streaming-container').append(video);
        }
        if (!this.player) {
            this.player = video_js_1.default('private-subscriber', {
                liveui: true,
                controls: true,
                autoplay: true
            });
            this.player.on('ended', () => this.ended(streamId));
            this.player.on('error', () => this.ended(streamId));
        }
        setTimeout(() => {
            if (!this.player)
                return;
            this.player.src({
                type: 'application/x-mpegURL',
                src
            });
        }, 10 * 1000);
    }
    createRemoteVideo(stream) {
        const video = document.createElement('video');
        video.setAttribute('id', 'private-subscriber');
        video.setAttribute('class', 'video-js');
        video.setAttribute('autoplay', 'autoplay');
        video.setAttribute('controls', 'controls');
        video.srcObject = stream;
        document.querySelector('.private-streaming-container').append(video);
        // video.oncanplay = (() => {
        //   window['player'] = videojs('private-subscriber', {
        //     liveui: true,
        //     controls: true
        //   });
        // });
    }
    removeRemoteVideo() {
        const video = document.getElementById('private-subscriber');
        if (video) {
            video.srcObject = null;
            // window['player'] && window['player'].dispose();
            document.querySelector('.private-streaming-container').removeChild(video);
        }
    }
    leave() {
        if (process.browser) {
            this.leaveStream();
            setTimeout(() => {
                window.location.href = '/';
            }, 10 * 1000);
        }
    }
    stop() {
        const { leaveSession } = this.props;
        leaveSession();
    }
    async play(streamId) {
        const { settings, webRTCAdaptor } = this.props;
        const token = await services_1.streamService.getSubscriberToken({
            streamId,
            settings
        });
        webRTCAdaptor.play(streamId, token);
    }
    render() {
        const { onClick, btnText, initialized, containerClassName, publish_started } = this.props;
        const { loading } = this.state;
        return (<>
        <div className={classnames_1.default('private-streaming-container containerClassName', containerClassName)}>
          <video id="private-publisher" controls className="video-js" autoPlay muted playsInline hidden={!publish_started}/>
          {/* <video id="private-subscriber" playsInline autoPlay controls /> */}
        </div>
        <div>
          {!initialized ? (<antd_1.Button type="primary" onClick={() => onClick()} loading={loading} block>
              {btnText || 'Start Streaming'}
            </antd_1.Button>) : (<antd_1.Button type="primary" onClick={this.leave.bind(this)} block disabled={loading}>
              Stop Streaming
            </antd_1.Button>)}
        </div>
      </>);
    }
}
PrivateStreamingContainer.contextType = socket_1.SocketContext;
exports.default = antmedia_1.default(PrivateStreamingContainer);
