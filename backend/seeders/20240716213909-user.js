'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Users', [
      {
        name: 'John Doe',
        email: 'john@email.com',
        password: '123456',
      },
      {
        name: 'Jane Doe',
        email: 'jane@email.com',
        password: '654321',
      },
    ])
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Users', null, {})
  },
}
