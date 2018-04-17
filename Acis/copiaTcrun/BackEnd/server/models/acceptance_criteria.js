module.exports = (sequelize, DataTypes) => {
  const Acceptance_criteria = sequelize.define('Acceptance_criteria', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    type: {
      type: DataTypes.STRING,
      allowNull: false
    },
    user_story_id: {
      allowNull : false,
      type: DataTypes.INTEGER,
      onDelete: 'CASCADE',
      references: {
        model: 'User_story',
        key: 'id',
        as: 'user_story_id',
      }
    },
    createdAt: {
      allowNull: false,
      type: DataTypes.DATE
    },
    updatedAt: {
      allowNull: false,
      type: DataTypes.DATE
    }
  }, {});

  Acceptance_criteria.associate = function(models) {
    Acceptance_criteria.belongsTo (models.User_story, {
      foreignKey: 'user_story_id', 
      onDelete: 'CASCADE',
      as: 'user_story',
    });
  };
  return Acceptance_criteria;
};