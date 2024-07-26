'use strict';

import {
  DataTypes,
  Model
} from 'sequelize';

export default (sequelize) => {
  class Initiative extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate() {
      // define association here
    }
  }

  Initiative.init({
    id: {
      type: DataTypes.TEXT,
      primaryKey: true
    },
    adventureid: DataTypes.TEXT,
    initiativeOrderState: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'Initiative',
  });

  return Initiative;
};
