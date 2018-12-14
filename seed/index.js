
const {sequelize, Post, User} = require('../src/models')
const Promise = require('bluebird')
const posts = require('./posts.json')
const users = require('./users.json')
// const bookmarks = require('./bookmarks.json')

sequelize.sync({force: true})
  .then(async function () {
    await Promise.all(
      users.map(user => {
        User.create(user)
      })
    )
    await Promise.all(
      posts.map(post => {
        Post.create(post)
      })
    )
    // await Promise.all(
    //   bookmarks.map(bookmark => {
    //     SavedPost.create(bookmark)
    //   })
    // )
  })
