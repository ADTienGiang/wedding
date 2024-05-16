'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class wedding extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // wedding.belongsTo(models.DanhMucs, { foreignKey: 'maDanhMuc', as :'DanhMuc' })
      wedding.hasMany(models.part, { foreignKey: 'idwedding' , as :'part'});
    }
  }
  wedding.init({
    banner: DataTypes.STRING,
    tieude: DataTypes.STRING,
    capdoi: DataTypes.STRING,
    quoctich: DataTypes.STRING,
    ytuong: DataTypes.STRING,
    soluongkhach: DataTypes.STRING,
    diadiem: DataTypes.STRING,
    duongdan: DataTypes.STRING,
    theloai: DataTypes.STRING,
    trangthaihienthi: DataTypes.BOOLEAN,
  }, {
    sequelize,
    modelName: 'wedding',
  });
  return wedding;
};