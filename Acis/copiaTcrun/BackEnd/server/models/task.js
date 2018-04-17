'use strict';
module.exports = (sequelize, DataTypes) => {
  var Task = sequelize.define('Task', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    duration: {
      type: DataTypes.INTEGER,
    },
    name: {
      type: DataTypes.TEXT,
    },
    completed: {
      type: DataTypes.BOOLEAN,
    },
    user_story_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      onDelete: 'CASCADE',
    },
  }, {});

  Task.associate = function(models) {
    Task.belongsTo (models.User_story, {
      foreignKey: 'user_story_id', 
      onDelete: 'CASCADE',
      as: "user_story"
    });

    Task.belongsToMany(models.Member, {
      through: 'Member_tasks', 
      foreignKey: 'task_id', 
      otherKey: 'member_id',
      as: 'members'
    });
  };
  return Task;
};