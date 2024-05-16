'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class logo extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  logo.init({
    tenHinh: DataTypes.STRING,
    duongDan: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'logo',
  });
  return logo;
};