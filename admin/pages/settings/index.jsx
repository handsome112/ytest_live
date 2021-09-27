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
const head_1 = __importDefault(require("next/head"));
const react_1 = require("react");
const dynamic_1 = __importDefault(require("next/dynamic"));
const antd_1 = require("antd");
const page_1 = __importDefault(require("@components/common/layout/page"));
const loader_1 = __importDefault(require("@components/common/base/loader"));
const image_upload_1 = require("@components/file/image-upload");
const sound_upload_1 = __importDefault(require("@components/file/sound-upload"));
const auth_service_1 = require("@services/auth.service");
const setting_service_1 = require("@services/setting.service");
const utils_1 = require("@lib/utils");
const select_post_dropdown_1 = require("@components/post/select-post-dropdown");
const WYSIWYG = dynamic_1.default(() => Promise.resolve().then(() => __importStar(require('@components/wysiwyg'))), {
    ssr: false
});
const { Option } = antd_1.Select;
class Settings extends react_1.PureComponent {
    constructor() {
        super(...arguments);
        this.footerContent = '';
        this.state = {
            updating: false,
            loading: false,
            selectedTab: 'general',
            list: []
        };
        this.dataChange = {};
        this.smtpInfo = {
            host: '',
            port: 465,
            secure: true,
            auth: {
                user: '',
                password: ''
            }
        };
    }
    componentDidMount() {
        this.formRef = react_1.createRef();
        this.loadSettings();
    }
    async onMenuChange(menu) {
        await this.setState({
            selectedTab: menu.key
        });
        await this.loadSettings();
    }
    async loadSettings() {
        const { selectedTab } = this.state;
        try {
            await this.setState({ loading: true });
            const resp = (await setting_service_1.settingService.all(this.state.selectedTab));
            this.dataChange = {};
            if (selectedTab === 'mailer' &&
                resp.data &&
                resp.data.length) {
                const info = resp.data.find((data) => data.key === 'smtpTransporter');
                if (info)
                    this.smtpInfo = info.value;
            }
            this.setState({ list: resp.data });
        }
        catch (e) {
            const error = await Promise.resolve(e);
            antd_1.message.error(utils_1.getResponseError(error));
        }
        finally {
            await this.setState({ loading: false });
        }
    }
    async submit() {
        try {
            await this.setState({ updating: true });
            for (const key of Object.keys(this.dataChange)) {
                await setting_service_1.settingService.update(key, this.dataChange[key]);
            }
            antd_1.message.success('Updated setting successfully');
        }
        catch (e) {
            const error = await Promise.resolve(e);
            antd_1.message.error(utils_1.getResponseError(error));
        }
        finally {
            await this.setState({ updating: false });
        }
    }
    renderUpload(setting, ref) {
        if (!setting.meta || !setting.meta.upload) {
            return null;
        }
        const uploadHeaders = {
            authorization: auth_service_1.authService.getToken()
        };
        return (<div style={{ padding: '10px 0' }} key={`upload${setting._id}`}>
        {setting.meta.image ? (<image_upload_1.ImageUpload imageUrl={setting.value} uploadUrl={setting_service_1.settingService.getFileUploadUrl()} headers={uploadHeaders} onUploaded={(resp) => {
                    const formInstance = this.formRef.current;
                    ref.current.input.value = resp.response.data.url;
                    formInstance.setFieldsValue({
                        [setting.key]: resp.response.data.url
                    });
                    this.dataChange[setting.key] = resp.response.data.url;
                }}/>) : (<sound_upload_1.default fileUrl={setting.value} uploadUrl={setting_service_1.settingService.getFileUploadUrl()} headers={uploadHeaders} onUploaded={(resp) => {
                    const formInstance = this.formRef.current;
                    ref.current.input.value = resp.response.data.url;
                    formInstance.setFieldsValue({
                        [setting.key]: resp.response.data.url
                    });
                    this.dataChange[setting.key] = resp.response.data.url;
                }}/>)}
      </div>);
    }
    setVal(field, val) {
        this.dataChange[field] = val;
    }
    setObject(field, val) {
        if (field === 'user' || field === 'pass') {
            this.smtpInfo.auth[field] = val;
        }
        else {
            this.smtpInfo[field] = val;
        }
        this.dataChange.smtpTransporter = this.smtpInfo;
    }
    handleChange(event) {
        this.setState({ value: event.target.value });
    }
    renderFormItem(setting) {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j;
        const { updating } = this.state;
        let type = setting.type;
        if (setting.meta && setting.meta.textarea) {
            type = 'textarea';
        }
        const ref = react_1.createRef();
        switch (type) {
            case 'textarea':
                return (<antd_1.Form.Item label={setting.name} key={setting._id} extra={setting.description}>
            <antd_1.Input.TextArea defaultValue={setting.value} onChange={(val) => this.setVal(setting.key, val.target.value)}/>
          </antd_1.Form.Item>);
            case 'text-editor':
                return (<antd_1.Form.Item label={setting.name} key={setting._id} help={setting.description}>
            <WYSIWYG onChange={({ html }) => this.setVal(setting.key, html)} html={setting.value}/>
          </antd_1.Form.Item>);
            case 'checkbox':
                return (<antd_1.Form.Item label={setting.name} key={setting._id}>
            <antd_1.Checkbox.Group options={setting.meta.options} onChange={(checkedValues) => this.setVal(setting.key, checkedValues)} defaultValue={setting.value}/>
          </antd_1.Form.Item>);
            case 'number':
                return (<antd_1.Form.Item label={setting.name} key={setting._id} extra={setting.description} name={setting.key} rules={[
                        {
                            validator: (_, value) => {
                                if (typeof value !== 'number') {
                                    return Promise.reject('This field must be a number!');
                                }
                                if (setting.meta &&
                                    typeof setting.meta.min !== 'undefined' &&
                                    value < setting.meta.min) {
                                    return Promise.reject('Minimum ' + setting.meta.min);
                                }
                                if (setting.meta &&
                                    typeof setting.meta.min !== 'undefined' &&
                                    value > setting.meta.max) {
                                    return Promise.reject('Maximum ' + setting.meta.max);
                                }
                                return Promise.resolve();
                            }
                        }
                    ]}>
            <antd_1.InputNumber style={{ width: '100%' }} step={setting.meta && typeof setting.meta.step !== 'undefined'
                        ? setting.meta.step
                        : 1} defaultValue={setting.value} onChange={(val) => this.setVal(setting.key, val)} min={setting.meta && typeof setting.meta.min !== 'undefined'
                        ? setting.meta.min
                        : Number.MIN_SAFE_INTEGER} max={setting.meta && typeof setting.meta.max !== 'undefined'
                        ? setting.meta.max
                        : Number.MAX_SAFE_INTEGER} type="number"/>
          </antd_1.Form.Item>);
            case 'boolean':
                return (<div className="ant-row ant-form-item ant-form-item-with-help" key={setting._id}>
            <div className="ant-col ant-col-4 ant-form-item-label">
              <label>{setting.name}</label>
            </div>
            <div className="ant-col ant-col-16 ant-form-item-control">
              <antd_1.Switch defaultChecked={setting.value} onChange={(val) => this.setVal(setting.key, val)}/>
              <div className="ant-form-item-explain">{setting.description}</div>
            </div>
          </div>);
            case 'commission':
                return (<antd_1.Form.Item name={setting.key} label={setting.name} key={setting._id} extra={setting.description} rules={[
                        {
                            validator(_, v) {
                                if (parseInt(v) > 100 && parseInt(v) < 0) {
                                    return Promise.reject('Please input number 0-100');
                                }
                                return Promise.resolve();
                            }
                        }
                    ]}>
            <antd_1.InputNumber min={0} max={100} defaultValue={setting.value} onChange={(val) => this.setVal(setting.key, val)}/>
          </antd_1.Form.Item>);
            case 'mixed':
                return (<div className="ant-row ant-form-item ant-form-item-with-help" key={setting._id}>
            <div className="ant-col ant-col-4 ant-form-item-label">
              <label htmlFor="setting-name">
                {setting.name}
              </label>
            </div>
            <div className="ant-col ant-col-20 ant-form-item-control">
              <div className="ant-form-item">
                <div>
                  <label htmlFor="host-name">
                    Host
                    </label>
                  <antd_1.Input defaultValue={(_a = setting === null || setting === void 0 ? void 0 : setting.value) === null || _a === void 0 ? void 0 : _a.host} onChange={(val) => this.setObject('host', val.target.value)}/>
                </div>
                <div>
                  <label>Port</label>
                  <antd_1.Input defaultValue={(_b = setting === null || setting === void 0 ? void 0 : setting.value) === null || _b === void 0 ? void 0 : _b.port} onChange={(val) => this.setObject('port', val.target.value)}/>
                </div>
                <div style={{ margin: '10px 0' }}>
                  <label>
                    <antd_1.Checkbox defaultChecked={((_c = setting === null || setting === void 0 ? void 0 : setting.value) === null || _c === void 0 ? void 0 : _c.secure) || false} onChange={(e) => this.setObject('secure', e.target.checked)}/>
                    {' '}
                      Secure (true for port 465, false for other ports)
                    </label>
                </div>
                <div>
                  <label>Auth user</label>
                  <antd_1.Input defaultValue={(_e = (_d = setting === null || setting === void 0 ? void 0 : setting.value) === null || _d === void 0 ? void 0 : _d.auth) === null || _e === void 0 ? void 0 : _e.user} onChange={(val) => this.setObject('user', val.target.value)}/>
                </div>
                <div>
                  <label>Auth password</label>
                  <antd_1.Input defaultValue={(_g = (_f = setting === null || setting === void 0 ? void 0 : setting.value) === null || _f === void 0 ? void 0 : _f.auth) === null || _g === void 0 ? void 0 : _g.pass} onChange={(val) => this.setObject('pass', val.target.value)}/>
                </div>
              </div>
              <div className="ant-form-item-explain">{setting.description}</div>
              <div>
                <antd_1.Button disabled={updating} loading={updating} onClick={this.verifyMailer.bind(this)} type="link">Once saved, click here to send a testing email using this configuration above</antd_1.Button>
              </div>
            </div>
          </div>);
            case 'radio':
                return (<antd_1.Form.Item label={setting.name} key={setting._id} help={setting.description} extra={setting.extra}>
            <antd_1.Radio.Group onChange={(val) => this.setVal(setting.key, val.target.value)} defaultValue={setting.value}>
              {(_h = setting.meta) === null || _h === void 0 ? void 0 : _h.value.map((v) => (<antd_1.Radio value={v.key} checked={this.dataChange[setting.key] === v.key}>
                  {v.name}
                </antd_1.Radio>))}
            </antd_1.Radio.Group>
          </antd_1.Form.Item>);
            case 'post':
                return (<antd_1.Form.Item label={setting.name} key={setting._id} help={setting.description} extra={setting.extra}>
                  <select_post_dropdown_1.SelectPostDropdown defaultValue={setting.value} onSelect={(val) => this.setVal(setting.key, val)}/>
          </antd_1.Form.Item>);
            case 'dropdown':
            case 'radio':
                return (<antd_1.Form.Item label={setting.name} key={setting._id} help={setting.description} extra={setting.extra}>
            <antd_1.Select onChange={(val) => this.setVal(setting.key, val)} defaultValue={setting.value}>
                {(_j = setting.meta) === null || _j === void 0 ? void 0 : _j.value.map((v) => (<Option value={v.key}>
                  {v.name}
                </Option>))}
            </antd_1.Select>
          </antd_1.Form.Item>);
            default:
                return (<antd_1.Form.Item label={setting.name} key={setting._id} help={setting.description} extra={setting.extra}>
            <antd_1.Input defaultValue={setting.value} ref={ref} key={`input${setting._id}`} onChange={(val) => this.setVal(setting.key, val.target.value)}/>
            {this.renderUpload(setting, ref)}
          </antd_1.Form.Item>);
        }
    }
    async verifyMailer() {
        try {
            this.setState({ updating: true });
            await setting_service_1.settingService.verifyMailer();
            antd_1.message.success('We\'ve sent and test email, please check your email inbox or spam folder');
        }
        catch (e) {
            const err = await Promise.resolve(e);
            antd_1.message.error(err && err.errno ? err.errno : 'Could not verify this SMTP transporter');
        }
        finally {
            this.setState({ updating: false });
        }
    }
    render() {
        const { updating, selectedTab, list, loading } = this.state;
        const fixedTabs = ['commission', 'ccbill', 'custom'];
        const layout = fixedTabs.includes(selectedTab)
            ? {
                labelCol: { span: 8 },
                wrapperCol: { span: 16 }
            }
            : {
                labelCol: { span: 4 },
                wrapperCol: { span: 16 }
            };
        const initialValues = {};
        list.forEach((item) => {
            initialValues[item.key] = item.value;
        });
        return (<react_1.Fragment>
        <head_1.default>
          <title>Site Settings</title>
        </head_1.default>
        <page_1.default>
          <div style={{ marginBottom: '20px' }}>
            <antd_1.Menu onClick={this.onMenuChange.bind(this)} selectedKeys={[selectedTab]} mode="horizontal">
              <antd_1.Menu.Item key="general">General</antd_1.Menu.Item>
              <antd_1.Menu.Item key="email">Email</antd_1.Menu.Item>
              <antd_1.Menu.Item key="custom">Custom</antd_1.Menu.Item>
              <antd_1.Menu.Item key="commission">Commission</antd_1.Menu.Item>
              <antd_1.Menu.Item key="ccbill">CCbill</antd_1.Menu.Item>
              <antd_1.Menu.Item key="mailer">SMTP</antd_1.Menu.Item>
              <antd_1.Menu.Item key="analytics">Google Analytics</antd_1.Menu.Item>
              <antd_1.Menu.Item key="default-price">Default Price</antd_1.Menu.Item>
              <antd_1.Menu.Item key="customText">Custom Text</antd_1.Menu.Item>
              <antd_1.Menu.Item key="ant">Ant Media</antd_1.Menu.Item>
              <antd_1.Menu.Item key="currency">Currency</antd_1.Menu.Item>
            </antd_1.Menu>
          </div>

          {loading ? (<loader_1.default spinning={true}/>) : (<antd_1.Form {...layout} layout={fixedTabs.includes(selectedTab) ? 'vertical' : 'horizontal'} name="setting-frm" onFinish={this.submit.bind(this)} initialValues={initialValues} ref={this.formRef}>
                {list.map((setting) => this.renderFormItem(setting))}
                <antd_1.Form.Item wrapperCol={Object.assign(Object.assign({}, layout.wrapperCol), { offset: 4 })} style={{ textAlign: 'right' }}>
                  <antd_1.Button type="primary" htmlType="submit" loading={updating} disabled={updating}>
                    Submit
                </antd_1.Button>
                </antd_1.Form.Item>
              </antd_1.Form>)}
        </page_1.default>
      </react_1.Fragment>);
    }
}
exports.default = Settings;
