"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = __importDefault(require("joi"));
const createUserDto = joi_1.default.object({
    username: joi_1.default.string().min(3).required(),
    password: joi_1.default.string()
        .pattern(new RegExp('(?=.*\d)(?=.*[A-Z])(?=.*[0-9])[0-9a-zA-Z$*&@#]{8,}$'))
        .required(),
});
const createUserValid = (req, res, next) => {
    const { error } = createUserDto.validate(req.body);
    if (!error) {
        return next();
    }
    const [message] = error.details.map((e) => e.message);
    return res.status(400).json({ message });
};
exports.default = createUserValid;
