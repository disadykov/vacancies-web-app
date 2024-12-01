'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Subscriptions', [
      {
        id_user: 1,
        id_vacancy: 1,
      },
      {
        id_user: 1,
        id_vacancy: 2,
      },
      {
        id_user: 1,
        id_vacancy: 3,
      }

    ], {});
  },

  async down (queryInterface, Sequelize) {

     await queryInterface.bulkDelete('Subscriptions', null, {});

  }
};
