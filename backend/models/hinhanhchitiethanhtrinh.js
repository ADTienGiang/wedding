'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class hinhanhchitiethanhtrinh extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      hinhanhchitiethanhtrinh.belongsTo(models.hanhtrinh, { foreignKey: 'idhanhtrinh', as :'hanhtrinh' })

    }
  }
  hinhanhchitiethanhtrinh.init({
    duongDan: DataTypes.STRING,
    idhanhtrinh: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'hinhanhchitiethanhtrinh',
  });
  return hinhanhchitiethanhtrinh;
};