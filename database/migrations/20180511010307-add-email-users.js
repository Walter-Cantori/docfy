module.exports = {
  up: (queryInterface, DataTypes) => {
    queryInterface.addColumn(
      'Users',
      'email',
      {
        allowNull: false,
        type: DataTypes.STRING,
      },
    );
  },

  down: (queryInterface) => {
    queryInterface.removeColumn('Users', 'email');
  },
};
