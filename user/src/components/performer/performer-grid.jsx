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
exports.GridCard = void 0;
const React = __importStar(require("react"));
const link_1 = __importDefault(require("next/link"));
const antd_1 = require("antd");
const icons_1 = require("@components/common/base/icons");
const lib_1 = require("src/lib");
const icons_2 = require("@ant-design/icons");
require("./index.less");
const lodash_1 = require("lodash");
const banner_1 = __importDefault(require("@components/common/layout/banner"));
const loader_1 = __importDefault(require("@components/common/base/loader"));
const react_redux_1 = require("react-redux");
const renderTitle = (gender, name) => (<div className="p-title">
    <span style={{ marginRight: 5 }}>{name}</span>
    {gender === 'male' ? (<span className="anticon">
        <icons_1.MaleSignIcon />
      </span>) : gender === 'female' ? (<span className="anticon">
        <icons_1.FemaleSignIcon />
      </span>) : (<span className="anticon">
        <icons_1.TransgenderIcon />
      </span>)}
  </div>);
const renderTags = (tags) => (<antd_1.Space className="tags" wrap size={[5, 2]}>
    {tags.map((tag) => (<link_1.default href={{ pathname: '/tag', query: { tags: tag } }} key={tag} as={`/tag/${tag}`}>
        <a>
          #
          {tag}
        </a>
      </link_1.default>))}
  </antd_1.Space>);
