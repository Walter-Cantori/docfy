module.exports = (sequelize, DataTypes) => {
  const Project = sequelize.define('Project', {
    title: {
      allowNull: false,
      type: DataTypes.STRING,
    },
  });

  Project.associate = (models) => {
    Project.belongsTo(models.User);
    Project.hasMany(models.Document)
  };

  return Project;
};
