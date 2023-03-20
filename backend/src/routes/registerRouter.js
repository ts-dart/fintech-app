"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const registerController_1 = __importDefault(require("../controllers/registerController"));
const validatorRegisterJoi_1 = __importDefault(require("../middlewares/validatorRegisterJoi"));
const route = (0, express_1.Router)();
route.post('/', validatorRegisterJoi_1.default, registerController_1.default.create);
exports.default = route;
