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
const transactions_1 = __importDefault(require("../model/database/models/transactions"));
function read(data_user, by, date) {
    return __awaiter(this, void 0, void 0, function* () {
        if (by.includes('cash'))
            return yield getTransactionsByType(data_user, by, date);
        return yield getAllTransactions(data_user, date);
    });
}
function getAllTransactions(data_user, date) {
    return __awaiter(this, void 0, void 0, function* () {
        const { accountId } = data_user;
        const transactionsList = [
            ...yield transactions_1.default.findAll({ where: { debited_account_id: accountId } }),
            ...yield transactions_1.default.findAll({ where: { credited_account_id: accountId } })
        ];
        if (date.match('(?=.*[0-9])[0-9a-zA-Z$*&@#]'))
            return yield filterByDate(transactionsList, date);
        return { message: transactionsList, code: 200 };
    });
}
function getTransactionsByType(data_user, by, date) {
    return __awaiter(this, void 0, void 0, function* () {
        const { accountId } = data_user;
        const transactionsList = [];
        if (by === 'cash-out') {
            transactionsList.push(...yield transactions_1.default.findAll({ where: { credited_account_id: accountId } }));
            if (date.match('(?=.*[0-9])[0-9a-zA-Z$*&@#]'))
                return yield filterByDate(transactionsList, date);
        }
        else if (by === 'cash-in') {
            transactionsList.push(...yield transactions_1.default.findAll({ where: { debited_account_id: accountId } }));
            if (date.match('(?=.*[0-9])[0-9a-zA-Z$*&@#]'))
                return yield filterByDate(transactionsList, date);
        }
        return { message: transactionsList, code: 200 };
    });
}
function filterByDate(transactionsList, date) {
    return __awaiter(this, void 0, void 0, function* () {
        const list = transactionsList.map((transaction) => {
            const dObj = transaction.dataValues.createdAt;
            const dCurr = `${dObj.getDate()}/${dObj.getMonth() + 1}/${dObj.getFullYear()}`;
            if (dCurr === date)
                return transaction;
        });
        return { message: list, code: 200 };
    });
}
exports.default = {
    read,
};
