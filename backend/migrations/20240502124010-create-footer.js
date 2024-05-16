'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('footers', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      sdt: {
        type: Sequelize.STRING
      },
      email: {
        type: Sequelize.STRING
      },
      diachi: {
        type: Sequelize.STRING
      },
      linksocial1: {
        type: Sequelize.STRING
      },
      linksocial2: {
        type: Sequelize.STRING
      },
      linksocial3: {
        type: Sequelize.STRING
      },
      linksocial4: {
        type: Sequelize.STRING
      },
      service: {
        type: Sequelize.STRING
      },
      aboutwork: {
        type: Sequelize.STRING
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
    await queryInterface.dropTable('footers');
  }
};