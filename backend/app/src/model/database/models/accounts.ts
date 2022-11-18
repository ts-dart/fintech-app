import { Model, STRING, INTEGER, DECIMAL } from 'sequelize';
import db from '.'

class accounts extends Model {
  public id!: number;
  public balance!: string;
}

accounts.init({
  id: {
    type: INTEGER,
    primaryKey: true,
    allowNull: false,
    autoIncrement: true,
  },
  balance: {
    type: DECIMAL,
    allowNull: false,
  }
}, {
  sequelize: db,
  modelName: 'accounts',
  timestamps: false,
  underscored: false,
})

export default accounts;