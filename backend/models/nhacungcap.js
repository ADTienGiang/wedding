'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class nhacungcap extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      nhacungcap.belongsTo(models.hanhtrinh, { foreignKey: 'idhanhtrinh', as :'hanhtrinh' })

    }
  }
  nhacungcap.init({
    nhacungcap: DataTypes.STRING,
    tennhacung: DataTypes.STRING,
    linksocialnhacungcap: DataTypes.STRING,
    idhanhtrinh: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'nhacungcap',
  });
  return nhacungcap;
};