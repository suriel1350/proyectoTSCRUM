'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {

    return queryInterface.bulkInsert('Sprints',

      [{
          days: 1,
          comment: 'Test comment',
          project_id: 1,
          createdAt: Sequelize.fn('NOW'),
          updatedAt: Sequelize.fn('NOW')
        },

        {
          days: 2,
          comment: 'Test comment',
          project_id: 2,
          createdAt: Sequelize.fn('NOW'),
          updatedAt: Sequelize.fn('NOW')
        },

        {
          days: 3,
          comment: 'Test comment',
          project_id: 3,
          createdAt: Sequelize.fn('NOW'),
          updatedAt: Sequelize.fn('NOW')
        },

        {
          days: 4,
          comment: 'Test comment',
          project_id: 4,
          createdAt: Sequelize.fn('NOW'),
          updatedAt: Sequelize.fn('NOW')
        },

        {
          days: 5,
          comment: 'Test comment',
          project_id: 5,
          createdAt: Sequelize.fn('NOW'),
          updatedAt: Sequelize.fn('NOW')
        }
      ], {});
  },

  down: (queryInterface, Sequelize) => {

    return queryInterface.bulkDelete('Sprints', 
    [
      {
        id: 1
      },
      {
        id: 2
      },
      {
        id: 3
      },
      {
        id: 4
      },
      {
        id: 5
      },

    ]);
  }
};
