import { DataTypes } from 'sequelize';
import { sequelize } from '../sequelize';

export const AdventureItem = sequelize.define('adventureitem', {
  id: {
    type: DataTypes.TEXT,
    primaryKey: true
  },
  adventureid: DataTypes.TEXT,
  name: DataTypes.TEXT,
  image: DataTypes.TEXT,
  content: DataTypes.TEXT,
  metadata: DataTypes.TEXT
});
