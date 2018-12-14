const {User} = require('../models')
module.exports = {
  async index (req, res) {
    try {
      const user = await User.findAll({
        limit: 10
      })
      res.send(user)
    } catch (err) {
      console.log('hey errors', err)
      res.status(400).send({
        error: 'Error has occured trying to fetch users'
      })
    }
  },
  async show (req, res) {
    try {
      const user = await User.findById(req.params.userId)
      res.send(user)
    } catch (err) {
      console.log('hey errors', err)
      res.status(400).send({
        error: 'Error has occured trying to fetch user'
      })
    }
  }
}
