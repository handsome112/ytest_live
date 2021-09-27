"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.streamService = void 0;
const moment_1 = __importDefault(require("moment"));
const antd_1 = require("antd");
const lib_1 = require("src/lib");
const api_request_1 = require("./api-request");
class StreamService extends api_request_1.APIRequest {
    getSessionId(id, type) {
        return this.get(`/streaming/session/${id}/${type}`);
    }
    goLive() {
        return this.post('/streaming/live');
    }
    joinPublicChat(performerId) {
        return this.post(`/streaming/join/${performerId}`);
    }
    requestPrivateChat(performerId) {
        return this.post(`/streaming/private-chat/${performerId}`);
    }
    acceptPrivateChat(id) {
        return this.get(`/streaming/private-chat/${id}`);
    }
    startGroupChat() {
        return this.post('/streaming/group-chat');
    }
    joinGroupChat(id) {
        return this.get(`/streaming/group-chat/${id}`);
    }
    generateOneTimeToken(data) {
        return this.post('/streaming/token', data);
    }
    async getPublishToken(options, expireDate = moment_1.default().add(1, 'd').toDate().getTime()) {
        try {
            const { settings, streamId } = options;
            const { secureOption } = settings;
            if (secureOption) {
                const resp = await this.generateOneTimeToken({
                    id: streamId,
                    type: 'publish',
                    expireDate
                });
                return resp.data.tokenId;
            }
            return null;
        }
        catch (err) {
            const error = await Promise.resolve(err);
            antd_1.message.error(lib_1.getResponseError(error));
            return null;
        }
    }
    async getSubscriberToken(options, expireDate = moment_1.default().add(1, 'd').toDate().getTime()) {
        try {
            const { settings, streamId } = options;
            const { secureOption } = settings;
            if (secureOption) {
                const resp = await this.generateOneTimeToken({
                    id: streamId,
                    type: 'play',
                    expireDate
                });
                return resp.data.tokenId;
            }
            return null;
        }
        catch (err) {
            const error = await Promise.resolve(err);
            antd_1.message.error(lib_1.getResponseError(error));
            return null;
        }
    }
    async getLiveStreamOrVodURL(options, expireDate = moment_1.default().add(1, 'd').toDate().getTime(), _player = 'hls') {
        // http://[IP_Address]/<Application_Name>/streams/streamID.mp4?token=tokenId
        // http://[IP_Address]/<Application_Name>/streams/streamID.m3u8?token=tokenId
        // http://[IP_Address]/<Application_Name>/play.html?name=streamID&playOrder=hls&token=tokenId
        try {
            // const src = `https://${viewerURL}:5443/${appName}/streams/${streamId}.m3u8${oneTimeToken ? `?token=${oneTimeToken}` : ''}`;
            // eslint-disable-next-line no-shadow
            const { appName, settings, streamId } = options;
            const { secureOption, viewerURL } = settings;
            const extension = _player === 'hls' ? 'm3u8' : 'mp4';
            if (!viewerURL || !appName) {
                return '';
            }
            let oneTimeToken = '';
            if (secureOption) {
                const resp = await this.generateOneTimeToken({
                    id: streamId,
                    type: 'play',
                    expireDate
                });
                oneTimeToken = resp.data.tokenId;
            }
            const { protocol } = window.location;
            return `${protocol}//${viewerURL}/${appName}/streams/${streamId}.${extension}${oneTimeToken ? `?token=${oneTimeToken}` : ''}`;
        }
        catch (err) {
            const error = await Promise.resolve(err);
            antd_1.message.error(lib_1.getResponseError(error));
            return '';
        }
    }
}
exports.streamService = new StreamService();
