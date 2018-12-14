const {Post} = require('../models')
module.exports = {
  async post (req, res) {
    try {
      const post = await Post.create(req.body)
      res.send(post.toJSON())
    } catch (err) {
      console.log('hey errors', err)
      res.status(400).send({
        error: 'Error has occured trying to create new post'
      })
    }
  },
  async put (req, res) {
    try {
      await Post.update(req.body, {
        where: {
          id: req.params.postId
        }
      })
      res.send(req.body)
    } catch (err) {
      console.log('hey errors', err)
      res.status(400).send({
        error: 'Error has occured trying to create new post'
      })
    }
  },
  async index (req, res) {
    try {
      let post = null
      const search = req.query.search
      if (search) {
        post = await Post.findAll({
          where: {
            $or: [
              'title', 'description', 'tags'
            ].map(key => ({
              [key]: {
                $like: `%${search}%`
              }
            })
            )
          }
        })
      } else {
        post = await Post.findAll({
          limit: 10
        })
      }
      res.send(post)
    } catch (err) {
      console.log('hey errors', err)
      res.status(400).send({
        error: 'Error has occured trying to fetch posts'
      })
    }
  },
  async show (req, res) {
    try {
      const post = await Post.findById(req.params.postId)
      res.send(post)
    } catch (err) {
      console.log('hey errors', err)
      res.status(400).send({
        error: 'Error has occured trying to fetch posts'
      })
    }
  },
  async showUserId (req, res) {
    try {
      const post = await Post.findById(req.params.userId)
      res.send(post)
    } catch (err) {
      console.log('hey errors', err)
      res.status(400).send({
        error: 'Error has occured trying to fetch posts'
      })
    }
  },
  async getPostByUserId (req, res) {
    try {
      let post = null
      const userId = req.query.userId
      if (userId) {
        post = await Post.findAll({
          where: {
            userId: userId
          }
        })
      } else {
        post = await Post.findAll({
          limit: 10
        })
      }
      res.send(post)
    } catch (err) {
      console.log('hey errors', err)
      res.status(400).send({
        error: 'Error has occured trying to fetch posts'
      })
    }
  }
}
