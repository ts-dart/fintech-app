"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const operationController_1 = __importDefault(require("../controllers/operationController"));
const validatorJwtToken_1 = __importDefault(require("../middlewares/validatorJwtToken"));
const route = (0, express_1.Router)();
route.post('/', validatorJwtToken_1.default, operationController_1.default.create);
exports.default = route;
