module.exports = (sequelize, DataTypes) => {
  const Document = sequelize.define('Document', {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    content: {
      type: DataTypes.TEXT,
    },
  });

  Document.associate = (models) => {
    Document.belongsTo(models.Project);
  };

  return Document;
};
