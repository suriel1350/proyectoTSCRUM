'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('User_stories', 
    [
      {
        weight: 10,
        scrum_board_status: 1,
        description: 'Description of the story...',
        priority: 5,
        sprint_id: 1,
        createdAt: Sequelize.fn('NOW'),
        updatedAt: Sequelize.fn('NOW')
      },
      {
        weight: 7,
        scrum_board_status: 0,
        description: 'Description of the story...',
        priority: 4,
        sprint_id: 2,
        createdAt: Sequelize.fn('NOW'),
        updatedAt: Sequelize.fn('NOW')
      },
      {
        weight: 3,
        scrum_board_status: 1,
        description: 'Description of the story...',
        priority: 2,
        sprint_id: 3,
        createdAt: Sequelize.fn('NOW'),
        updatedAt: Sequelize.fn('NOW')
      },
      {
        weight: 7,
        scrum_board_status: 1,
        description: 'Description of the story...',
        priority: 9,
        sprint_id: 4,
        createdAt: Sequelize.fn('NOW'),
        updatedAt: Sequelize.fn('NOW')
      },
      {
        weight: 10,
        scrum_board_status: 0,
        description: 'Description of the story...',
        priority: 9,
        sprint_id: 5,
        createdAt: Sequelize.fn('NOW'),
        updatedAt: Sequelize.fn('NOW')
      }
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('User_stories', 
    [
      {
        id: 1
      },
      {
        id:2
      },
      {
        id:3
      },
      {
        id:4
      },
      {
        id:5
      }
    ], {});
  }
};
