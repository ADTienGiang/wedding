'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class partaboutimg extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      partaboutimg.belongsTo(models.partabout, { foreignKey: 'partaboutid' , as :'partabout' })

    }
  }
  partaboutimg.init({
    partaboutid : DataTypes.INTEGER,
    duongDan: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'partaboutimg',
  });
  return partaboutimg;
};