const GridCard = ({ performer, loggedIn, onLike, className, placeholderAvatarUrl }) => {
    var _a;
    const { isOnline, streamingStatus } = performer;
    const statusClassNames = ['p-status'];
    let status = 'offline';
    if (isOnline) {
        switch (streamingStatus) {
            case 'private':
                statusClassNames.push('private');
                status = 'private chat';
                break;
            case 'group':
                statusClassNames.push('group');
                status = 'group chat';
                break;
            case 'public':
                status = 'live';
                statusClassNames.push('online');
                break;
            default:
                status = 'online';
                statusClassNames.push('online');
                break;
        }
    }
    else {
        statusClassNames.push('offline');
    }
    const defaultPlaceholderAvatarUrl = placeholderAvatarUrl || '/default-user-icon.png';
    return (<antd_1.Card.Grid className={className} key={performer._id} hoverable={false}>
      {performer.isBlocked && (<div className="blocked-thumb">
          <icons_2.LockOutlined />
        </div>)}
      <link_1.default href={{
            pathname: '/stream',
            query: { performer: JSON.stringify(performer) }
        }} as={`/profile/${performer.username}`}>
        <a>
          <div className="performer-avatar">
            <img className="image-performer" src={typeof performer.avatar === 'string'
            && performer.avatar.length > 0
            ? performer.avatar
            : defaultPlaceholderAvatarUrl} alt=""/>
            <span className={statusClassNames.join(' ')}>{status}</span>
            {renderTitle(performer.gender, performer.username)}
            {((_a = performer === null || performer === void 0 ? void 0 : performer.stats) === null || _a === void 0 ? void 0 : _a.views) > 0 && (<div className="p-viewer">
                <icons_2.EyeOutlined style={{ marginRight: 5 }}/>
                <span>{performer.stats.views}</span>
              </div>)}
          </div>
        </a>
      </link_1.default>
      <div className="performer-bottom">
        <antd_1.Row justify="space-between">
          <antd_1.Col>
            <div>{performer.tags && renderTags(performer.tags)}</div>
          </antd_1.Col>
          <antd_1.Col>
            <div aria-hidden hidden={!loggedIn} className="p-favorite" onClick={() => onLike(performer)}>
              {performer.isFavorite ? (<icons_2.HeartFilled className="icon"/>) : (<icons_2.HeartOutlined className="icon"/>)}
            </div>
          </antd_1.Col>
        </antd_1.Row>
        <div className="about-me">{performer === null || performer === void 0 ? void 0 : performer.aboutMe}</div>
      </div>
    </antd_1.Card.Grid>);
};
exports.GridCard = GridCard;
const PerformerGrid = ({ data, searching, success, title, onLike, loggedIn, isPage, offset, limit, total, setFilter, placeholderAvatarUrl, banners, render }) => {
    const { topBanners, rightBanners, bottomBanners } = banners;
    const RowGrid = ({ dataSource }) => (<antd_1.Row style={{ width: '100%' }}>
      {dataSource
            && dataSource.length > 0
            && dataSource.map((performer) => (<exports.GridCard placeholderAvatarUrl={placeholderAvatarUrl} className="performer-box" key={performer._id} performer={performer} loggedIn={loggedIn} onLike={onLike}/>))}
    </antd_1.Row>);
    const renderGrid = () => {
        const { length } = data;
        if (length <= 12) {
            return (<antd_1.Row style={{ width: '100%' }}>
          {rightBanners && rightBanners.length > 0 ? (<>
              <antd_1.Col lg={16} md={16} xs={24}>
                <antd_1.Row>
                  {data
                        && data.length > 0
                        && data.map((performer) => (<exports.GridCard placeholderAvatarUrl={placeholderAvatarUrl} className="performer-box performer-box-4-item" key={performer._id} performer={performer} loggedIn={loggedIn} onLike={() => onLike(performer)}/>))}
                </antd_1.Row>
              </antd_1.Col>
              <antd_1.Col lg={8} md={8} xs={24}>
                <banner_1.default classnames="right-banners" banners={rightBanners} styleImage={{ padding: '10px', width: '100%' }}/>
              </antd_1.Col>
            </>) : (data
                    && data.length > 0
                    && data.map((performer) => (<exports.GridCard placeholderAvatarUrl={placeholderAvatarUrl} className="performer-box" key={performer._id} performer={performer} loggedIn={loggedIn} onLike={() => onLike(performer)}/>)))}
        </antd_1.Row>);
        }
        if (length > 12 && length <= 24) {
            const dataChunk = lodash_1.chunk(data, 12);
            return (<>
          {rightBanners && rightBanners.length > 0 ? (<>
              <antd_1.Row style={{ width: '100%' }}>
                <antd_1.Col lg={16} md={16} xs={24}>
                  <antd_1.Row>
                    {dataChunk[0]
                        && dataChunk[0].length > 0
                        && dataChunk[0].map((performer) => (<exports.GridCard placeholderAvatarUrl={placeholderAvatarUrl} className="performer-box performer-box-4-item" key={performer._id} performer={performer} loggedIn={loggedIn} onLike={() => onLike(performer)}/>))}
                  </antd_1.Row>
                </antd_1.Col>
                <antd_1.Col lg={8} md={8} xs={24}>
                  {rightBanners && rightBanners.length > 0 && (<banner_1.default classnames="right-banners" banners={rightBanners} styleImage={{ padding: '10px', width: '100%' }}/>)}
                </antd_1.Col>
              </antd_1.Row>
              <RowGrid dataSource={dataChunk[1]}/>
            </>) : (<RowGrid dataSource={data}/>)}
        </>);
        }
        if (length > 24 && length <= 36) {
            const dataChunk = lodash_1.chunk(data, 12);
            return (<>
          <RowGrid dataSource={dataChunk[0]}/>
          {rightBanners && rightBanners.length > 0 ? (<antd_1.Row style={{ width: '100%' }}>
              <antd_1.Col xl={16} lg={18} md={18} xs={24}>
                <antd_1.Row>
                  {dataChunk[1]
                        && dataChunk[1].length > 0
                        && dataChunk[1].map((performer) => (<exports.GridCard placeholderAvatarUrl={placeholderAvatarUrl} className="performer-box performer-box-4-item" key={performer._id} performer={performer} loggedIn={loggedIn} onLike={() => onLike(performer)}/>))}
                </antd_1.Row>
              </antd_1.Col>
              <antd_1.Col xl={8} lg={6} md={6} xs={24}>
                <banner_1.default classnames="right-banners" banners={rightBanners} styleImage={{ padding: '10px', width: '100%' }}/>
              </antd_1.Col>
            </antd_1.Row>) : (<RowGrid dataSource={dataChunk[1]}/>)}
          <RowGrid dataSource={dataChunk[2]}/>
        </>);
        }
        if (length > 36) {
            const dataChunk = lodash_1.chunk(data, 12);
            const lastDataChunk = dataChunk.slice(3);
            return (<>
          <RowGrid dataSource={dataChunk[0]}/>
          {rightBanners && rightBanners.length > 0 ? (<antd_1.Row style={{ width: '100%' }}>
              <antd_1.Col xl={16} lg={18} md={18} xs={24}>
                <antd_1.Row>
                  {dataChunk[1]
                        && dataChunk[1].length > 0
                        && dataChunk[1].map((performer) => (<exports.GridCard placeholderAvatarUrl={placeholderAvatarUrl} className="performer-box performer-box-4-item" key={performer._id} performer={performer} loggedIn={loggedIn} onLike={() => onLike(performer)}/>))}
                </antd_1.Row>
              </antd_1.Col>
              <antd_1.Col xl={8} lg={6} md={6} xs={24}>
                <banner_1.default classnames="right-banners" banners={rightBanners} styleImage={{ padding: '10px', width: '100%' }}/>
              </antd_1.Col>
            </antd_1.Row>) : (<RowGrid dataSource={dataChunk[1]}/>)}
          <RowGrid dataSource={dataChunk[2]}/>
          {lastDataChunk.length > 0
                    && lastDataChunk.map((v) => (<RowGrid key={lib_1.generateUuid()} dataSource={v}/>))}
        </>);
        }
        return <></>;
    };
    const actions = setFilter && total > 0
        ? [
            total > limit && (<antd_1.Pagination disabled={searching} current={Math.round(offset / limit) + 1} pageSize={limit} total={total} size="small" onChange={(page) => setFilter('offset', (page - 1) * limit)} showSizeChanger={false}/>)
        ]
        : [];
    if (render) {
        /**
         * placeholderAvatarUrl props
         */
        return (<antd_1.Card className="performer-grid" title={title} bordered={false} hoverable={false} bodyStyle={{ padding: '0' }} actions={actions}>
        <loader_1.default spinning={searching}/>
        {data.length > 0 && data.map((performer) => render(performer))}
      </antd_1.Card>);
    }
    return (<>
      {isPage && (topBanners === null || topBanners === void 0 ? void 0 : topBanners.length) > 0 && (<banner_1.default banners={topBanners} styleImage={{ padding: '10px', width: '100%' }}/>)}
      <antd_1.Card className="performer-grid" title={title} bordered={false} hoverable={false} bodyStyle={{ padding: '0' }} actions={actions}>
        <loader_1.default spinning={searching}/>
        {success
            // eslint-disable-next-line no-nested-ternary
            && (total > 0 ? (isPage ? (renderGrid()) : (data.map((performer) => (<exports.GridCard key={performer === null || performer === void 0 ? void 0 : performer._id} placeholderAvatarUrl={placeholderAvatarUrl} className="performer-box" performer={performer} loggedIn={loggedIn} onLike={(p) => onLike(p)}/>)))) : (<div className="ant-card-head">No model found.</div>))}
      </antd_1.Card>
      {isPage && (bottomBanners === null || bottomBanners === void 0 ? void 0 : bottomBanners.length) > 0 && (<banner_1.default banners={bottomBanners} styleImage={{ padding: '10px', width: '100%' }}/>)}
    </>);
};
PerformerGrid.defaultProps = {
    loggedIn: false,
    setFilter: null,
    limit: 0,
    offset: 0,
    total: 0,
    success: false,
    searching: false,
    title: '',
    onLike: null,
    render: null,
    isPage: false,
    banners: {},
    placeholderAvatarUrl: '/no-avatar.png'
};
const bannerSelecter = (state) => state.banner.listBanners.data;
const filterBanner = lib_1.createSelector(bannerSelecter, (banners) => {
    if (!banners.length)
        return {};
    return {
        topBanners: banners.filter((b) => b.position === 'top'),
        rightBanners: banners.filter((b) => b.position === 'right'),
        bottomBanners: banners.filter((b) => b.position === 'bottom')
    };
});
const mapStates = (state) => ({
    placeholderAvatarUrl: state.ui.placeholderAvatarUrl,
    banners: filterBanner(state)
});
exports.default = react_redux_1.connect(mapStates)(PerformerGrid);
