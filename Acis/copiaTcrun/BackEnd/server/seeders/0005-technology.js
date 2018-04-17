'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {

    return queryInterface.bulkInsert('Technologies',
      [
        {
          name: 'JAVA',
          createdAt: Sequelize.fn('NOW'),
          updatedAt: Sequelize.fn('NOW')
        },
        {
          name: 'JAVASCRIPT',
          createdAt: Sequelize.fn('NOW'),
          updatedAt: Sequelize.fn('NOW')
        },
        {
          name: 'HTML',
          createdAt: Sequelize.fn('NOW'),
          updatedAt: Sequelize.fn('NOW')
        }
      ], {});
  },

  down: (queryInterface, Sequelize) => {

    return queryInterface.bulkDelete('Technologies', 
    [
      {
        id: "1"
      },
      {
        id: "2"
      },
      {
        id: "3"
      }
    ]);
  }
};