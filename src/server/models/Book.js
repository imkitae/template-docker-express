module.exports = (sequelize, DataTypes) => (
  sequelize.define('Book', {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    author: DataTypes.STRING,
  }, {
    tableName: 'tb_books',
  })
)
