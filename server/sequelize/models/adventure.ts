'use strict';

import {
  DataTypes,
  Model
} from 'sequelize';

export default (sequelize) => {
  class Adventure extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }

  Adventure.init({
    id: {
      type: DataTypes.TEXT,
      primaryKey: true
    },
    name: DataTypes.TEXT,
    system: DataTypes.TEXT,
    notes: DataTypes.TEXT,
    description: DataTypes.TEXT,
    splashImgSrc: DataTypes.TEXT,
  }, {
    sequelize,
    modelName: 'Adventure',
  });

  return Adventure;
};
