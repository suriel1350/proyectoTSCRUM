'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {

    return queryInterface.bulkInsert('Project_technologies', [
    {
      project_id: 1,
      technology_id: 1,
      version: "1.0",
      createdAt: Sequelize.fn('NOW'),
      updatedAt: Sequelize.fn('NOW')
    },
    {
      project_id: 2,
      technology_id: 2,
      version: "1.0",
      createdAt: Sequelize.fn('NOW'),
      updatedAt: Sequelize.fn('NOW')
    },
    {
      project_id: 3,
      technology_id: 3,
      version: "1.0",
      createdAt: Sequelize.fn('NOW'),
      updatedAt: Sequelize.fn('NOW')
    },
    {
      project_id: 4,
      technology_id: 3,
      version: "1.0",
      createdAt: Sequelize.fn('NOW'),
      updatedAt: Sequelize.fn('NOW')
    },
    {
      project_id: 5,
      technology_id: 2,
      version: "1.0",
      createdAt: Sequelize.fn('NOW'),
      updatedAt: Sequelize.fn('NOW')
    }
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Project_technologies', [{
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
