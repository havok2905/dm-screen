import {
  Dialect,
  Sequelize
} from 'sequelize';

import dotenv from 'dotenv';

import { ServerConfig } from '../config';

dotenv.config();

const config = new ServerConfig();

export const sequelize = new Sequelize({
  dialect: config.getDbType() as Dialect,
  storage: config.getDbSource()
});
