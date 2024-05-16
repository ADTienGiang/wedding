'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class chitietdichvu extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      chitietdichvu.hasMany(models.cacgoidichvu, { foreignKey: 'idchitietdichvu' , as :'cacgoidichvu' })
      chitietdichvu.hasMany(models.hinhanhchitietdichvu, { foreignKey: 'idchitietdichvu' , as :'hinhanhchitietdichvu' })

    }
  }
  chitietdichvu.init({
    banner: DataTypes.STRING,
    tendichvu: DataTypes.STRING,
    mota: DataTypes.STRING,
    duongdanchitiet: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'chitietdichvu',
  });
  return chitietdichvu;
};