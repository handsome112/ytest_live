"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
const icons_1 = require("@ant-design/icons");
const antd_1 = require("antd");
class UploadList extends react_1.PureComponent {
    constructor() {
        super(...arguments);
        this.state = {
            previews: {}
        };
    }
    renderPreview(file) {
        if (file.status === 'uploading') {
            return <icons_1.LoadingOutlined />;
        }
        if (this.state.previews[file.uid]) {
            return <img src={this.state.previews[file.uid]}/>;
        }
        const reader = new FileReader();
        reader.addEventListener('load', () => {
            const previews = Object.assign(Object.assign({}, this.state.previews), { [file.uid]: reader.result });
            this.setState({ previews });
        });
        reader.readAsDataURL(file);
        return <icons_1.PictureOutlined />;
    }
    render() {
        return (<div className="ant-upload-list ant-upload-list-picture">
        {this.props.files.map(file => (<div className="ant-upload-list-item ant-upload-list-item-uploading ant-upload-list-item-list-type-picture" key={file.uid}>
            <div className="ant-upload-list-item-info">
              <div>
                <span className="ant-upload-list-item-thumbnail ant-upload-list-item-file">
                  {this.renderPreview(file)}
                </span>
                <span className="ant-upload-list-item-name ant-upload-list-item-name-icon-count-1">
                  <span>{file.name}</span>
                </span>
                {file.percent !== 100 &&
                    <span className="ant-upload-list-item-card-actions picture">
                    <a onClick={this.props.remove.bind(this, file)}>
                      <icons_1.DeleteOutlined />
                    </a>
                  </span>}
                
                {file.percent && <antd_1.Progress percent={file.percent}/>}
              </div>
            </div>
          </div>))}
      </div>);
    }
}
exports.default = UploadList;
