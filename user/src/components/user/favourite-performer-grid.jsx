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
const icons_1 = require("@components/common/base/icons");
const lib_1 = require("src/lib");
const icons_2 = require("@ant-design/icons");
require("./favourite-performer-grid.less");
const react_redux_1 = require("react-redux");
const renderGender = (gender) => {
    switch (gender) {
        case 'male':
            return <icons_1.MaleSignIcon color="#666"/>;
        case 'female':
            return <icons_1.FemaleSignIcon color="#666"/>;
        case 'transgender':
            return <icons_1.TransgenderIcon color="#666"/>;
        default:
            return <></>;
    }
};
const FavouritePerformerGrid = ({ data, success, searching, title, dislike, setFilter, countries, total, query: { limit, offset }, placeholderAvatarUrl }) => {
    const renderFlag = (country) => {
        const pCountry = countries.find((c) => c.code === country);
        return pCountry && <span className="performer-flag"><img alt="" src={pCountry.flag}/></span>;
    };
    return (<antd_1.Card className="favorite-performer-grid" title={title} bordered={false} hoverable={false} actions={[
            total > 0 && total > limit && (<antd_1.Pagination disabled={searching} current={Math.round(offset / limit) + 1} pageSize={limit} total={total} size="small" onChange={(page) => setFilter('offset', (page - 1) * limit)}/>)
        ]}>
      {success && data.length > 0 ? (data.map((favourite) => {
            var _a, _b, _c, _d, _e, _f, _g;
            return (<antd_1.Card.Grid className="performer-box" key={favourite.favoriteId} hoverable={false}>
            <link_1.default href={{
                    pathname: '/stream',
                    query: { performer: JSON.stringify(favourite.performer) }
                }} as={`/profile/${(_a = favourite.performer) === null || _a === void 0 ? void 0 : _a.username}`}>
              <a className="performer-avatar">
                <img src={((_b = favourite.performer) === null || _b === void 0 ? void 0 : _b.avatar) || placeholderAvatarUrl} alt=""/>
              </a>
            </link_1.default>
            <div className="performer-title">
              <div className="performer-name">
                <span>{((_c = favourite.performer) === null || _c === void 0 ? void 0 : _c.username) || 'N/A'}</span>
              </div>
              {((_d = favourite.performer) === null || _d === void 0 ? void 0 : _d.dateOfBirth) && (<span>
                (
                  {lib_1.getAge((_e = favourite.performer) === null || _e === void 0 ? void 0 : _e.dateOfBirth)}
                )
              </span>)}
              {renderGender((_f = favourite.performer) === null || _f === void 0 ? void 0 : _f.gender)}
              {renderFlag((_g = favourite.performer) === null || _g === void 0 ? void 0 : _g.country)}
            </div>
            <antd_1.Popconfirm placement="bottom" title="Are you sure to dislike this performer!" onConfirm={() => dislike(favourite.performer)} okText="Yes" cancelText="No">
              <icons_2.HeartFilled className="icon"/>
            </antd_1.Popconfirm>
          </antd_1.Card.Grid>);
        })) : (<p>No favorites</p>)}
    </antd_1.Card>);
};
FavouritePerformerGrid.defaultProps = {
    total: 0,
    success: false,
    title: '',
    placeholderAvatarUrl: '/no-avatar.png'
};
const mapStateToProps = (state) => ({ placeholderAvatarUrl: state.ui.placeholderAvatarUrl });
exports.default = react_redux_1.connect(mapStateToProps)(FavouritePerformerGrid);
