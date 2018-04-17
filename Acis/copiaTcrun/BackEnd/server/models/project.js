'use strict';
module.exports = (sequelize, DataTypes) => {
  var Project = sequelize.define('Project', {
    id:{
      allowNull: false,
      autoIncrement: true,
      primaryKey:true,
      type: DataTypes.INTEGER
    },
    vision: {
      allowNull: false,
      type: DataTypes.TEXT
    },
    name: {
      allowNull: false,
      type: DataTypes.TEXT
    },
    begin_date: {
      allowNull: false,
      type: DataTypes.DATE
    },
    end_date: {
      allowNull: false,
      type: DataTypes.DATE
    },
    background: {
      allowNull: false,
      type: DataTypes.TEXT
    },
    risks: {
      allowNull: false,
      type: DataTypes.TEXT
    },
    reach:{
      allowNull: false,
      type: DataTypes.TEXT
    }
  }, {});

  Project.associate = function (models) {

    Project.belongsTo(models.Member, {

      foreignKey: 'scrum_master_id',
      as: 'scrum_master',
      onDelete: 'CASCADE',
    }),

    Project.belongsToMany(models.Member, {
      through: 'Member_projects',
      foreignKey: 'project_id',
      //otherKey: 'member_id',
      as: 'members',
      onDelete: 'CASCADE',
    }),

    Project.hasMany(models.Sprint, {
      foreignKey: 'project_id',
      as: 'sprints',
      onDelete: 'Cascade'
    })

    Project.belongsToMany(models.Technology, {
      through: 'Project_technologies',
      foreignKey: 'project_id',
      //otherKey: 'technology_id'
      as: 'technologies',
      onDelete: 'CASCADE',
    })
  }

  return Project;
};