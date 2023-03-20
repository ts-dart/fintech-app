"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const bcrypt_1 = __importDefault(require("bcrypt"));
const users_1 = __importDefault(require("../model/database/models/users"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
function read(username, password) {
    return __awaiter(this, void 0, void 0, function* () {
        const userAccount = yield users_1.default.findOne({ where: { username } });
        if (userAccount === null)
            return { message: 'Username not registered', code: 404 };
        const { password: pass } = userAccount === null || userAccount === void 0 ? void 0 : userAccount.dataValues;
        const descriptPassword = yield bcrypt_1.default.compare(password, pass);
        if (!descriptPassword)
            return { message: 'Incorrect password', code: 400 };
        const secret = process.env.JWT_SECRET;
        const config = { expiresIn: '24h', algorithm: 'HS256' };
        const token = jsonwebtoken_1.default.sign(userAccount === null || userAccount === void 0 ? void 0 : userAccount.dataValues, String(secret), config);
        return { message: token, code: 200 };
    });
}
exports.default = {
    read,
};
