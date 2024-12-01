'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Users', [
      {
        userName: 'celestac',
        password: 'celestac',
        isCompany: false,
        companyName: null,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userName: 'celestac-company',
        password: 'celestac-company',
        isCompany: true,
        companyName: 'Company by CELESTAC',
        createdAt: new Date(),
        updatedAt: new Date(),

      }
    ], {});

  },

  async down (queryInterface, Sequelize) {

    await queryInterface.bulkDelete('Users', null, {});

  }
};
