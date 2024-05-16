'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('nhacungcaps', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      nhacungcap: {
        type: Sequelize.STRING
      },
      tennhacung: {
        type: Sequelize.STRING
      },
      linksocialnhacungcap: {
        type: Sequelize.STRING
      },
      idhanhtrinh: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'hanhtrinhs',
          key: 'id'
        }
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
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('nhacungcaps');
  }
};