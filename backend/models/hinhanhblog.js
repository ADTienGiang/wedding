'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class hinhanhblog extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      hinhanhblog.belongsTo(models.chitietblog, { foreignKey: 'idchitietblog', as :'chitietblog' })

    }
  }
  hinhanhblog.init({
    duongDan: DataTypes.STRING,
    idchitietblog: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'hinhanhblog',
  });
  return hinhanhblog;
};