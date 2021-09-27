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
/* eslint-disable jsx-a11y/control-has-associated-label */
const React = __importStar(require("react"));
const antd_1 = require("antd");
const icons_1 = require("@components/common/base/icons");
const lib_1 = require("src/lib");
const link_1 = __importDefault(require("next/link"));
require("./index.less");
const renderPerformerTags = (tags = []) => tags.map((tag, index) => (<link_1.default key={`performer-tag-${tag}`} href={{ pathname: '/tag', query: { tags: tag } }} as={`/tag/${tag}`}>
    <a>
      <span>
        #
        {index < tags.length - 1 ? `${tag}, ` : tag}
      </span>
    </a>
  </link_1.default>));
const ProfileCard = ({ performer, searching, success, placeholderAvatarUrl }) => {
    const { avatar, username, createdAt, gender, ethnicity, country, height, weight, dateOfBirth, tags, socials, lastStreamingTime, eyes } = performer;
    return (<div className="profile-card">
      {searching ? (<antd_1.Skeleton loading paragraph={{ rows: 4 }}/>) : success && (<>

          <div className="avatar">
            <img src={avatar || placeholderAvatarUrl} alt=""/>
          </div>

          <div className="profile">
            <table>
              <tbody>
                <tr>
                  <th style={{ width: 150, minWidth: 150 }}/>
                  <th />
                </tr>
                <tr>
                  <td className="lable">
                    Username
                  </td>
                  <td className="text">
                    {username}
                  </td>
                </tr>
                {gender && (<tr>
                  <td className="lable">
                    Gender
                  </td>
                  <td className="text">
                    {gender}
                  </td>
                </tr>)}
                {createdAt && (<tr>
                  <td className="lable">
                    Member Since
                  </td>
                  <td className="text">
                    {lib_1.formatDate(createdAt, 'MMMM DD, YYYY')}
                  </td>
                </tr>)}
                <tr>
                  <td className="lable">
                    Last Broadcast
                  </td>
                  <td className="text">
                    {lib_1.formatDate(lastStreamingTime, 'LLLL')}
                  </td>
                </tr>
                {ethnicity && (<tr>
                  <td className="lable">
                    Ethnicity
                  </td>
                  <td className="text">
                    {ethnicity}
                  </td>
                </tr>)}
                {/* <div className="orientationn">
          <span className="lable">Orientation: </span>
          <span className="" style={{ textTransform: 'capitalize' }} />
        </div> */}
                {dateOfBirth && (<tr>
                  <td className="lable">
                    Age
                  </td>
                  <td className="text">
                    {lib_1.getAge(dateOfBirth)}
                  </td>
                </tr>)}
                {country && (<tr>
                  <td className="lable">
                    Country
                  </td>
                  <td className="text">
                    {country}
                  </td>
                </tr>)}
                {height && (<tr>
                  <td className="lable">
                    Height
                  </td>
                  <td className="text">
                    {height}
                  </td>
                </tr>)}
                {weight && (<tr>
                  <td className="lable">
                    Weight
                  </td>
                  <td className="text">
                    {weight}
                  </td>
                </tr>)}
                {eyes && (<tr>
                  <td className="lable">
                    Eyes
                  </td>
                  <td className="text">
                    {eyes}
                  </td>
                </tr>)}
              </tbody>
            </table>
          </div>
          <br />
          {performer.aboutMe && (<p>
            About
            {' '}
            {username}
          </p>)}
          <div className="bio">
            <span>{performer.aboutMe}</span>
          </div>
          <br />
          <p>What We do on webcam</p>
          {tags && tags.length > 0 && <div className="tags">{renderPerformerTags(tags)}</div>}
          {performer.schedule
                && (<>
              <p>{`Working hours of ${lib_1.capitalizeFirstLetter(performer.username)}`}</p>
              <antd_1.Row className="schedule">
                {performer.schedule
                        && Object.keys(performer.schedule).map((index) => {
                            var _a, _b, _c, _d;
                            return (<antd_1.Col sm={{ span: 8 }} xs={{ span: 12 }} key={index}>
                      <span style={{
                                    color: '#ff0066',
                                    fontWeight: 'bold',
                                    textTransform: 'uppercase'
                                }}>
                        {`${index}  `}
                      </span>
                      <span style={{
                                    color: '#000000',
                                    fontWeight: 'bold'
                                }}>
                        {((_a = performer.schedule[index]) === null || _a === void 0 ? void 0 : _a.start) !== '00:00' && ((_b = performer.schedule[index]) === null || _b === void 0 ? void 0 : _b.end) !== '00:00'
                                    ? `${((_c = performer.schedule[index]) === null || _c === void 0 ? void 0 : _c.start) || 'N/A'} - ${((_d = performer.schedule[index]) === null || _d === void 0 ? void 0 : _d.end) || 'N/A'}`
                                    : 'N/A'}
                      </span>
                    </antd_1.Col>);
                        })}
              </antd_1.Row>
            </>)}
          <br />
          {socials && socials.length > 0 && <p>Find Me On</p>}
          <antd_1.Row className="social" gutter={10}>
            {socials && socials.facebook && (<antd_1.Col>
              <a href={socials.facebook} target="_blank" rel="noreferrer">
                <antd_1.Button type="primary" style={{ padding: 0, width: 36, height: 32 }}>
                  <icons_1.FacebookIcon />
                </antd_1.Button>
              </a>
            </antd_1.Col>)}
            {socials && socials.twitter && (<antd_1.Col>
              <a href={socials.twitter} target="_blank" rel="noreferrer">
                <antd_1.Button type="primary" style={{ padding: 0, width: 36, height: 32 }}>
                  <icons_1.TwitterIcon />
                </antd_1.Button>
              </a>
            </antd_1.Col>)}
            {socials && socials.instagram && (<antd_1.Col>
              <a href={socials.instagram} target="_blank" rel="noreferrer">
                <antd_1.Button type="primary" style={{ padding: 0, width: 36, height: 32 }}>
                  <icons_1.InstagramIcon />
                </antd_1.Button>
              </a>
            </antd_1.Col>)}
          </antd_1.Row>
        </>)}
    </div>);
};
ProfileCard.defaultProps = {
    searching: false,
    success: false,
    placeholderAvatarUrl: '/no-avatar.png'
};
exports.default = ProfileCard;
