'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class hinhanhchitietdichvu extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      hinhanhchitietdichvu.belongsTo(models.chitietdichvu, { foreignKey: 'idchitietdichvu', as :'chitietdichvu' })

    }
  }
  hinhanhchitietdichvu.init({
    duongDan: DataTypes.STRING,
    idchitietdichvu: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'hinhanhchitietdichvu',
  });
  return hinhanhchitietdichvu;
};