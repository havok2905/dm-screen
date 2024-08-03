import {
  Dialect,
  Sequelize
} from 'sequelize';
import dotenv from 'dotenv';

import adventure from './models/adventure';
import adventurecreature from './models/adventurecreature';
import adventurehandout from './models/adventurehandout';
import adventureitem from './models/adventureitem';
import creature from './models/creature';
import initiative from './models/initiative';

import { ServerConfig } from '../config';

dotenv.config();

const config = new ServerConfig();

const db = new Sequelize({
  dialect: config.getDbType() as Dialect,
  storage: config.getDbSource()
});

const Adventure = adventure(db);
const AdventureCreature = adventurecreature(db);
const AdventureHandout = adventurehandout(db);
const AdventureItem = adventureitem(db);
const Creature = creature(db);
const Initiative = initiative(db);

export {
  Adventure,
  AdventureCreature,
  AdventureHandout,
  AdventureItem,
  Creature,
  db,
  Initiative
};

