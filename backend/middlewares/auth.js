const jwt = require('jsonwebtoken')
require('dotenv/config')
const { isTokenExpired } = require('../helpers')
const messages = require('../languages/pt-BR')

const authMiddleware = (req, res, next) => {
  try {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]

    // token does not exist
    if (!token) {
      return res.status(401).json({
        success: false,
        message: messages['token_invalid'],
      })
    }

    // Expired Token
    if (isTokenExpired(token)) {
      return res.status(401).json({
        success: false,
        message: messages['token_expired'],
      })
    }

    if (!jwt.verify(token, process.env.SECRET_KEY)) {
      return res.status(401).json({
        success: false,
        message: messages['token_invalid'],
      })
    }

    next()
  } catch (error) {
    res.status(500).send({
      success: false,
      message: error.message,
    })
  }
}

module.exports = authMiddleware
