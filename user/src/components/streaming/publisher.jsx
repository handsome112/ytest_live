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
/* eslint-disable camelcase */
const react_1 = __importStar(require("react"));
const antmedia_1 = __importDefault(require("src/antmedia"));
const antd_1 = require("antd");
const utils_1 = require("@lib/utils");
const services_1 = require("src/services");
const video_js_1 = __importDefault(require("video.js"));
const plugin_1 = __importDefault(require("src/videojs/mic-controls/plugin"));
require("./index.less");
const constants_1 = require("src/antmedia/constants");
const router_1 = __importDefault(require("next/router"));
class Publisher extends react_1.PureComponent {
    constructor(props) {
        super(props);
        this.onbeforeunload = () => {
            if (this.publisher) {
                this.publisher.dispose();
                this.publisher = undefined;
            }
        };
        this.state = {
            streamId: ''
        };
    }
    componentDidMount() {
        video_js_1.default.registerPlugin('webRTCMicControlsPlugin', plugin_1.default);
        router_1.default.events.on('routeChangeStart', this.onbeforeunload);
        window.addEventListener('beforeunload', this.onbeforeunload);
    }
    componentWillUnmount() {
        window.removeEventListener('beforeunload', this.onbeforeunload);
        router_1.default.events.off('routeChangeStart', this.onbeforeunload);
    }
    async handlePublishing(streamId) {
        const { webRTCAdaptor, leaveSession, settings } = this.props;
        try {
            const token = await services_1.streamService.getPublishToken({ streamId, settings });
            webRTCAdaptor.publish(streamId, token);
        }
        catch (e) {
            const error = await Promise.resolve(e);
            antd_1.message.error(utils_1.getResponseError(error));
            leaveSession();
        }
    }
    publish(streamId) {
        const { initialized } = this.props;
        this.setState({ streamId });
        initialized && this.handlePublishing(streamId);
    }
    start() {
        const { initWebRTCAdaptor, initialized, publish_started } = this.props;
        const { streamId } = this.state;
        if (initialized && !publish_started && streamId) {
            this.handlePublishing(streamId);
        }
        initWebRTCAdaptor(this.handelWebRTCAdaptorCallback.bind(this));
    }
    handelWebRTCAdaptorCallback(info) {
        const { muteLocalMic, unmuteLocalMic } = this.props;
        if (info === constants_1.WEBRTC_ADAPTOR_INFORMATIONS.PUBLISH_STARTED) {
            const player = video_js_1.default('publisher', {
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
        }
    }
    stop() {
        window.location.reload();
    }
    render() {
        const { initialized, publish_started } = this.props;
        const videoProps = {
            id: 'publisher',
            className: 'video-js',
            autoPlay: true,
            muted: true,
            controls: false,
            playsInline: true,
            style: { width: '100%' },
            hidden: !publish_started
        };
        return (<div style={{ minHeight: 300 }} className="text-center">
        {initialized && publish_started && (<antd_1.Button type="default" onClick={this.stop.bind(this)} block className="mb-10">
            Stop Streaming
          </antd_1.Button>)}
        <video {...videoProps}/>
        {publish_started && <antd_1.Badge status="success" text={<span className="badge-success publishing">Publishing</span>}/>}
      </div>);
    }
}
exports.default = antmedia_1.default(Publisher);
