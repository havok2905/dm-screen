'use strict';

import {
  DataTypes,
  Model
} from 'sequelize';

export default (sequelize) => {
  class MagicItem extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate() {
      // define association here
    }
  }

  MagicItem.init({
    id: {
      type: DataTypes.TEXT,
      primaryKey: true
    },
    name: DataTypes.TEXT,
    image: DataTypes.TEXT,
    content: DataTypes.TEXT,
    metadata: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'MagicItem',
  });

  return MagicItem;
};
