'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class banner extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  banner.init({
    tenHinh: DataTypes.STRING,
    duongDan: DataTypes.STRING,
    kichthuoc: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'banner',
  });
  return banner;
};