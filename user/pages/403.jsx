"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const error_1 = __importDefault(require("next/error"));
function ErrorForbidden({ title }) {
    return <error_1.default statusCode={403} title={title}/>;
}
ErrorForbidden.defaultProps = {
    title: 'Forbidden Access'
};
ErrorForbidden.layout = 'default';
exports.default = ErrorForbidden;
