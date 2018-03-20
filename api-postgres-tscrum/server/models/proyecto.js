module.exports = (sequelize, DataTypes) => {
  const Proyecto = sequelize.define('Proyecto', {
    nombre: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    vision: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    background: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    riesgos: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    alcance: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    fechainicio: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    fechafinal: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  Proyecto.associate = (models) => {
    Proyecto.belongsTo(models.Miembros, {
      foreignKey: 'idmiembros',
      onDelete: 'CASCADE',
    });
  };

  return Proyecto;
};