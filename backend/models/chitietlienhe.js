'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class chitietlienhe extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  chitietlienhe.init({
    gioithieulienhe: DataTypes.STRING,
    sdt: DataTypes.STRING,
    email: DataTypes.STRING,
    diachi: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'chitietlienhe',
  });
  return chitietlienhe;
};