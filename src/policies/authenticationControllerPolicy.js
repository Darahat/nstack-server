const Joi = require('joi')

module.exports = {
  register (req, res, next) {
    const schema = {
      email: Joi.string().email(),
      password: Joi.string().regex(
        new RegExp('^[a-zA-Z0-9]{8,32}$')
      ),
      username: Joi.string().regex(
        new RegExp('^[a-zA-Z0-9]{2,32}$')
      )
    }
    const {error} = Joi.validate(req.body, schema)
    if (error) {
      switch (error.details[0].context.key) {
        case 'email':
          res.status(400).send({
            error: 'You must provide a valid email address'
          })
          break
        case 'password':
          res.status(400).send({
            error: `The password provided is failed to following rules:
            <br/>
            1.It must contain ONLY the following caracters: lowercase,uppercase,numbers
            2.It must be  at least 2 caracters in length and not greater than 32 caracters
            `
          })
          break
        case 'username':
          res.status(400).send({
            error: `The username provided is failed to following rules:
            <br/>
            1.It must contain ONLY the following caracters: lowercase,uppercase,numbers
            2.It must be  at least 8 caracters in length and not greater than 32 caracters
            `
          })
          break
        default:
          res.status(400).send({
            error: 'Invalid registration information'
          })
      }
    } else {
      next()
    }
  }
}
