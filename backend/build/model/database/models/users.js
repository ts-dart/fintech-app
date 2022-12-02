"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const accounts_1 = __importDefault(require("./accounts"));
const _1 = __importDefault(require("."));
class users extends sequelize_1.Model {
}
users.init({
    id: {
        type: sequelize_1.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
    },
    username: {
        type: sequelize_1.STRING,
        allowNull: false,
    },
    password: {
        type: sequelize_1.STRING,
        allowNull: false,
    },
    accountId: {
        type: sequelize_1.INTEGER,
        allowNull: false,
    }
}, {
    sequelize: _1.default,
    modelName: 'users',
    timestamps: false,
    underscored: false,
});
users.belongsTo(accounts_1.default, { foreignKey: 'accountId', as: 'idAccount' });
accounts_1.default.hasMany(users, { foreignKey: 'accountId', as: 'idAccount' });
exports.default = users;
