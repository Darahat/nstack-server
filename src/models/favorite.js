module.exports = (sequelize, DataTypes) => sequelize.define('Favorite', {
  UserId: DataTypes.STRING,
  PostId: DataTypes.STRING
})
