module.exports = (sequelize, DataTypes) => {
  const User_story = sequelize.define('User_story', {

    id: {

      allowNull: false,
      autoIncrement: true,
      primaryKey:true,
      type: DataTypes.INTEGER
    },
    weight: {

      type: DataTypes.INTEGER,
      allowNull: false,
    },
    scrum_board_status: {

      type: DataTypes.INTEGER,
      allowNull: false,
    },
    description: {

      type: DataTypes.TEXT,
      allowNull: false,
    },
    priority: {

      type: DataTypes.INTEGER,
      allowNull: false,
    }
  });

  
//Relation between User_story and Sprint
  User_story.associate = function (models) {
    
    User_story.belongsTo(models.Sprint, {
      foreignKey: {name: 'sprint_id', allowNull: false},
      onDelete: 'CASCADE',
      as: 'sprint'
    }),
    User_story.hasMany(models.Acceptance_criteria, {
      foreignKey: {name: 'user_story_id', allowNull: false}, //Is this the foreign key??
      onDelete: 'CASCADE',
    }),
    User_story.hasMany(models.Task, {
      foreignKey: {name: 'user_story_id', allowNull: false}, //Is this the foreign key??
      onDelete: 'CASCADE',
      as: 'Tasks'
    })
};
return User_story;
};

