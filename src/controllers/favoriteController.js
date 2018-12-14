const {Favorite} = require('../models')

module.exports = {
  async post (req, res) {
    try {
      const newFavorite = await Favorite.create({
        UserId: req.body.UserId,
        PostId: req.body.PostId
      })
      console.log('req.body.userId\n\n\n\n\nn\n\n')
      // console.log(req.body.PostId)
      // console.log(req.body.UserId)
      // console.log('newFavorite')
      // console.log(newFavorite)
      res.send(newFavorite)
    } catch (err) {
      console.log('pst errors', err)
      res.status(400).send({
        error: 'Error has occured trying to create Favorite'
      })
    }
  },
  async index (req, res) {
    try {
      const {userId, postId} = req.query
      const fav = await Favorite.findOne({
        where: {
          UserId: userId,
          PostId: postId
        }
      })
      // console.log(postId)
      // console.log(userId)
      // console.log('all favorite data\n\n\n\n\n\n\n\n')
      // console.log(fav)
      res.send(fav)
    } catch (err) {
      console.log(err)
      res.status(400).send({
        error: 'Problem is occured when try to creat favorite'
      })
    }
  },
  async delete (req, res) {
    try {
      const {favoriteId} = req.params
      console.log('parameter request\n\n\n\n\nn\n')
      console.log(req.params)
      const fav = await Favorite.findById(favoriteId)
      await fav.destroy()
      res.send(fav)
    } catch (err) {
      console.log(err)
      res.status(400).send({
        error: 'Problem is occured when try to creat favorite'
      })
    }
  }
}
