'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
    }
  }
  User.init({
    userName: DataTypes.STRING,
    password: DataTypes.STRING,
    isCompany: DataTypes.BOOLEAN,
    companyName: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};