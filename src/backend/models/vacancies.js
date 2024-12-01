'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Vacancies extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Vacancies.init({
    title: DataTypes.STRING,
    description: DataTypes.TEXT,
    englishLvl: DataTypes.STRING,
    grade: DataTypes.STRING,
    tags: DataTypes.STRING,
    isActive: DataTypes.BOOLEAN,
    owner_id: {
      type: DataTypes.INTEGER,
      references: {
        model: {
          tableName: 'Users',
          schema: 'public',
        },
        key: 'id',
      },
      allowNull: false,
    },
  }, {
    sequelize,
    modelName: 'Vacancies',
  });
  return Vacancies;
};