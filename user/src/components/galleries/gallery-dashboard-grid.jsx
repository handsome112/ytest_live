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
const antd_1 = require("antd");
const react_infinite_scroller_1 = __importDefault(require("react-infinite-scroller"));
const icons_1 = require("@ant-design/icons");
const string_1 = require("src/lib/string");
const lib_1 = require("src/lib");
const trash_1 = __importDefault(require("@components/common/base/trash"));
require("./index.less");
const numberformat_1 = __importDefault(require("@components/common/layout/numberformat"));
const router_1 = __importDefault(require("next/router"));
const renderActiveTag = (status) => {
    switch (status) {
        case 'active':
            return (<antd_1.Tag color="success" className="photo-status">
          Active
        </antd_1.Tag>);
        case 'inactive':
            return (<antd_1.Tag color="warning" className="photo-status">
          Inactive
        </antd_1.Tag>);
        case 'draft':
            return (<antd_1.Tag color="default" className="photo-status">
          Inactive
        </antd_1.Tag>);
        default:
            return <></>;
    }
};
const renderSale = (isSale, token) => {
    switch (isSale) {
        case true:
            return (<antd_1.Tag color="#87d068" className="sale-tag">
          <numberformat_1.default value={token} suffix=" Tokens"/>
        </antd_1.Tag>);
        case false:
            return (<antd_1.Tag color="#f50" className="sale-tag">
          Free
        </antd_1.Tag>);
        default:
            return <></>;
    }
};
const Dashboard = ({ data, searching, title, hasMore, addGalleries, success, remove, error }) => (<react_infinite_scroller_1.default pageStart={0} loadMore={addGalleries} hasMore={hasMore} loader={<p key={0}>Loading...</p>}>
    <antd_1.Card className="photo-grid" title={title} bordered={false}>
      {!searching ? (success
        && (data.length > 0 ? (data.map((gallery) => (<antd_1.Card.Grid className="photo-box" key={gallery._id}>
              <div className="photo-thumbnail">
                <img src={(gallery.coverPhotoId
                && gallery.coverPhoto
                && gallery.coverPhoto.thumbnails[0])
                || '/gallery.png'} alt=""/>
                <antd_1.Space className="actions">
                  <antd_1.Button type="link" onClick={() => router_1.default.push({
                pathname: '/account/performer/galleries/update',
                query: { data: JSON.stringify(gallery) }
            }, `/account/performer/galleries/${gallery._id}/update`)}>
                    <icons_1.EditOutlined />
                  </antd_1.Button>
                  <trash_1.default confirm={() => remove(gallery._id)}/>
                </antd_1.Space>
                {renderActiveTag(gallery.status)}
                {renderSale(gallery.isSale, gallery.token)}
              </div>
              <div className="photo-info">
                <span>{string_1.capitalizeFirstLetter(gallery.name)}</span>
                <span>
                  {gallery.numOfItems}
                  {' '}
                  Items
                </span>
              </div>
              <div className="photo-description">
                Created On
                {' '}
                {lib_1.formatDate(gallery.createdAt, 'DD MMMM YYYY')}
              </div>
              <div className="photo-description">{gallery.description}</div>
            </antd_1.Card.Grid>))) : (<p>No items</p>))) : (<p>Loading...</p>)}
    </antd_1.Card>
    {error && <antd_1.Alert type="error" message="Error request" banner/>}
  </react_infinite_scroller_1.default>);
Dashboard.defaultProps = {
    success: false,
    error: false,
    searching: false,
    title: '',
    addGalleries: null,
    hasMore: false,
    remove: null
};
exports.default = Dashboard;
