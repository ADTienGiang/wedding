'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class partabout extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      partabout.belongsTo(models.about, { foreignKey: 'idabout' , as :'about' })
      partabout.hasMany(models.partaboutimg, { foreignKey: 'partaboutid' , as :'partaboutimg' })
    }
  }
  partabout.init({
    idabout : DataTypes.INTEGER,
    tieudephu: DataTypes.STRING,
    noidung: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'partabout',
  });
  return partabout;
};