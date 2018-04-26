'use strict';
module.exports = (sequelize, DataTypes) => {
  var Project_technology = sequelize.define('Project_technologies', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
  },
    project_id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.INTEGER
  },
    technology_id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.INTEGER
  },
    version: {
      allowNull: false,
      type: DataTypes.TEXT
  },
  }, {});

  return Project_technology;
};