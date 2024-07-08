import { DataTypes } from 'sequelize';
import { sequelize } from '../sequelize';

export const Adventure = sequelize.define('adventure', {
  id: {
    type: DataTypes.TEXT,
    primaryKey: true
  },
  name: DataTypes.TEXT,
  system: DataTypes.TEXT,
  notes: DataTypes.TEXT
});
