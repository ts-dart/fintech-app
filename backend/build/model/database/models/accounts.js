"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const _1 = __importDefault(require("."));
class accounts extends sequelize_1.Model {
}
accounts.init({
    id: {
        type: sequelize_1.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
    },
    balance: {
        type: sequelize_1.STRING,
        allowNull: false,
    }
}, {
    sequelize: _1.default,
    modelName: 'accounts',
    timestamps: false,
    underscored: false,
});
exports.default = accounts;
