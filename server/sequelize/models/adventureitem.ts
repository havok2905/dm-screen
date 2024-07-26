'use strict';

import {
  DataTypes,
  Model
} from 'sequelize';

export default (sequelize) => {
  class AdventureItem extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate() {
      // define association here
    }
  }

  AdventureItem.init({
    adventureid: DataTypes.TEXT,
    name: DataTypes.TEXT,
    image: DataTypes.TEXT,
    content: DataTypes.TEXT,
    metadata: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'AdventureItem',
  });

  return AdventureItem;
};
