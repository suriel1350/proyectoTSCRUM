module.exports = (sequelize, DataTypes) => {
  const Log = sequelize.define('Log', {
    query: {
      type: DataTypes.STRING,
      allowNull: false
    },
  }, {});

  Log.associate = (models) => {
    // associations can be defined here
    Log.belongsTo(models.Member, {
      foreignKey: 'member_id',
      onDelete: 'CASCADE',
      as: 'member'
    });
  };

  return Log;
};