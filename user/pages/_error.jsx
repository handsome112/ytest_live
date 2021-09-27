"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable no-nested-ternary */
const react_1 = __importDefault(require("react"));
function Error({ statusCode, message = '' }) {
    return (<p style={{ textAlign: 'center' }}>
      {message
            ? `${statusCode} - ${message}`
            : statusCode
                ? `${statusCode} - An error ${statusCode} occurred on server`
                : 'An error occurred on client'}
    </p>);
}
Error.getInitialProps = ({ res, err }) => {
    const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
    return { statusCode };
};
exports.default = Error;
