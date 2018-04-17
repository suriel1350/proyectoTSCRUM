module.exports = (sequelize, DataTypes) => {
    const Member_project = sequelize.define('Member_projects', {
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER
        },
        member_id: {
            allowNull: false,
            type: DataTypes.STRING
        },
        project_id: {
            allowNull: false,
            type: DataTypes.INTEGER
        },
        project_role: {
            allowNull: false,
            type: DataTypes.TEXT
        }
    });

    return Member_project;
};