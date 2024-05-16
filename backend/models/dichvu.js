'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class dichvu extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  dichvu.init({
    banner: DataTypes.STRING,
    tieude: DataTypes.STRING,
    gioithieu: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'dichvu',
  });
  return dichvu;
};