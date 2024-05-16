'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('weddings', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      banner: {
        type: Sequelize.STRING
      },
      tieude: {
        type: Sequelize.STRING
      },
      capdoi: {
        type: Sequelize.STRING
      },
      quoctich: {
        type: Sequelize.STRING
      },
      ytuong: {
        type: Sequelize.STRING
      },
      soluongkhach: {
        type: Sequelize.STRING
      },
      diadiem: {
        type: Sequelize.STRING
      },
      duongdan: {
        type: Sequelize.STRING
      },
      theloai: {
        type: Sequelize.STRING
      },
      trangthaihienthi: {
        type: Sequelize.BOOLEAN
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
    await queryInterface.dropTable('weddings');
  }
};