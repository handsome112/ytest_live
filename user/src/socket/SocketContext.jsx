"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SocketContext = void 0;
const react_1 = __importDefault(require("react"));
exports.SocketContext = react_1.default.createContext('socket');
