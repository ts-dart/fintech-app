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
const users_1 = __importDefault(require("../model/database/models/users"));
const accounts_1 = __importDefault(require("../model/database/models/accounts"));
const bcrypt_1 = __importDefault(require("bcrypt"));
function create(username, password) {
    return __awaiter(this, void 0, void 0, function* () {
        const data = yield users_1.default.findOne({ where: { username } });
        if (data !== null) {
            return { message: 'Username already registered', code: 400 };
        }
        ;
        const accountCreated = yield accounts_1.default.create({ balance: '100.00' });
        yield users_1.default.create({
            username,
            password: yield bcrypt_1.default.hash(password, 10),
            accountId: accountCreated.id,
        });
        return { message: 'Successfully registered user', code: 201 };
    });
}
exports.default = {
    create,
};
