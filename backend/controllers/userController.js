const User = require('../models/user')
const bcrypt = require('bcrypt')
const { isUUID, isValidEmail, requireFields } = require('../helpers/')
const messages = require('../languages/pt-BR')
const saltRounds = 10

const create = async (req, res) => {
  try {
    const errors = requireFields(req.body, ['name', 'email', 'password'])

    if (Object.keys(errors).length > 0) {
      res.status(400).json({
        success: false,
        message: messages['user-create-empty-fields'],
        errors: errors,
      })
    } else if (!isValidEmail(req.body.email)) {
      res.status(400).json({
        success: false,
        message: messages['user-login-invalid_email'],
      })
    } else {
      const user = await User.findOne({ where: { email: req.body.email } })

      if (user !== null) {
        res.status(409).json({
          success: false,
          message: messages['user-create-duplicate'],
        })
      } else {
        bcrypt
          .hash(req.body.password, saltRounds)
          .then(async (hash) => {
            await User.create({
              name: req.body.name,
              email: req.body.email,
              password: hash,
            }).then((userCreated) => {
              res.status(201).send({
                success: true,
                message: messages['user-create'],
                user: {
                  id: userCreated.id,
                  name: userCreated.name,
                  email: userCreated.email,
                },
              })
            })
          })
          .catch((err) => {
            res.status(418).json({
              success: false,
              message: messages['user-error_password'],
            })
          })
      }
    }
  } catch (error) {
    res.status(500).send({
      success: false,
      message: error.message,
    })
  }
}

const get = async (req, res) => {
  let user
  if (isUUID(req.params.id)) {
    user = await User.findOne({ where: { id: req.params.id } })
  } else {
    user = await User.findOne({ where: { email: req.params.id } })
  }

  if (user == null) {
    res.status(404).json({
      success: false,
      message: messages['user-not_found'],
    })
  } else {
    res.status(200).json({
      success: true,
      message: messages['user-get'],
      user: user,
    })
  }
}

const update = async (req, res) => {

  if ((!req.body.email && !isValidEmail(req.body.email)) || !req.params.id) {
    res.status(405).json({
      success: false,
      message: messages['not_allowed'],
    })
  } else if (!isUUID(req.params.id)) {
    res.status(405).json({
      success: false,
      message: messages['not_allowed'],
    })
  } else {
    let user = await User.findOne({ where: { id: req.params.id } })
    let userUpdate = null

    if (user == null) {
      res.status(404).json({
        success: false,
        message: messages['user-not_found'],
      })
    } else {
      let pass = req.body.password

      if (pass && !/^ *$/.test(pass)) {
        if (pass.length > 0) {
          await bcrypt
            .hash(req.body.password, saltRounds)
            .then(async (hash) => {
              userUpdate = await User.update(
                {
                  name: req.body.name,
                  email: req.body.email,
                  password: hash,
                },
                {
                  where: {
                    id: user.id,
                  },
                  returning: true,
                }
              )
            })
            .catch((err) => {
              res.status(418).json({
                success: false,
                message: messages['user-error_password'],
              })
            })
        }
      } else {
        userUpdate = await User.update(
          {
            name: req.body.name,
            email: req.body.email,
          },
          {
            where: {
              id: user.id,
            },
            returning: true,
          }
        )
        await user.reload()
      }
      if (!userUpdate) {
        res.status(400).json({
          success: false,
          message: messages['user-update-error'],
        })
      } else {
        await user.reload()
        res.status(200).json({
          success: true,
          message: messages['user-update'],
          user: user,
        })
      }
    }
  }
}

const remove = async (req, res) => {
  let user

  if (!req.params.id && !req.body.email && !isValidEmail(req.body.email)) {
    res.status(405).json({
      success: false,
      message: messages['not_allowed'],
    })
  } else {
    if (isUUID(req.params.id)) {
      user = await User.findOne({ where: { id: req.params.id } })
    } else if(isValidEmail(req.params.id)) {
      user = await User.findOne({ where: { email: req.body.email } })
    }

    if (user == null) {
      res.status(404).json({
        success: false,
        message: messages['user-not_found'],
      })
    } else {
      await user.destroy()
      res.status(200).json({
        success: true,
        message: messages['user-delete'],
      })
    }
  }
}

const list = async (req, res) => {
  const users = await User.findAll({
    attributes: ['id', 'name', 'email', 'password'],
  })

  if (users === null) {
    res.status(404).json({
      success: false,
      message: messages['user-list-not_found'],
    })
  } else {
    res.status(200).json({
      success: true,
      message: messages['user-list'],
      users: users,
    })
  }
}

module.exports = {
  create,
  update,
  get,
  remove,
  list,
}
