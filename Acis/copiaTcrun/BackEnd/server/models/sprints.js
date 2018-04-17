//'use strict';
module.exports = (sequelize, DataTypes) => {

	var Sprint = sequelize.define('Sprint', {
		id: {
			allowNull: false,
			autoIncrement: true,
			primaryKey: true,
			type: DataTypes.INTEGER
		},

		days: {
			type: DataTypes.INTEGER
		},

		comment: {
			allowNull: true,
			type: DataTypes.TEXT
		},

		project_id: {
			allowNull: false,
			type: DataTypes.INTEGER,
			onDelete: 'CASCADE',
		},
	}, {});

	Sprint.associate = function (models) {
		Sprint.hasMany(models.User_story, {
			foreignKey: 'sprint_id',
			as: 'user_stories',
			onDelete: 'CASCADE'
		});

		Sprint.belongsTo (models.Project, {
			foreignKey: 'project_id',
			onDelete: 'CASCADE',
			as: 'project'
		  });
	};

	return Sprint;
};