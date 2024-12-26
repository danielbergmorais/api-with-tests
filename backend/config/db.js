//require('dotenv').config()

const { development } = require('./config')

const Sequelize = require('sequelize')
//const sequelize = new Sequelize( process.env.DB_NAME, process.env.DB_USER, process.env.DB_PWD, { dialect: process.env.DB_DIALECT, host: process.env.DB_HOST })
const sequelize = new Sequelize(development.database, development.username, development.password,
    { dialect: development.dialect, host: development.host }
)

module.exports = sequelize;