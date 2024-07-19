'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Adventures', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.TEXT
      },
      name: {
        type: Sequelize.TEXT
      },
      system: {
        type: Sequelize.TEXT
      },
      notes: {
        type: Sequelize.TEXT
      },
      description: {
        type: Sequelize.TEXT
      },
      splashImgSrc: {
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
    await queryInterface.dropTable('Adventures');
  }
};