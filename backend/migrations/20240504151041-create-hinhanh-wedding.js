'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('HinhanhWeddings', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      tenHinh: {
        type: Sequelize.STRING
      },
      duongDan: {
        type: Sequelize.STRING
      },
      provider: {
        type: Sequelize.STRING
      },
      idpart: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'parts',
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
    await queryInterface.dropTable('HinhanhWeddings');
  }
};