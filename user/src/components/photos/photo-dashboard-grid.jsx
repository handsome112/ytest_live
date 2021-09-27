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
const React = __importStar(require("react"));
const link_1 = __importDefault(require("next/link"));
const antd_1 = require("antd");
const react_infinite_scroller_1 = __importDefault(require("react-infinite-scroller"));
const icons_1 = require("@ant-design/icons");
const string_1 = require("src/lib/string");
const lib_1 = require("src/lib");
const trash_1 = __importDefault(require("@components/common/base/trash"));
// import Loader from '@components/common/base/loader';
require("./index.less");
const renderActiveTag = (status) => {
    switch (status) {
        case 'active':
            return (<antd_1.Tag color="#87d068" className="photo-status">
          Active
        </antd_1.Tag>);
        case 'inactive':
            return (<antd_1.Tag color="#f50" className="photo-status">
          Inactive
        </antd_1.Tag>);
        case 'draft':
            return <antd_1.Tag className="photo-status">Inactive</antd_1.Tag>;
        default:
            return <></>;
    }
};
const PhotoDashboard = ({ data, searching, title, hasMore, addPhotos, success, remove }) => (<react_infinite_scroller_1.default pageStart={0} loadMore={addPhotos} hasMore={hasMore} loader={<p key={0}>Loading...</p>}>
    <antd_1.Card className="photo-grid" title={title} bordered={false}>
      {!searching ? (success
        && (data.length > 0 ? (data.map((photo) => (<antd_1.Card.Grid className="photo-box" key={photo._id}>
              <div className="photo-thumbnail">
                <img src={photo.photo.thumbnails[0] || '/no-image.jpg'} alt=""/>
                <antd_1.Space className="actions">
                  <link_1.default href={{
                pathname: '/account/performer/photos/update',
                query: { data: JSON.stringify(photo) }
            }} as={`/account/performer/photos/${photo._id}/update`}>
                    <icons_1.EditOutlined style={{ color: '#ff0066' }}/>
                  </link_1.default>
                  <trash_1.default confirm={() => remove(photo._id)}/>
                </antd_1.Space>
                {renderActiveTag(photo.status)}
              </div>
              <div className="photo-info">
                <span>{string_1.capitalizeFirstLetter(photo.title)}</span>
              </div>
              <div className="photo-description">
                Created at
                {' '}
                {lib_1.formatDate(photo.createdAt, 'DD MMMM YYYY')}
              </div>
              <div className="photo-description">
                <link_1.default href={{
                pathname: '/account/performer/galleries/update',
                query: { data: JSON.stringify(photo.gallery) }
            }} as={`/account/performer/galleries/${photo.gallery._id}/update`}>
                  {photo.gallery.name}
                </link_1.default>
              </div>
            </antd_1.Card.Grid>))) : (<p>No items</p>))) : (<p>Loading...</p>)}
    </antd_1.Card>
  </react_infinite_scroller_1.default>);
PhotoDashboard.defaultProps = {
    success: false,
    // error: null,
    searching: false,
    title: '',
    addPhotos: null,
    hasMore: false,
    remove: null
};
exports.default = PhotoDashboard;
