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
const React = __importStar(require("react"));
const antd_1 = require("antd");
const icons_1 = require("@components/common/base/icons");
require("./profile-detail.less");
const ListItem = ({ description, title }) => (<antd_1.List.Item>
    <antd_1.Row style={{ width: '100%' }}>
      <antd_1.Col className="light-text" sm={{ span: 6 }} xs={{ span: 12 }}>
        {title}
      </antd_1.Col>
      <antd_1.Col style={{ fontWeight: 'bold' }} sm={{ span: 18 }} xs={{ span: 12 }}>
        {description}
      </antd_1.Col>
    </antd_1.Row>
  </antd_1.List.Item>);
const ProfileDetail = ({ performer }) => {
    var _a, _b, _c, _d, _e, _f;
    return (<div className="performer-profile-list">
    <antd_1.Row>
      <antd_1.Col sm={{ span: 12 }} xs={{ span: 24 }}>
        <antd_1.List itemLayout="horizontal">
          {/* <ListItem description={performer.firstName} title="First Name" />
        <ListItem description={performer.lastName} title="Last Name" /> */}
          <ListItem description={performer.gender} title="Gender"/>
          <ListItem description={performer.sexualReference} title="Sexual Preference"/>
          <ListItem description={performer.height} title="Height"/>
          <ListItem description={performer.weight} title="Weight"/>
          <ListItem description={performer.hair} title="Hair"/>
          <ListItem description={performer.eyes} title="Eyes"/>
          <ListItem description={performer.ethnicity} title="Ethnicity"/>
          <ListItem description={performer.pubicHair} title="Pubic hair"/>
          <ListItem description={performer.categories && performer.categories.join(', ')} title="Categories"/>
          <ListItem description={performer.tags && performer.tags.join(', ')} title="Tags"/>
          <ListItem description={performer.bust} title="Bust"/>
        </antd_1.List>
        <br />
        <antd_1.List header={<strong>Public Location Info</strong>}>
          <ListItem description={performer.country} title="Country"/>
          <ListItem description={performer.state} title="State"/>
          <ListItem description={performer.city} title="City"/>
        </antd_1.List>
        <br />
        <antd_1.Card title="About me" bordered={false}>
          {performer.aboutMe || '...'}
        </antd_1.Card>
        <antd_1.Card title="Social Media Info" bordered={false}>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <div className="social-media">
              <antd_1.Button type="primary" style={{ padding: 5, marginRight: 15 }}>
                <icons_1.FacebookIcon />
              </antd_1.Button>
              <a href={(_a = performer === null || performer === void 0 ? void 0 : performer.socials) === null || _a === void 0 ? void 0 : _a.facebook} target="_blank" rel="noreferrer">{(_b = performer === null || performer === void 0 ? void 0 : performer.socials) === null || _b === void 0 ? void 0 : _b.facebook}</a>
            </div>
            <div className="social-media">
              <antd_1.Button type="primary" style={{ padding: 5, marginRight: 15 }}>
                <icons_1.TwitterIcon />
              </antd_1.Button>
              <a href={(_c = performer === null || performer === void 0 ? void 0 : performer.socials) === null || _c === void 0 ? void 0 : _c.twitter} target="_blank" rel="noreferrer">{(_d = performer === null || performer === void 0 ? void 0 : performer.socials) === null || _d === void 0 ? void 0 : _d.twitter}</a>
            </div>
            <div className="social-media">
              <antd_1.Button type="primary" style={{ padding: 5, marginRight: 15 }}>
                <icons_1.InstagramIcon />
              </antd_1.Button>
              <a href={(_e = performer === null || performer === void 0 ? void 0 : performer.socials) === null || _e === void 0 ? void 0 : _e.instagram} target="_blank" rel="noreferrer">{(_f = performer === null || performer === void 0 ? void 0 : performer.socials) === null || _f === void 0 ? void 0 : _f.instagram}</a>
            </div>
          </div>
        </antd_1.Card>
      </antd_1.Col>
    </antd_1.Row>
  </div>);
};
exports.default = ProfileDetail;
