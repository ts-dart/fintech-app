"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const registerRouter_1 = __importDefault(require("./registerRouter"));
const loginRouter_1 = __importDefault(require("./loginRouter"));
const balanceRouter_1 = __importDefault(require("./balanceRouter"));
const operationRouter_1 = __importDefault(require("./operationRouter"));
const transactionsRouter_1 = __importDefault(require("./transactionsRouter"));
exports.default = {
    registerRouter: registerRouter_1.default,
    loginRouter: loginRouter_1.default,
    balanceRouter: balanceRouter_1.default,
    operationRouter: operationRouter_1.default,
    transactionsRouter: transactionsRouter_1.default,
};
