import { Model, STRING, INTEGER } from 'sequelize';
import accounts from './accounts';
import db from '.'

class users extends Model {
  public id!: number;
  public username!: string;
  public password!: string;
  public accountId!: number;
}

users.init({
  id: {
    type: INTEGER,
    primaryKey: true,
    allowNull: false,
    autoIncrement: true,
  },
  username: {
    type: STRING,
    allowNull: false,
  },
  password: {
    type: STRING,
    allowNull: false,
  },
  accountId: {
    type: INTEGER,
    allowNull: false,
  }
}, {
  sequelize: db,
  modelName: 'users',
  timestamps: false,
  underscored: false,
})

users.belongsTo(accounts, { foreignKey: 'accountId', as: 'idAccount' });
accounts.hasMany(users, { foreignKey: 'accountId', as: 'idAccount' });

export default users;