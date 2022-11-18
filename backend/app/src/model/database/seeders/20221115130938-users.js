'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('users', [{
      username: 'admin',
      password: '$2b$10$kRZjgmY51Ye5rOlxzXY1iubPlZN6QModXqPphOHZVhWanPsaY0fWW',  /* senha='AdminAdmin10' */
      accountId: 1,
    },
  ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('users', null, {});
  }
};
