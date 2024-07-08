import { Sequelize } from 'sequelize';
import { DBSOURCE } from '../database/constants';

export const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: DBSOURCE
});
