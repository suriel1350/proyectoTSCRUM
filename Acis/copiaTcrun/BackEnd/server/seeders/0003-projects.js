'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Projects', 
      [
        {
          vision: 'Test vision',
          name: 'Test name',
          begin_date: '2018-01-01 01:01:01',
          end_date: '2019-01-01 01:01:01',
          background: 'Test background',
          risks: 'Test risks',
          reach: 'Test reach',
          createdAt: Sequelize.fn('NOW'),
          updatedAt: Sequelize.fn('NOW'),
          scrum_master_id: 'a00000000'
        },
        {
          vision: 'Test vision 2',
          name: 'Test name 2',
          begin_date: '2018-01-01 01:01:01',
          end_date: '2019-01-01 01:01:01',
          background: 'Test background 2',
          risks: 'Test risks 2',
          reach: 'Test reach 2',
          createdAt: Sequelize.fn('NOW'),
          updatedAt: Sequelize.fn('NOW'),
          scrum_master_id: 'a00000000'     
        },
        {
          vision: 'Test vision 3',
          name: 'Test name 3',
          begin_date: '2018-01-01 01:01:01',
          end_date: '2019-01-01 01:01:01',
          background: 'Test background 3',
          risks: 'Test risks 3',
          reach: 'Test reach 3',
          createdAt: Sequelize.fn('NOW'),
          updatedAt: Sequelize.fn('NOW'),
          scrum_master_id: 'a00000000'       
        },
        {
          vision: 'Test vision 4',
          name: 'Test name 4',
          begin_date: '2018-01-01 01:01:01',
          end_date: '2019-01-01 01:01:01',
          background: 'Test background 4',
          risks: 'Test risks 4',
          reach: 'Test reach 4',
          createdAt: Sequelize.fn('NOW'),
          updatedAt: Sequelize.fn('NOW'),
          scrum_master_id: 'a00000000'       
        },
        {
          vision: 'Test vision 5',
          name: 'Test name 5',
          begin_date: '2018-01-01 01:01:01',
          end_date: '2019-01-01 01:01:01',
          background: 'Test background 5',
          risks: 'Test risks 5',
          reach: 'Test reach 5',
          createdAt: Sequelize.fn('NOW'),
          updatedAt: Sequelize.fn('NOW'),
          scrum_master_id: 'a00000000'       
        }
      ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Projects', 
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
        }
      ]);
  }
};
