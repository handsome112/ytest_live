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
require("./index.less");
const React = __importStar(require("react"));
const classnames_1 = __importDefault(require("classnames"));
const isomorphic_unfetch_1 = __importDefault(require("isomorphic-unfetch"));
const antmedia_1 = __importDefault(require("src/antmedia"));
const services_1 = require("src/services");
const constants_1 = require("src/antmedia/constants");
const video_js_1 = __importDefault(require("video.js"));
const string_1 = require("@lib/string");
class AntVideoPlayer extends React.PureComponent {
    constructor() {
        super(...arguments);
        this.activeStreams = [];
        this.id = `player-${string_1.generateUuid()}`;
    }
    componentDidMount() {
        this.videoContainerRef = React.createRef();
    }
    componentWillUnmount() {
        this.getLiveStreamOrVodURLInterval
            && clearInterval(this.getLiveStreamOrVodURLInterval);
        this.player && this.player.dispose();
    }
    async handler(info, obj) {
        const { webRTCAdaptor, settings } = this.props;
        if (info === constants_1.WEBRTC_ADAPTOR_INFORMATIONS.INITIALIZED) {
            const token = await services_1.streamService.getSubscriberToken({
                streamId: this.streamId,
                settings
            });
            webRTCAdaptor.play(this.streamId, token);
        }
        else if (info === constants_1.WEBRTC_ADAPTOR_INFORMATIONS.NEW_STREAM_AVAILABLE) {
            const activeStream = this.activeStreams.find((id) => id === obj.streamId);
            if (this.player) {
                this.player.dispose();
                this.player = undefined;
            }
            if (!activeStream) {
                this.activeStreams.push(obj.streamId);
                this.createRemoteVideo(obj.stream);
            }
        }
        else if (info === constants_1.WEBRTC_ADAPTOR_INFORMATIONS.PLAY_FINISHED) {
            this.activeStreams = this.activeStreams.filter((id) => id !== obj.streamId);
            this.removeRemoteVideo();
            setTimeout(() => {
                webRTCAdaptor.getStreamInfo(obj.streamId);
            }, 3000);
        }
        else if (info === constants_1.WEBRTC_ADAPTOR_INFORMATIONS.STREAM_INFORMATION) {
            if (obj.streamId === this.streamId) {
                const token = await services_1.streamService.getSubscriberToken({
                    streamId: obj.streamId,
                    settings
                });
                webRTCAdaptor.play(obj.streamId, token);
            }
        }
    }
    createPlaybackideo(streamId) {
        const { classNames } = this.props;
        const video = document.createElement('video');
        video.setAttribute('id', this.id);
        video.setAttribute('class', classnames_1.default(classNames, 'subscriber video-js'));
        video.autoplay = true;
        video.muted = true;
        video.controls = true;
        video.playsInline = true;
        video.width = this.videoContainerRef.current.offsetWidth;
        this.videoContainerRef.current.append(video);
        this.player = video_js_1.default(this.id, {
            autoplay: true,
            liveui: true
        });
        this.player.on('ended', this.ended.bind(this));
        this.player.on('error', this.ended.bind(this));
        this.player.controls(true);
        streamId && this.playHLS(streamId);
    }
    resetPlaybackVideo() {
        var _a;
        this.streamId = '';
        if ((_a = this.player) === null || _a === void 0 ? void 0 : _a.src()) {
            this.player.dispose();
            this.player = undefined;
        }
    }
    async cbErrorHandler(error) {
        if (error === 'no_stream_exist') {
            const { webRTCAdaptor, initWebRTCAdaptor } = this.props;
            if (!webRTCAdaptor) {
                initWebRTCAdaptor(this.handler.bind(this), this.cbErrorHandler.bind(this));
            }
            else {
                this.streamId && webRTCAdaptor.getStreamInfo(this.streamId);
            }
        }
    }
    async ended() {
        const { settings } = this.props;
        if (!this.streamId) {
            return;
        }
        const src = await services_1.streamService.getLiveStreamOrVodURL({
            streamId: this.streamId,
            settings,
            appName: settings.AntMediaAppname
        });
        if (src) {
            this.getLiveStreamOrVodURLInterval = setInterval(() => {
                isomorphic_unfetch_1.default(src, { method: 'HEAD' }).then(() => {
                    this.playHLS(this.streamId);
                    this.getLiveStreamOrVodURLInterval
                        && clearInterval(this.getLiveStreamOrVodURLInterval);
                });
            }, 5000);
        }
    }
    createRemoteVideo(stream) {
        const { classNames } = this.props;
        const video = document.createElement('video');
        video.setAttribute('id', this.id);
        video.setAttribute('class', classnames_1.default(classNames));
        video.autoplay = true;
        video.muted = true;
        video.controls = true;
        video.playsInline = true;
        video.srcObject = stream;
        video.width = this.videoContainerRef.current.offsetWidth;
        this.videoContainerRef.current.append(video);
    }
    removeRemoteVideo() {
        const video = document.getElementById(this.id);
        if (video) {
            video.srcObject = null;
            // document.querySelector('.video-container').removeChild(video);
            this.videoContainerRef.current.removeChild(video);
        }
    }
    async play(streamId) {
        const { initWebRTCAdaptor, initialized, webRTCAdaptor, settings } = this.props;
        this.streamId = streamId;
        if (initialized) {
            const token = await services_1.streamService.getSubscriberToken({
                streamId,
                settings
            });
            webRTCAdaptor.play(streamId, token);
            return;
        }
        initWebRTCAdaptor(this.handler.bind(this), this.cbErrorHandler.bind(this));
    }
    async playHLS(streamId) {
        if (!this.player) {
            this.createPlaybackideo(streamId);
        }
        const { configs, settings } = this.props;
        const appName = configs.appName || settings.AntMediaAppname;
        this.streamId = streamId;
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
        // this.player.addClass('vjs-waiting');
        setTimeout(() => {
            if (!this.player)
                return;
            this.player.src({
                type: 'application/x-mpegURL',
                src
            });
            this.player.play();
            this.player.controls(true);
        }, 1 * 1000);
    }
    stop() {
        const { leaveSession } = this.props;
        this.streamId = '';
        leaveSession && leaveSession();
    }
    render() {
        const { containerClassName } = this.props;
        return (<div className={classnames_1.default('video-container', containerClassName)} ref={this.videoContainerRef}/>);
    }
}
exports.default = React.memo(antmedia_1.default(AntVideoPlayer));
