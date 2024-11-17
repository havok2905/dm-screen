'use strict';

import {
  DataTypes,
  Model
} from 'sequelize';

export default (sequelize) => {
  class AdventurePlayer extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate() {
      // define association here
    }
  }

  AdventurePlayer.init({
    id: {
      type: DataTypes.TEXT,
      primaryKey: true
    },
    ac: DataTypes.INTEGER,
    adventureid: DataTypes.TEXT,
    charactername: DataTypes.TEXT,
    image: DataTypes.TEXT,
    playername: DataTypes.TEXT,
  }, {
    sequelize,
    modelName: 'AdventurePlayer',
  });

  return AdventurePlayer;
};
