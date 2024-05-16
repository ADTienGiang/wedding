'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class chitietblog extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      chitietblog.hasMany(models.hinhanhblog, { foreignKey: 'idchitietblog' , as :'hinhanhblog' })
    }
  }
  chitietblog.init({
    thumb: DataTypes.STRING,
    tieude: DataTypes.STRING,
    mota: DataTypes.STRING,
    duongdanchitietblog: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'chitietblog',
  });
  return chitietblog;
};