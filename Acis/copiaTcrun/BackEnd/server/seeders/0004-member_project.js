'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {

    return queryInterface.bulkInsert('Member_projects', [{
        member_id: "a00000000",
        project_id: 1,
        project_role: 'scrum_master',
        createdAt: Sequelize.fn('NOW'),
        updatedAt: Sequelize.fn('NOW')
      },
      {
        member_id: "a00000000",
        project_id: 2,
        project_role: 'scrum_master',
        createdAt: Sequelize.fn('NOW'),
        updatedAt: Sequelize.fn('NOW')
      },
      {
        member_id: "a00000000",
        project_id: 3,
        project_role: 'scrum_master',
        createdAt: Sequelize.fn('NOW'),
        updatedAt: Sequelize.fn('NOW')
      },
      {
        member_id: "a00000000",
        project_id: 4,
        project_role: 'scrum_master',
        createdAt: Sequelize.fn('NOW'),
        updatedAt: Sequelize.fn('NOW')
      },
      {
        member_id: "a00000000",
        project_id: 5,
        project_role: 'scrum_master',
        createdAt: Sequelize.fn('NOW'),
        updatedAt: Sequelize.fn('NOW')
      },
      {
        member_id: "a11111111",
        project_id: 2,
        project_role: 'product_owner',
        createdAt: Sequelize.fn('NOW'),
        updatedAt: Sequelize.fn('NOW')
      },
      {
        member_id: "a22222222",
        project_id: 3,
        project_role: 'developer',
        createdAt: Sequelize.fn('NOW'),
        updatedAt: Sequelize.fn('NOW')
      },
    ], {});
  },

  down: (queryInterface, Sequelize) => {

    return queryInterface.bulkDelete('Member_projects', [{
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
      {
        id: 6
      },
      {
        id: 7
      },
    ]);
  }
};