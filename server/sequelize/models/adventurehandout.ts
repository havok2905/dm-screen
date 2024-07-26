'use strict';

import {
  DataTypes,
  Model
} from 'sequelize';

export default (sequelize) => {
  class AdventureHandout extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate() {
      // define association here
    }
  }

  AdventureHandout.init({
    adventureid: DataTypes.TEXT,
    name: DataTypes.TEXT,
    description: DataTypes.TEXT,
    url: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'AdventureHandout',
  });

  return AdventureHandout;
};
