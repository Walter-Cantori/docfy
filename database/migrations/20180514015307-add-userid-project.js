module.exports = {
  up: (queryInterface, DataTypes) => {
    queryInterface.addColumn(
      'Projects',
      'UserId',
      {
        allowNull: false,
        type: DataTypes.INTEGER,
        references: { model: 'Users', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
    );
  },

  down: (queryInterface) => {
    queryInterface.removeColumn('Projects', 'UserId');
  },
};
