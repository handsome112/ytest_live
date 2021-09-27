"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PerformerUsername = void 0;
const react_1 = __importDefault(require("react"));
const link_1 = __importDefault(require("next/link"));
const PerformerUsername = ({ performer }) => (<link_1.default href={{
        pathname: '/stream',
        query: { performer: JSON.stringify(performer) }
    }} as={`/profile/${performer.username}`}>
    <a>{performer.username}</a>
  </link_1.default>);
exports.PerformerUsername = PerformerUsername;
