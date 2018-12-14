module.exports = (sequelize, DataTypes) => {
  const Post = sequelize.define('Post', {
    title: DataTypes.STRING,
    description: DataTypes.TEXT,
    imgurl: DataTypes.STRING,
    tags: DataTypes.STRING,
    userId: DataTypes.INTEGER
  })
  return Post
}
