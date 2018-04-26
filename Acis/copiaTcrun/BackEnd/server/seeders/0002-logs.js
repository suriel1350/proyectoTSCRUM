'use_strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Logs', 
    [
      {
        query: 'CREATE project',
        member_id: 'a00000000',
        createdAt: Sequelize.fn('NOW'),
        updatedAt: Sequelize.fn('NOW')
      },
      {
        query: 'CREATE acceptance_criteria',
        member_id: 'a11111111',
        createdAt: Sequelize.fn('NOW'),
        updatedAt: Sequelize.fn('NOW')
      },
      {
        query: 'DELETE project',
        member_id: 'a00000000',
        createdAt: Sequelize.fn('NOW'),
        updatedAt: Sequelize.fn('NOW')
      },
      {
        query: 'UPDATE project',
        member_id: 'a22222222',
        createdAt: Sequelize.fn('NOW'),
        updatedAt: Sequelize.fn('NOW')
      },
      {
        query: 'CREATE sprint',
        member_id: 'a33333333',
        createdAt: Sequelize.fn('NOW'),
        updatedAt: Sequelize.fn('NOW')
      },
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Logs', 
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
