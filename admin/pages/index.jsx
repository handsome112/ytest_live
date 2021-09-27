"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const head_1 = __importDefault(require("next/head"));
const Home = () => (<div className="container">
    <head_1.default>
      <title>Admin panel</title>
      <link rel="icon" href="/favicon.ico"/>
    </head_1.default>

    <main>
      Select menu item to start!
    </main>

  </div>);
exports.default = Home;
