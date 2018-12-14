// module.exports = (sequelize, DataTypes) => sequelize.define('SavedPost', {
//   UserId: DataTypes.STRING,
//   PostId: DataTypes.STRING
// })

module.exports = (sequelize, DataTypes) => {
  const Bookmark = sequelize.define('SavedPost', {})

  Bookmark.associate = function (models) {
    Bookmark.belongsTo(models.User)
    Bookmark.belongsTo(models.Post)
  }

  return Bookmark
}
