const {Comment} = require('../models')

module.exports = {

  async index (req, res) {
    try {
      // const {userId, postId} = req.body
      // const bookmarks = await SavedPost.findAll()
      console.log('alskdfjlaskjdf\n\n\n\n\n\n')
      console.log(req.query.postId)
      // const where = {
      //   userId: userId
      // }
      // if (postId) {
      //   where.postId = postId
      // }
      // console.log('postId\n\n\n\n\n\n\n')
      // console.log(where)
      const comments = await Comment.findAll({
        where: {
          postId: req.query.postId
        }
      })
      res.send(comments)
    } catch (err) {
      console.log('indexs errors', err)
      res.status(500).send({
        error: 'Error has occured trying to fetch bookmarks pOst'
      })
    }
  },
  async post (req, res) {
    try {
      console.log('\n\n\n\n\n\n\n\n\n\n\n\n')
      console.log(req.body)
      const comment = await Comment.create(req.body)
      res.send(comment.toJSON())
      console.log('comment.....\n\n\n\n\n\n\n\n\n\n\n\n')
      console.log(comment)
    } catch (err) {
      console.log('hey errors', err)
      res.status(400).send({
        error: 'There is a problem to create comment'
      })
    }
  },
  async delete (req, res) {
    console.log(req.body)
  }
}
