'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class part extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      part.belongsTo(models.wedding, { foreignKey: 'idwedding' , as :'wedding' })
      part.hasMany(models.HinhanhWedding, { foreignKey: 'idpart' , as :'HinhanhWedding' })


    }
  }
  part.init({
    idwedding: DataTypes.INTEGER,
    bocuc: DataTypes.STRING,
    noidung: DataTypes.STRING,
    tieudephu: DataTypes.STRING,
    stt :  DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'part',
  });
  return part;
};