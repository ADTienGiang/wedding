'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class footer extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  footer.init({
    sdt: DataTypes.STRING,
    email: DataTypes.STRING,
    diachi: DataTypes.STRING,
    linksocial1: DataTypes.STRING,
    linksocial2: DataTypes.STRING,
    linksocial3: DataTypes.STRING,
    linksocial4: DataTypes.STRING,
    service: DataTypes.STRING,
    aboutwork: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'footer',
  });
  return footer;
};