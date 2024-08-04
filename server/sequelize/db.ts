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
import equipmentitem from './models/equipmentitem';
import initiative from './models/initiative';
import magicitem from './models/magicitem';

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
const EquipmentItem = equipmentitem(db);
const Initiative = initiative(db);
const MagicItem = magicitem(db);

export {
  Adventure,
  AdventureCreature,
  AdventureHandout,
  AdventureItem,
  Creature,
  db,
  EquipmentItem,
  Initiative,
  MagicItem
};

