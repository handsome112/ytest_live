"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const antd_1 = require("antd");
const icons_1 = require("@ant-design/icons");
const react_1 = __importDefault(require("react"));
const StudioModelsSearch = ({ onSearch, searching }) => (<div>
    <antd_1.Form onFinish={onSearch} name="studioSearchModels" 
// className="performerEditForm"
layout="vertical" initialValues={{
        q: '',
        status: ''
    }}>
      <antd_1.Form.Item name="q" key="name">
        <antd_1.Input type="text" prefix={<icons_1.SearchOutlined className="site-form-item-icon"/>} placeholder="Search..."/>
      </antd_1.Form.Item>
      <antd_1.Form.Item name="status" key="onlineStatus">
        <antd_1.Select>
          <antd_1.Select.Option value="" key="">
            All Status
          </antd_1.Select.Option>
          <antd_1.Select.Option value="active" key="active">
            Active
          </antd_1.Select.Option>
          <antd_1.Select.Option value="inactive" key="inactive">
            Inactive
          </antd_1.Select.Option>
        </antd_1.Select>
      </antd_1.Form.Item>
      <antd_1.Form.Item>
        <antd_1.Button type="primary" htmlType="submit" disabled={searching} loading={searching}>
          Search
        </antd_1.Button>
      </antd_1.Form.Item>
    </antd_1.Form>
  </div>);
StudioModelsSearch.defaultProps = {
    onSearch: null
};
exports.default = StudioModelsSearch;
