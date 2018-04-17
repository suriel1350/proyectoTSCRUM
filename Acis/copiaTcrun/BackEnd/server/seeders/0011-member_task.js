'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {

    return queryInterface.bulkInsert('Member_tasks', [{
        member_id: "a00000000",
        task_id: 1,
        createdAt: Sequelize.fn('NOW'),
        updatedAt: Sequelize.fn('NOW')
      },
      {
        member_id: "a00000000",
        task_id: 2,
        createdAt: Sequelize.fn('NOW'),
        updatedAt: Sequelize.fn('NOW')
      },
      {
        member_id: "a11111111",
        task_id: 3,
        createdAt: Sequelize.fn('NOW'),
        updatedAt: Sequelize.fn('NOW')
      },
      {
        member_id: "a00000000",
        task_id: 4,
        createdAt: Sequelize.fn('NOW'),
        updatedAt: Sequelize.fn('NOW')
      },
      {
        member_id: "a33333333",
        task_id: 5,
        createdAt: Sequelize.fn('NOW'),
        updatedAt: Sequelize.fn('NOW')
      }

    ], {});
  },

  down: (queryInterface, Sequelize) => {

    return queryInterface.bulkDelete('Member_tasks', [{
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