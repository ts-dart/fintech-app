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
const accounts_1 = __importDefault(require("../model/database/models/accounts"));
const users_1 = __importDefault(require("../model/database/models/users"));
const transactions_1 = __importDefault(require("../model/database/models/transactions"));
function create(dataUser, username, val) {
    return __awaiter(this, void 0, void 0, function* () {
        const value = parseFloat(val);
        const userCashIn = yield users_1.default.findOne({ where: { username } });
        if (userCashIn === null)
            return { message: 'Username não encontrado', code: 404 };
        if (dataUser.username === username)
            return { message: 'não é possível realizar uma transferência para si mesmo', code: 400 };
        const accUserCashOn = yield accounts_1.default.findOne({ where: { id: dataUser.accountId } });
        if (parseFloat(accUserCashOn.balance) < value)
            return { message: `Saldo insuficiente para realizar a transação`, code: 400 };
        const accUserCashIn = yield accounts_1.default.findOne({ where: { id: userCashIn.accountId } });
        yield accounts_1.default.update({ balance: parseFloat(String(accUserCashOn === null || accUserCashOn === void 0 ? void 0 : accUserCashOn.balance)) - value }, { where: { id: accUserCashOn === null || accUserCashOn === void 0 ? void 0 : accUserCashOn.id } });
        yield accounts_1.default.update({ balance: parseFloat(String(accUserCashIn === null || accUserCashIn === void 0 ? void 0 : accUserCashIn.balance)) + value }, { where: { id: accUserCashIn === null || accUserCashIn === void 0 ? void 0 : accUserCashIn.id } });
        yield transactions_1.default.create({
            debitedAccountId: userCashIn.accountId,
            creditedAccountId: dataUser.accountId,
            value: value,
            createdAt: new Date(),
        });
        return { message: 'Transação concluída com sucesso', code: 201 };
    });
}
exports.default = {
    create,
};
