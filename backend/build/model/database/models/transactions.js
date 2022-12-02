"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const accounts_1 = __importDefault(require("./accounts"));
const _1 = __importDefault(require("."));
class transactions extends sequelize_1.Model {
}
transactions.init({
    id: {
        type: sequelize_1.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    debitedAccountId: {
        type: sequelize_1.INTEGER,
        allowNull: false,
    },
    creditedAccountId: {
        type: sequelize_1.INTEGER,
        allowNull: false,
    },
    value: {
        type: sequelize_1.STRING,
        allowNull: false,
    },
}, {
    sequelize: _1.default,
    modelName: 'transactions',
    timestamps: true,
    underscored: true,
});
transactions.belongsTo(accounts_1.default, {
    foreignKey: 'debitedAccountId',
    as: 'IdDebitedAccount',
});
transactions.belongsTo(accounts_1.default, {
    foreignKey: 'creditedAccountId',
    as: 'IdCreditedAccount',
});
accounts_1.default.hasMany(transactions, {
    foreignKey: 'debitedAccountId',
    as: 'IdDebitedAccount',
});
accounts_1.default.hasMany(transactions, {
    foreignKey: 'creditedAccountId',
    as: 'IdCreditedAccount',
});
exports.default = transactions;
