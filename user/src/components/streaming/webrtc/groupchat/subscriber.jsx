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
class Subscriber extends React.PureComponent {
    constructor() {
        super(...arguments);
        this.streamIds = [];
        this.availableStreamIds = [];
    }
    async handler(info, obj) {
        const { webRTCAdaptor, settings } = this.props;
        if (info === constants_1.WEBRTC_ADAPTOR_INFORMATIONS.INITIALIZED) {
            if (Array.isArray(this.streamIds)) {
                const tokens = await Promise.all(this.streamIds.map((streamId) => services_1.streamService.getSubscriberToken({ streamId, settings })));
                this.streamIds.map((id, i) => webRTCAdaptor.play(id, tokens[i]));
                return;
            }
            const token = await services_1.streamService.getSubscriberToken({ streamId: this.streamIds, settings });
            webRTCAdaptor.play(this.streamIds, token);
        }
        else if (info === constants_1.WEBRTC_ADAPTOR_INFORMATIONS.NEW_STREAM_AVAILABLE) {
            const availableStream = this.availableStreamIds.find((id) => id === obj.streamId);
            if (!availableStream) {
                this.availableStreamIds.push(obj.streamId);
                this.createRemoteVideo(obj);
            }
        }
        else if (info === constants_1.WEBRTC_ADAPTOR_INFORMATIONS.PLAY_FINISHED) {
            this.availableStreamIds = this.availableStreamIds.filter((id) => id !== obj.streamId);
            this.removeRemoteVideo(obj.streamId);
            setTimeout(() => {
                webRTCAdaptor.getStreamInfo(obj.streamId);
            }, 3000);
        }
        else if (info === constants_1.WEBRTC_ADAPTOR_INFORMATIONS.STREAM_INFORMATION) {
            if (this.streamIds.includes(obj.streamId)) {
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
                this.streamIds.forEach((id) => webRTCAdaptor.getStreamInfo(id));
            }
        }
    }
    createRemoteVideo({ stream, streamId }) {
        const { classNames, containerClassName, onClick: handleClick } = this.props;
        const video = document.createElement('video');
        const container = document.getElementsByClassName(containerClassName)[0];
        video.setAttribute('id', `streamId-subscriber-${streamId}`);
        video.setAttribute('class', classnames_1.default('video-js', classNames));
        video.autoplay = true;
        video.muted = true;
        video.controls = true;
        video.playsInline = true;
        video.width = container.clientWidth / 4;
        video.srcObject = stream;
        video.addEventListener('click', handleClick);
        container.append(video);
    }
    removeRemoteVideo(streamId) {
        const { containerClassName } = this.props;
        const video = document.getElementById(`streamId-subscriber-${streamId}`);
        if (video) {
            video.srcObject = null;
            const container = document.getElementsByClassName(containerClassName)[0];
            container.removeChild(video);
        }
    }
    async play(streamIds) {
        const { initWebRTCAdaptor, initialized, webRTCAdaptor, settings } = this.props;
        this.streamIds = [...this.streamIds, ...streamIds];
        if (initialized) {
            if (Array.isArray(streamIds)) {
                const tokens = await Promise.all(streamIds.map((streamId) => services_1.streamService.getSubscriberToken({ streamId, settings })));
                streamIds.map((id, i) => webRTCAdaptor.play(id, tokens[i]));
            }
            return;
        }
        initWebRTCAdaptor(this.handler.bind(this), this.cbErrorHandler.bind(this));
    }
    close(streamId) {
        this.streamIds = this.streamIds.filter((id) => id !== streamId);
    }
    stop() {
        const { leaveSession } = this.props;
        this.streamIds = [];
        this.availableStreamIds = [];
        leaveSession();
    }
    render() {
        return (<></>);
    }
}
exports.default = antmedia_1.default(Subscriber);
