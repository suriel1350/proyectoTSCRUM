module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Acceptance_criteria', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      type: {
        type: Sequelize.STRING,
        allowNull: false
      },
      user_story_id: {
        allowNull : false,
        type: Sequelize.INTEGER,
        onDelete: 'CASCADE',
        references: {
          model: 'User_stories',
          key: 'id',
          as: 'user_story_id',
        }
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Acceptance_criteria');
  }
};