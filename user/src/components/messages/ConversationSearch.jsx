"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
require("./ConversationSearch.less");
function ConversationSearch({ onSearch }) {
    return (<div className="conversation-search">
      <input onChange={onSearch} type="search" className="conversation-search-input" placeholder="Search conversation..."/>
    </div>);
}
exports.default = ConversationSearch;
