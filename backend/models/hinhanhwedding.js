'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class HinhanhWedding extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      HinhanhWedding.belongsTo(models.part, { foreignKey: 'idpart', as :'part' })

    }
  }
  HinhanhWedding.init({
    tenHinh: DataTypes.STRING,
    duongDan: DataTypes.STRING,
    provider: DataTypes.STRING,
    idpart: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'HinhanhWedding',
  });
  return HinhanhWedding;
};