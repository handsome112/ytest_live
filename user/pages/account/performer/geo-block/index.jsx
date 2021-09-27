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
const antd_1 = require("antd");
const page_header_1 = __importDefault(require("@components/common/layout/page-header"));
const head_1 = __importDefault(require("next/head"));
const react_1 = __importStar(require("react"));
const services_1 = require("src/services");
const utils_1 = require("@lib/utils");
const react_redux_1 = require("react-redux");
require("./index.less");
class PerformerGeoBlockPage extends react_1.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            blockedCountries: [],
            blockedUsers: [],
            isLoading: false,
            isBlocking: false
        };
    }
    componentDidMount() {
        this.search();
    }
    componentDidUpdate(_, prevState) {
        const { blockedCountries, isBlocking } = this.state;
        if (isBlocking && blockedCountries !== prevState.blockedCountries) {
            this.blockCountry(blockedCountries);
        }
    }
    handleBlockCountry(code, event) {
        this.setState({ isBlocking: true });
        const { blockedCountries } = this.state;
        if (event.target && event.target.checked) {
            // performerService.geoBlock({ countries: blockedCountries });
            this.setState({ blockedCountries: [...blockedCountries, code] });
        }
        else {
            this.setState({ blockedCountries: blockedCountries.filter((c) => code !== c) });
        }
    }
    async handleBlockUser(userId) {
        if (!window.confirm('Are you sure?'))
            return;
        const { blockedUsers } = this.state;
        try {
            const user = blockedUsers.find((u) => u._id === userId);
            blockedUsers.splice(user, 1);
            await this.setState((state) => {
                const list = state.blockedUsers.splice(user, 1);
                return Object.assign(Object.assign({}, state), { blockedUsers: list });
            });
            services_1.performerService.geoBlock({ userIds: blockedUsers.length ? blockedUsers.map((b) => b._id) : [] });
        }
        catch (e) {
            const error = await Promise.resolve(e);
            antd_1.message.error(error || 'Something went wrong, please try again later');
        }
    }
    async search() {
        try {
            this.setState({ isLoading: true });
            const resp = await services_1.performerService.getBlockedList();
            this.setState({
                blockedCountries: resp.data.countries || [],
                blockedUsers: resp.data.usersInfo || []
            });
        }
        catch (e) {
            const error = await Promise.resolve(e);
            antd_1.message.error(utils_1.getResponseError(error || 'An error occurred, please try again!'));
        }
        finally {
            this.setState({ isLoading: false });
        }
    }
    async blockCountry(blockedCountries) {
        try {
            await services_1.performerService.geoBlock({ countries: blockedCountries });
        }
        catch (e) {
            const error = await Promise.resolve(e);
            antd_1.message.error(error || 'Something went wrong, please try again later');
        }
        finally {
            this.setState({ isBlocking: false });
        }
    }
    render() {
        const { countries } = this.props;
        const { isLoading, isBlocking, blockedCountries, blockedUsers } = this.state;
        const countriesColumns = [
            {
                title: 'Country',
                dataIndex: 'name',
                key: 'name'
            },
            {
                title: 'Coutry Code',
                dataIndex: 'code',
                key: 'code'
            },
            {
                title: 'Flag',
                dataIndex: 'flag',
                key: 'flag',
                render: (flag) => <img src={flag} width="50px" alt=""/>
            },
            {
                title: '#',
                dataIndex: 'code',
                key: 'check',
                render: (code) => (<antd_1.Checkbox disabled={isBlocking} defaultChecked={!!(blockedCountries.length > 0 && blockedCountries.find((c) => c === code))} onChange={this.handleBlockCountry.bind(this, code)}/>)
            }
        ];
        const usersColumns = [
            {
                title: '# ',
                dataIndex: '_id',
                key: 'avatar',
                render: (avatar, record) => <img src={(record === null || record === void 0 ? void 0 : record.avatar) || '/default-user-icon.png'} width="50px" alt=""/>
            },
            {
                title: 'Name ',
                dataIndex: 'name',
                key: 'name'
            },
            {
                title: 'Username',
                dataIndex: 'username',
                key: 'username'
            },
            {
                title: '#',
                dataIndex: '_id',
                key: 'check',
                render: (id) => <div><antd_1.Button onClick={this.handleBlockUser.bind(this, id)}>Unblock</antd_1.Button></div>
            }
        ];
        return (<>
        <head_1.default>
          <title>Blocking</title>
        </head_1.default>
        <div className="geo-blocking-page">
          <page_header_1.default title="Blocking"/>
          <antd_1.Tabs defaultActiveKey="geo-block">
            <antd_1.Tabs.TabPane tab="GEO Blocking" key="geo-block">
              <div>
                {countries && countries.length > 0 && !isLoading ? (<antd_1.Table pagination={false} dataSource={countries.map((c, index) => (Object.assign(Object.assign({}, c), { key: `key-country-${index}` })))} columns={countriesColumns}/>) : <p className="text-center">loading...</p>}
              </div>
            </antd_1.Tabs.TabPane>
            <antd_1.Tabs.TabPane tab="Black list users" key="user-block">
              <div>
                {!isLoading ? (<antd_1.Table pagination={false} dataSource={blockedUsers.map((c, index) => (Object.assign(Object.assign({}, c), { key: `key-country-${index}` })))} columns={usersColumns}/>) : <p className="text-center">loading...</p>}
              </div>
            </antd_1.Tabs.TabPane>
          </antd_1.Tabs>
        </div>
      </>);
    }
}
PerformerGeoBlockPage.authenticate = true;
PerformerGeoBlockPage.layout = 'primary';
const mapStateToProps = (state) => ({ countries: state.settings.countries });
exports.default = react_redux_1.connect(mapStateToProps)(PerformerGeoBlockPage);
