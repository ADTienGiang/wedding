'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('parts', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      idwedding: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'weddings',
          key: 'id'
        }
      },
      bocuc: {
        type: Sequelize.STRING
      },
      noidung: {
        type: Sequelize.STRING
      },
      tieudephu: {
        type: Sequelize.STRING
      },
      stt: {
        type: Sequelize.INTEGER
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
    await queryInterface.dropTable('parts');
  }
};