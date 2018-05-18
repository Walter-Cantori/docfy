module.exports = {
  up: (queryInterface, DataTypes) => {
    return [
      queryInterface.addColumn(
        'Projects',
        'createdAt',
        {
          allowNull: false,
          type: DataTypes.DATE,
        },
      ),
      queryInterface.addColumn(
        'Projects',
        'updatedAt',
        {
          allowNull: false,
          type: DataTypes.DATE,
        },
      ),
    ];
  },

  down: (queryInterface) => {
    return [
      queryInterface.removeColumn('Projects', 'createdAt'),
      queryInterface.removeColumn('Projects', 'updatedAt'),
    ];
  },
};
