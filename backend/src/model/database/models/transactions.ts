import { Model, INTEGER, DATE, DECIMAL } from 'sequelize';
import accounts from './accounts';
import db from '.';

class transactions extends Model {
  public id!: number;
  public debitedAccountId!: number;
  public creditedAccountId!: number;
  public value!: string;
  public createdAt!: Date;
}

transactions.init({
  id: {
    type: INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  debitedAccountId: {
    type: INTEGER,
    allowNull: false,
    field: 'debited_account_id',
  },
  creditedAccountId: {
    type: INTEGER,
    allowNull: false,
    field: 'credited_account_id',
  },
  value: {
    type: DECIMAL,
    allowNull: false,
  },
  createdAt: {
    type: DATE,
    allowNull: false,
    field: 'created_at',
  },
}, {
  sequelize: db,
  modelName: 'transactions',
  timestamps: false,
  underscored: false,
})

transactions.belongsTo(accounts, {
  foreignKey: 'debitedAccountId',
  as: 'IdDebitedAccount',
});
transactions.belongsTo(accounts, {
  foreignKey: 'creditedAccountId',
  as: 'IdCreditedAccount',
});

accounts.hasMany(transactions, {
  foreignKey: 'debitedAccountId',
  as: 'IdDebitedAccount',
});
accounts.hasMany(transactions, {
  foreignKey: 'creditedAccountId',
  as: 'IdCreditedAccount',
});

export default transactions;