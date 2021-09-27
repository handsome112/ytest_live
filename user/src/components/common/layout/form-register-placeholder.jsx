"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FormRegisterPlaceHolder = void 0;
const react_1 = __importDefault(require("react"));
const FormRegisterPlaceHolder = ({ ui }) => (<div className="form-register-placeholder" style={(ui === null || ui === void 0 ? void 0 : ui.placeholderLoginUrl)
        ? { backgroundImage: `url(${ui.placeholderLoginUrl})` }
        : {}}/>);
exports.FormRegisterPlaceHolder = FormRegisterPlaceHolder;
