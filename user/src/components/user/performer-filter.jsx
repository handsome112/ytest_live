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
const icons_1 = require("@ant-design/icons");
const classnames_1 = __importDefault(require("classnames"));
require("./performer-filter.less");
const PerformerFilter = ({ countries, categories, setFilter, category, country, gender, clearFilter }) => {
    const [visible, setVisible] = React.useState(false);
    const [selectedMenuKeys, setSelectedMenuKeys] = React.useState([]);
    const [lastSelectedMenuKey, setLastSelectedMenuKey] = React.useState();
    const onOpenChange = (keys) => {
        const menuKeys = keys.filter((key) => key !== lastSelectedMenuKey);
        setSelectedMenuKeys(menuKeys);
        setLastSelectedMenuKey(menuKeys[0]);
    };
    return (<>
      <antd_1.Row align="middle" className="performer-filter" justify="space-between">
        <antd_1.Col>
          <antd_1.Button icon={<icons_1.FilterOutlined />} type="primary" onClick={() => setVisible(true)} className="mr-8">
            Filter
          </antd_1.Button>
          <antd_1.Space className="ant-space-wrap">
            <span style={{ fontWeight: 'bold' }}>Popular Filter:</span>
            <antd_1.Button onClick={clearFilter} className={classnames_1.default(gender === '' ? 'active' : '')} type="dashed">
              All
            </antd_1.Button>
            <antd_1.Button onClick={() => setFilter('gender', gender === 'female' ? '' : 'female')} className={classnames_1.default(gender === 'female' ? 'active' : '')} type="dashed">
              Female
            </antd_1.Button>
            <antd_1.Button onClick={() => setFilter('gender', gender === 'transgender' ? '' : 'transgender')} className={classnames_1.default(gender === 'transgender' ? 'active' : '')} type="dashed">
              Transgender
            </antd_1.Button>
            <antd_1.Button onClick={() => setFilter('gender', gender === 'male' ? '' : 'male')} className={classnames_1.default(gender === 'male' ? 'active' : '')} type="dashed">
              Male
            </antd_1.Button>
          </antd_1.Space>
        </antd_1.Col>
      </antd_1.Row>
      <antd_1.Drawer visible={visible} placement="left" onClose={() => setVisible(false)} title={(<antd_1.Row justify="space-between" align="middle">
            <antd_1.Col>Filter by:</antd_1.Col>
            <antd_1.Col>
              <antd_1.Button type="link" onClick={() => clearFilter()} size="small" style={{ marginRight: 10 }}>
                Clear Filter
              </antd_1.Button>
            </antd_1.Col>
          </antd_1.Row>)}>
        {/* Select multiple category */}
        <antd_1.Menu mode="inline" style={{ borderRight: 0 }} multiple={false} onSelect={({ key }) => setFilter('category', key)} onDeselect={() => setFilter('category', '')} selectedKeys={[category]} openKeys={selectedMenuKeys} onOpenChange={onOpenChange}>
          <antd_1.Menu.SubMenu title="Category" key="category">
            {categories.length > 0
            && categories.map((c) => (<antd_1.Menu.Item key={c._id}>{c.name}</antd_1.Menu.Item>))}
          </antd_1.Menu.SubMenu>
        </antd_1.Menu>
        <antd_1.Menu mode="inline" style={{ borderRight: 0 }} onSelect={({ key }) => setFilter('gender', key)} onDeselect={() => setFilter('gender', '')} selectedKeys={[gender]} openKeys={selectedMenuKeys} onOpenChange={onOpenChange}>
          <antd_1.Menu.SubMenu title="Gender" key="gender">
            <antd_1.Menu.Item key="female">Female</antd_1.Menu.Item>
            <antd_1.Menu.Item key="transgender">Transgender</antd_1.Menu.Item>
            <antd_1.Menu.Item key="male">Male</antd_1.Menu.Item>
          </antd_1.Menu.SubMenu>
        </antd_1.Menu>
        {/* Select multiple country */}
        <antd_1.Menu mode="inline" style={{ borderRight: 0 }} multiple={false} onSelect={({ key }) => setFilter('country', key)} onDeselect={() => setFilter('country', '')} selectedKeys={[country]} openKeys={selectedMenuKeys} onOpenChange={onOpenChange}>
          <antd_1.Menu.SubMenu title="Country" key="country">
            {countries.length > 0
            && countries.map((c) => (<antd_1.Menu.Item key={c.name}>{c.name}</antd_1.Menu.Item>))}
          </antd_1.Menu.SubMenu>
        </antd_1.Menu>
      </antd_1.Drawer>
    </>);
};
PerformerFilter.defaultProps = {
    countries: [],
    categories: [],
    // offset: 0,
    // limit: 0,
    gender: '',
    category: '',
    country: ''
};
exports.default = PerformerFilter;
