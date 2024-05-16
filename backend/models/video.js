'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class video extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  video.init({
    banner: DataTypes.STRING,
    tieude: DataTypes.STRING,
    tencapdoi: DataTypes.STRING,
    linkyt: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'video',
  });
  return video;
};