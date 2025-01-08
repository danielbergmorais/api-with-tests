const isUUID = require('./checkUUID')
const isTokenExpired = require('./checkToken')
const isValidEmail = require('./checkEmail')
const isEmpty = require('./checkIsEmpty')
const requireFields = require('./checkRequiredFields')

module.exports = {
  isUUID,
  isTokenExpired,
  isValidEmail,
  isEmpty,
  requireFields,
}
