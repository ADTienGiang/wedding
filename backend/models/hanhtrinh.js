'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class hanhtrinh extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      hanhtrinh.hasMany(models.nhacungcap, { foreignKey: 'idhanhtrinh' , as :'nhacungcap' })
      hanhtrinh.hasMany(models.hinhanhchitiethanhtrinh, { foreignKey: 'idhanhtrinh' , as :'hinhanhchitiethanhtrinh' })
      hanhtrinh.belongsTo(models.theloai, { foreignKey: 'idtheloai', as :'theloai' })
    }
  }
  hanhtrinh.init({
    banner: DataTypes.STRING,
    idtheloai:DataTypes.INTEGER,
    tenchude: DataTypes.STRING,
    duongdanhanhtrinh: DataTypes.STRING,
    tencapdoi: DataTypes.STRING,
    mota: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'hanhtrinh',
  });
  return hanhtrinh;
};