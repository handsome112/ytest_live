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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
const React = __importStar(require("react"));
const antd_1 = require("antd");
const { Option } = antd_1.Select;
const filter = (value, option) => option.children.toLowerCase().indexOf(value.toLowerCase()) > -1;
const CountriesSelect = (_a) => {
    var { defaultValue, onChange, countries } = _a, props = __rest(_a, ["defaultValue", "onChange", "countries"]);
    const [value, setValue] = React.useState(defaultValue);
    const handleSelectChange = (v) => {
        setValue(v);
        onChange && onChange(v);
    };
    return (<antd_1.Select {...props} value={value} onChange={handleSelectChange} showSearch filterOption={filter} placeholder="Select your counties">
      {countries.map((country) => (<Option key={country.code} value={country.code}>
          {country.name}
        </Option>))}
    </antd_1.Select>);
};
CountriesSelect.defaultProps = {
    autoFocus: false,
    disabled: false,
    mode: '',
    onChange: null
};
exports.default = CountriesSelect;
