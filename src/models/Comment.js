module.exports = (sequelize, DataTypes) => sequelize.define('Comment', {
  userId: DataTypes.STRING,
  postId: DataTypes.STRING,
  postComment: DataTypes.TEXT,
  username: DataTypes.TEXT
})
