'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Subscription extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Subscription.init({
    id_user: {
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
    id_vacancy: {
      type: DataTypes.INTEGER,
      references: {
        model: {
          tableName: 'Vacancies',
          schema: 'public',
        },
        key: 'id',
      },
      allowNull: false,
    },
  }, {
    sequelize,
    modelName: 'Subscription',
  });
  return Subscription;
};