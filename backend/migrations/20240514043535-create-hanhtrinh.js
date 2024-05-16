'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('hanhtrinhs', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      idtheloai: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'theloais',
          key: 'id'
        }
      },
      banner: {
        type: Sequelize.STRING
      },
      tenchude: {
        type: Sequelize.STRING
      },
      tencapdoi: {
        type: Sequelize.STRING
      },
      mota: {
        type: Sequelize.STRING
      },
      duongdanhanhtrinh: {
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
    await queryInterface.dropTable('hanhtrinhs');
  }
};