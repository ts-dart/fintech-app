"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const transactionsController_1 = __importDefault(require("../controllers/transactionsController"));
const validatorJwtToken_1 = __importDefault(require("../middlewares/validatorJwtToken"));
const route = (0, express_1.Router)();
route.get('/', validatorJwtToken_1.default, transactionsController_1.default.read);
exports.default = route;
