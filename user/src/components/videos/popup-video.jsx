"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable dot-notation */
/* eslint-disable no-return-assign */
const react_1 = __importDefault(require("react"));
const popup_1 = __importDefault(require("@components/common/base/popup"));
const video_js_1 = __importDefault(require("video.js"));
class PopupVideoDetail extends react_1.default.PureComponent {
    handler(src) {
        let video = document.querySelector('#video');
        if (!video) {
            video = document.createElement('video');
            video.setAttribute('id', 'video');
            video.setAttribute('class', 'video-js');
            video.setAttribute('autoplay', 'autoplay');
            document.querySelector('.ant-modal-body').append(video);
        }
        if (!window['video-player']) {
            window['video-player'] = video_js_1.default('video', {
                poster: '/xcam-logo-black.png',
                controls: true
            });
        }
        window['video-player'].src({ type: 'video/mp4', src });
        window['video-player'].play();
        // window['video'].on()
    }
    onOk() {
        window['video-player'] = window['video-player'].pause();
        // window['video-player'].poster = '/xcam-logo-black.png';
        this.popup.setVisible(false);
    }
    showModalBuyAssets(videoUrl) {
        this.popup.setVisible(true);
        setTimeout(() => this.handler(videoUrl), 500);
    }
    render() {
        return (<popup_1.default title="Video detail" ref={(ref) => (this.popup = ref)} content={<></>} onOk={this.onOk.bind(this)} onCancel={this.onOk.bind(this)}/>);
    }
}
exports.default = PopupVideoDetail;
