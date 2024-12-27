const User = require('../models/user')
const bcrypt = require('bcrypt')
const isUUID = require('../helpers/checkUUID')

const saltRounds = 10

const create = async (req, res) => {
  const user = await User.findOne({ where: { email: req.body.email } })
  if (user !== null) {
    res.status(409).json({
      message: 'Email já registrado',
    })
  } else {
    bcrypt
      .hash(req.body.password, saltRounds)
      .then(async (hash) => {
        if (req.body.password.length == 0) {
          throw new Error('Senha não pode estar vazia')
        }
        await User.create({
          name: req.body.name,
          email: req.body.email,
          password: hash,
        }).then((resultCreate) => {
          res.status(201).json({
            user: {
              name: resultCreate.name,
              email: resultCreate.email,
              id: resultCreate.id,
            },
            message: 'Usuário criado',
          })
        })
      })
      .catch((err) => {
        console.error(err.message)
        res.status(418).json({
          message: 'Erro ao gerar a senha',
        })
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
      message: 'Usuário não encontrado',
    })
  } else {
    res.status(200).json({
      user: user,
      message: 'Usuário retornado',
    })
  }
}

const update = async (req, res) => {
  let user

  user = await User.findOne({ where: { email: req.body.email } })
  let userUpdate = null

  if (user == null) {
    res.status(404).json({
      message: 'Usuário não encontrado',
    })
  } else {
    if (req.body.password !== null && req.body.password.length > 0) {
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
          console.error(err.message)
          res.status(418).json({
            message: 'Erro ao gerar a senha',
          })
        })
    } else {
      userUpdate = await User.update(
        {
          name: req.body.name,
          email: req.body.new_email,
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
        message: 'Erro ao atualizar usuário',
      })
    } else {
      await user.reload()
      res.status(200).json({
        user: user,
        message: 'Usuário atualizado',
      })
    }
  }
}

const remove = async (req, res) => {
  var user

  user = await User.findOne({ where: { email: req.body.email } })

  if (user === null) {
    res.status(404).json({
      message: 'Usuário não encontrado',
    })
  } else {
    await user.destroy()
    res.status(200).json({
      message: 'Usuário removido',
    })
  }
}

const list = async (req, res) => {
  const users = await User.findAll({
    attributes: ['id', 'name', 'email', 'password'],
  })

  if (users === null) {
    res.status(404).json({
      message: 'Usuários não foram encontrados',
    })
  } else {
    res.status(200).json({
      users: users,
      message: 'Usuários retornados',
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
