import { Sequelize, Options } from 'sequelize';
import config from '../config/database';

export default new Sequelize(config as Options);
