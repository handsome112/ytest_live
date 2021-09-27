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
Object.defineProperty(exports, "__esModule", { value: true });
const antd_1 = require("antd");
const React = __importStar(require("react"));
require("./sound.less");
class SoundComponent extends React.PureComponent {
    componentDidMount() {
        const { soundUrl, volumn } = this.props;
        const audio = document.createElement('audio');
        audio.setAttribute('src', soundUrl || '/sounds/default-audio.mp3');
        audio.setAttribute('id', 'audio');
        audio.volume = volumn || 0.5;
        const container = document.querySelector('.sound-player');
        container.append(audio);
    }
    componentDidUpdate(prevProps) {
        const { soundUrl } = this.props;
        if (soundUrl && soundUrl !== prevProps.soundUrl) {
            let audio = document.getElementById('audio');
            const container = document.querySelector('.sound-player');
            if (!audio) {
                audio = document.createElement('audio');
                audio.setAttribute('id', 'audio');
                container.append(audio);
            }
            audio.setAttribute('src', soundUrl || '/sounds/default-audio.mp3');
        }
    }
    async play() {
        const audio = document.getElementById('audio');
        if (audio) {
            try {
                await audio.play();
            }
            catch (e) {
                antd_1.message.error('Sound can not play. Interact with the document first!', 3);
            }
        }
    }
    render() {
        return <div className="sound-player"/>;
    }
}
exports.default = SoundComponent;
