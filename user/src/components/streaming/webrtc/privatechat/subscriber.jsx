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
const React = __importStar(require("react"));
const services_1 = require("src/services");
const classnames_1 = __importDefault(require("classnames"));
const antmedia_1 = __importDefault(require("src/antmedia"));
const constants_1 = require("src/antmedia/constants");
require("./index.less");
class Subscriber extends React.PureComponent {
    constructor() {
        super(...arguments);
        this.availableStreamIds = [];
    }
    async handler(info, obj) {
        const { webRTCAdaptor, settings } = this.props;
        if (info === constants_1.WEBRTC_ADAPTOR_INFORMATIONS.INITIALIZED) {
            const token = await services_1.streamService.getSubscriberToken({ streamId: this.streamId, settings });
            webRTCAdaptor.play(this.streamId, token);
        }
        else if (info === constants_1.WEBRTC_ADAPTOR_INFORMATIONS.NEW_STREAM_AVAILABLE) {
            const activeStream = this.availableStreamIds.find((id) => id === obj.streamId);
            if (!activeStream) {
                this.availableStreamIds.push(obj.streamId);
                this.createRemoteVideo(obj.stream);
            }
        }
        else if (info === constants_1.WEBRTC_ADAPTOR_INFORMATIONS.PLAY_FINISHED) {
            this.availableStreamIds = this.availableStreamIds.filter((id) => id !== obj.streamId);
            this.removeRemoteVideo();
            setTimeout(() => {
                webRTCAdaptor.getStreamInfo(obj.streamId);
            }, 3000);
        }
        else if (info === constants_1.WEBRTC_ADAPTOR_INFORMATIONS.STREAM_INFORMATION) {
            if (obj.streamId === this.streamId) {
                const token = await services_1.streamService.getSubscriberToken({ streamId: obj.streamId, settings });
                webRTCAdaptor.play(obj.streamId, token);
            }
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
    createRemoteVideo(stream) {
        const { classNames } = this.props;
        const video = document.createElement('video');
        video.setAttribute('id', 'private-subscriber');
        video.setAttribute('class', classnames_1.default('video-js', classNames));
        video.autoplay = true;
        video.muted = true;
        video.controls = true;
        video.playsInline = true;
        video.srcObject = stream;
        document.querySelector('.private-streaming-container').append(video);
    }
    removeRemoteVideo() {
        const video = document.getElementById('private-subscriber');
        if (video) {
            video.srcObject = null;
            document.querySelector('.private-streaming-container').removeChild(video);
        }
    }
    async play(streamId) {
        const { initWebRTCAdaptor, initialized, webRTCAdaptor, settings } = this.props;
        this.streamId = streamId;
        if (initialized) {
            const token = await services_1.streamService.getSubscriberToken({ streamId, settings });
            webRTCAdaptor.play(streamId, token);
            return;
        }
        initWebRTCAdaptor(this.handler.bind(this), this.cbErrorHandler.bind(this));
    }
    close() {
        this.streamId = null;
    }
    stop() {
        const { leaveSession } = this.props;
        this.streamId = '';
        this.availableStreamIds = [];
        leaveSession && leaveSession();
    }
    render() {
        return (<></>);
    }
}
exports.default = antmedia_1.default(Subscriber);
