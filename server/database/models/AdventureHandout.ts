import { DataTypes } from 'sequelize';
import { sequelize } from '../sequelize';

export const AdventureHandout = sequelize.define('adventurehandout', {
  id: {
    type: DataTypes.TEXT,
    primaryKey: true
  },
  adventureid: DataTypes.TEXT,
  name: DataTypes.TEXT,
  description: DataTypes.TEXT,
  url: DataTypes.TEXT
});
