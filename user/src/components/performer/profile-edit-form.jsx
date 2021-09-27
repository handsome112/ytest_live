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
/* eslint-disable no-shadow */
/* eslint-disable no-return-assign */
/* eslint-disable prefer-promise-reject-errors */
/* eslint-disable prefer-const */
/* eslint-disable react/require-default-props */
const React = __importStar(require("react"));
const antd_1 = require("antd");
const moment_1 = __importDefault(require("moment"));
require("./index.less");
const profile_1 = require("@components/common/base/select/profile");
const utils_1 = require("src/lib/utils");
const { TextArea } = antd_1.Input;
const hairDataSource = [
    { label: 'Brown', value: 'brown' },
    { label: 'Blonde', value: 'blonde' },
    { label: 'Black', value: 'black' },
    { label: 'Red', value: 'red' },
    { label: 'Unknown', value: 'unknown' }
];
const pubicHairDataSource = [
    { label: 'Trimmed', value: 'trimmed' },
    { label: 'Shaved', value: 'shaved' },
    { label: 'Hairy', value: 'hairy' },
    { label: 'Unknown', value: 'unknown' }
];
const bustDataSource = [
    { label: 'Large', value: 'large' },
    { label: 'Medium', value: 'medium' },
    { label: 'Small', value: 'small' },
    { label: 'Unknown', value: 'unknown' }
];
const weightDataSource = utils_1.formatDataWeight();
const heightDatasource = utils_1.formatDataHeight();
const formItemLayout = {
    labelCol: {
        xs: {
            span: 24
        },
        sm: {
            span: 4
        }
    },
    wrapperCol: {
        xs: {
            span: 24
        },
        sm: {
            span: 16
        }
    }
};
const tailFormItemLayout = {
    wrapperCol: {
        xs: {
            span: 24,
            offset: 0
        },
        sm: {
            span: 16,
            offset: 0
        }
    }
};
const UserProfile = ({ onFinish, firstName, lastName, countries, country, city, loading, address, state, aboutMe, dateOfBirth, gender, sexualReference, ethnicity, eyes, hair, height, weight, categoryIds, tags, pubicHair, bust, categoriesData, socials }) => {
    const [form] = antd_1.Form.useForm();
    let [facebook, setFb] = React.useState((socials === null || socials === void 0 ? void 0 : socials.facebook) || '');
    let [twitter, setTw] = React.useState((socials === null || socials === void 0 ? void 0 : socials.twitter) || '');
    let [instagram, setIta] = React.useState((socials === null || socials === void 0 ? void 0 : socials.instagram) || '');
    return (<antd_1.Form {...formItemLayout} form={form} onFinish={(values) => {
            const data = Object.assign(Object.assign({}, values), { socials: { facebook, twitter, instagram } });
            onFinish(data);
        }} name="contactSettingForm" className="performerEditForm" initialValues={{
            firstName,
            lastName,
            city,
            address,
            state,
            aboutMe,
            country,
            dateOfBirth: moment_1.default(dateOfBirth),
            gender,
            sexualReference,
            ethnicity,
            eyes,
            hair,
            height,
            weight,
            categoryIds,
            pubicHair,
            bust,
            tags,
            socials
        }} layout="horizontal">
      <antd_1.Form.Item name="firstName" label="First Name" rules={[
            {
                pattern: new RegExp('^[a-zA-Z0-9 ]*$'),
                message: 'Alphanumeric'
            },
            {
                whitespace: true,
                message: 'Please input your first name!'
            },
            {
                required: true,
                message: 'Please input your first name!'
            }
        ]}>
        <antd_1.Input placeholder="First name"/>
      </antd_1.Form.Item>
      <antd_1.Form.Item name="lastName" label="Last Name" rules={[
            {
                pattern: new RegExp('^[a-zA-Z0-9 ]*$'),
                message: 'Alphanumeric'
            },
            {
                whitespace: true,
                message: 'Please input your last name!'
            },
            {
                required: true,
                message: 'Please input your first name!'
            }
        ]}>
        <antd_1.Input placeholder="Last name"/>
      </antd_1.Form.Item>
      <antd_1.Form.Item name="aboutMe" label="About me">
        <TextArea rows={2} placeholder="Tell your fans something about you"/>
      </antd_1.Form.Item>
      <antd_1.Form.Item name="gender" label="Gender">
        <antd_1.Select>
          <antd_1.Select.Option value="male" key="male">
            Male
          </antd_1.Select.Option>
          <antd_1.Select.Option value="female" key="female">
            Female
          </antd_1.Select.Option>
          <antd_1.Select.Option value="transgender" key="transgender">
            Transgender
          </antd_1.Select.Option>
        </antd_1.Select>
      </antd_1.Form.Item>
      <antd_1.Form.Item name="sexualReference" label="Sexual Preference">
        <antd_1.Input placeholder="Sexual Preference"/>
      </antd_1.Form.Item>
      <antd_1.Form.Item name="dateOfBirth" label="Date of Birth" rules={[
            {
                required: true,
                message: 'Please input date of birth!'
            },
            {
                validator: (rule, value) => {
                    if (!value)
                        return Promise.resolve();
                    const years = moment_1.default().diff(value, 'years');
                    if (years >= 18) {
                        return Promise.resolve();
                    }
                    return Promise.reject('Minimum of 18 years');
                }
            }
        ]}>
        <antd_1.DatePicker style={{ width: '100%' }}/>
      </antd_1.Form.Item>
      <antd_1.Form.Item name="ethnicity" label="Ethnicity">
        <antd_1.Select>
          <antd_1.Select.Option value="White" key="white">
            White
          </antd_1.Select.Option>
          <antd_1.Select.Option value="Asian" key="asian">
            Asian
          </antd_1.Select.Option>
          <antd_1.Select.Option value="Black" key="black">
            Black
          </antd_1.Select.Option>
          <antd_1.Select.Option value="India" key="india">
            India
          </antd_1.Select.Option>
          <antd_1.Select.Option value="Latin" key="latin">
            Latin
          </antd_1.Select.Option>
          <antd_1.Select.Option value="Unknown" key="unknown">
            Unknown
          </antd_1.Select.Option>
        </antd_1.Select>
      </antd_1.Form.Item>
      <antd_1.Form.Item name="eyes" label="Eyes">
        <antd_1.Select>
          <antd_1.Select.Option value="Blue" key="blue">
            Blue
          </antd_1.Select.Option>
          <antd_1.Select.Option value="Brown" key="brown">
            Brown
          </antd_1.Select.Option>
          <antd_1.Select.Option value="Green" key="green">
            Green
          </antd_1.Select.Option>
          <antd_1.Select.Option value="Unknown" key="unknown">
            Unknown
          </antd_1.Select.Option>
        </antd_1.Select>
      </antd_1.Form.Item>
      <profile_1.OptionProfile label="Hair" dataSource={hairDataSource} name="hair"/>
      <profile_1.OptionProfile label="Weight" dataSource={weightDataSource} name="weight"/>
      <profile_1.OptionProfile label="Height" dataSource={heightDatasource} name="height"/>
      <profile_1.OptionProfile label="Pubic Hair" dataSource={pubicHairDataSource} name="pubicHair"/>
      <profile_1.OptionProfile label="Bust" dataSource={bustDataSource} name="bust"/>
      <antd_1.Form.Item name="categoryIds" label="Categories">
        <antd_1.Select mode="multiple">
          {categoriesData.map((c) => (<antd_1.Select.Option value={c._id} key={c._id}>
              {c.name}
            </antd_1.Select.Option>))}
        </antd_1.Select>
      </antd_1.Form.Item>
      <antd_1.Form.Item name="tags" label="Tags">
        <antd_1.Select mode="tags"/>
      </antd_1.Form.Item>
      <antd_1.Form.Item name="country" label="Country" rules={[{ required: true, message: 'Please input your country!' }]}>
        <antd_1.Select showSearch>
          {countries.length > 0
            && countries.map((country) => (<antd_1.Select.Option value={country.name} key={country.code}>
                {country.name}
              </antd_1.Select.Option>))}
        </antd_1.Select>
      </antd_1.Form.Item>
      <antd_1.Form.Item name="state" label="State Name">
        <antd_1.Input placeholder="samplestate"/>
      </antd_1.Form.Item>
      <antd_1.Form.Item name="city" label="City">
        <antd_1.Input placeholder="samplecity"/>
      </antd_1.Form.Item>
      <antd_1.Form.Item name="zipcode" label="Zip">
        <antd_1.Input placeholder="012345-678"/>
      </antd_1.Form.Item>
      <antd_1.Form.Item name="address" label="Address">
        <antd_1.Input placeholder="Address"/>
      </antd_1.Form.Item>
      <antd_1.Form.Item label="Facebook">
        <antd_1.Input placeholder="https://www.facebook.com" value={facebook} onChange={(e) => setFb((facebook = e.target.value))}/>
      </antd_1.Form.Item>
      <antd_1.Form.Item label="Twitter">
        <antd_1.Input placeholder="https://www.twitter.com" value={twitter} onChange={(e) => setTw((twitter = e.target.value))}/>
      </antd_1.Form.Item>
      <antd_1.Form.Item label="Instagram">
        <antd_1.Input placeholder="https://www.instagram.com" value={instagram} onChange={(e) => setIta((instagram = e.target.value))}/>
      </antd_1.Form.Item>
      <antd_1.Form.Item {...tailFormItemLayout}>
        <antd_1.Button type="primary" htmlType="submit" disabled={loading} loading={loading}>
          Save Changes
        </antd_1.Button>
      </antd_1.Form.Item>
    </antd_1.Form>);
};
exports.default = UserProfile;
