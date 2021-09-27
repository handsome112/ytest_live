"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
const draft_js_1 = require("draft-js");
const react_draft_wysiwyg_1 = require("react-draft-wysiwyg");
const draftjs_to_html_1 = __importDefault(require("draftjs-to-html"));
const html_to_draftjs_1 = __importDefault(require("html-to-draftjs"));
require("../../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css");
function uploadImageCallBack(file) {
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.open("POST", "https://api.imgur.com/3/image");
        xhr.setRequestHeader("Authorization", "Client-ID XXXXX");
        const data = new FormData();
        data.append("image", file);
        xhr.send(data);
        xhr.addEventListener("load", () => {
            const response = JSON.parse(xhr.responseText);
            resolve(response);
        });
        xhr.addEventListener("error", () => {
            const error = JSON.parse(xhr.responseText);
            reject(error);
        });
    });
}
class WYSIWYG extends react_1.PureComponent {
    constructor(props) {
        super(props);
        this.onEditorStateChange = (editorState) => {
            this.props.onChange && this.props.onChange({
                html: draftjs_to_html_1.default(draft_js_1.convertToRaw(editorState.getCurrentContent()))
            });
            this.setState({
                editorState,
            });
        };
        if (this.props.html) {
            const blocksFromHtml = html_to_draftjs_1.default(this.props.html);
            const { contentBlocks, entityMap } = blocksFromHtml;
            const contentState = draft_js_1.ContentState.createFromBlockArray(contentBlocks, entityMap);
            this.state = {
                editorState: draft_js_1.EditorState.createWithContent(contentState)
            };
        }
        else {
            this.state = {
                editorState: draft_js_1.EditorState.createEmpty()
            };
        }
    }
    render() {
        const { editorState } = this.state;
        return (<div className="editor">
        <react_draft_wysiwyg_1.Editor editorState={editorState} wrapperClassName="wysityg-wrapper" editorClassName="wysityg-editor" onEditorStateChange={this.onEditorStateChange} toolbar={{
            // image: {
            //   uploadCallback: uploadImageCallBack,
            //   alt: { present: true, mandatory: true }
            // }
            }}/>
      </div>);
    }
}
exports.default = WYSIWYG;
