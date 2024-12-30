//require('dotenv').config()

const { development } = require('./config')

const Sequelize = require('sequelize')
const sequelize = new Sequelize(
  development.database,
  development.username,
  development.password,
  { dialect: development.dialect, host: development.host, logging: false }
)

module.exports = sequelize
