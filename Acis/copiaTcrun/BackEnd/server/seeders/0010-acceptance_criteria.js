'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Acceptance_criteria', [{
      name: 'Criterion 1',
      type: 'Ac type 1',
      user_story_id: 1,
      createdAt: Sequelize.fn('NOW'),
      updatedAt: Sequelize.fn('NOW')
    },
    {
      name: 'Criterion 2',
      type: 'Ac type 2',
      user_story_id: 2,
      createdAt: Sequelize.fn('NOW'),
      updatedAt: Sequelize.fn('NOW')
    },
    {
      name: 'Completion',
      type: 'Delivery',
      user_story_id: 3,
      createdAt: Sequelize.fn('NOW'),
      updatedAt: Sequelize.fn('NOW')
    },
    {
      name: 'Easy to read',
      type: 'Aesthetics',
      user_story_id: 4,
      createdAt: Sequelize.fn('NOW'),
      updatedAt: Sequelize.fn('NOW')
    },
    {
      name: 'Original',
      type: 'Legal',
      user_story_id: 5,
      createdAt: Sequelize.fn('NOW'),
      updatedAt: Sequelize.fn('NOW')
    }], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Acceptance_criteria', [{
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
    }]);
  }
};