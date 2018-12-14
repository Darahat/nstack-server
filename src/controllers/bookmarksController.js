const {SavedPost, Post} = require('../models')
const _ = require('lodash')
module.exports = {
  async index (req, res) {
    try {
      const userId = req.user.id
      const {postId} = req.query
      // const bookmarks = await SavedPost.findAll()
      console.log('alskdfjlaskjdf\n\n\n\n\n\n')
      console.log(req.user.id)
      const where = {
        UserId: userId
      }
      if (postId) {
        where.PostId = postId
      }
      // console.log('postId\n\n\n\n\n\n\n')
      // console.log(where)
      const bookmarks = await SavedPost.findAll({
        where: where,
        include: [
          {
            model: Post
          }
        ]
      })
        .map(bookmark => bookmark.toJSON())
        .map(bookmark => _.extend({}, bookmark.Post, bookmark))
      // console.log(bookmark)
      res.send(bookmarks)
    } catch (err) {
      console.log('indexs errors', err)
      res.status(500).send({
        error: 'Error has occured trying to fetch bookmarks pOst'
      })
    }
  },
  // async indexShow (req, res) {
  //   try {
  //     const {userId, postId} = req.query
  //     console.log('req.query......................\n\n\n\n\n\n\n')
  //     console.log(req.query)
  //     // const bookmarks = await SavedPost.findAll()

  //     const bookmarks = await SavedPost.findAll({
  //       where: {
  //         UserId: userId,
  //         PostId: postId
  //       }
  //     })
  //     console.log('bookmarksssss \n\n\n\n\n\n\n\n\n')
  //     console.log(bookmarks)
  //     res.send(bookmarks)
  //   } catch (err) {
  //     console.log('indexs errors', err)
  //     res.status(500).send({
  //       error: 'Error has occured trying to fetch bookmarks pOst'
  //     })
  //   }
  // },
  async  delete (req, res) {
    try {
      const userId = req.user.id
      const {bookmarkId} = req.params
      const bookmark = await SavedPost.findOne({
        where: {
          UserId: userId,
          id: bookmarkId
        }
      })
      if (!bookmark) {
        return res.status(403).send({
          error: 'you do not have access to this bookmark'
        })
      }
      console.log('sdfsdafasdfsadfsadf')
      console.log(req.params)
      await bookmark.destroy()
      res.send(bookmark)
    } catch (err) {
      console.log('delete errors', err)
      res.status(400).send({
        error: 'Error has occured trying to delete bookmarks'
      })
    }
  },
  async post (req, res) {
    console.log(req.body)
    console.log(req.body)
    const userId = req.user.id
    const {postId} = req.body
    try {
      const bookmark = await SavedPost.findOne({
        where: {
          PostId: postId,
          UserId: userId
        }
      })
      console.log('newBookmark\n\n\n\n\n\n\n\n\\n\n')
      console.log(postId)
      if (bookmark) {
        return res.status(400).send({
          error: 'you already have this set as a bookmark'
        })
      }
      const newBookmark = await SavedPost.create({
        UserId: userId,
        PostId: postId
      })
      res.send(newBookmark)
    } catch (err) {
      console.log('pst errors', err)
      res.status(400).send({
        error: 'Error has occured trying to create bookmark'
      })
    }
  }
}
