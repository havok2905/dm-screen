'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('AdventurePlayers', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.TEXT
      },
      ac: {
        type: Sequelize.INTEGER
      },
      adventureid: {
        type: Sequelize.TEXT
      },
      charactername: {
        type: Sequelize.TEXT
      },
      image: {
        type: Sequelize.TEXT
      },
      playername: {
        type: Sequelize.TEXT
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface) {
    await queryInterface.dropTable('AdventurePlayers');
  }
};