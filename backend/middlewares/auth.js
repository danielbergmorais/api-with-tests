const jwt = require('jsonwebtoken')
require('dotenv/config')
const { isTokenExpired } = require('../helpers')

const authMiddleware = (req, res, next) => {
  try {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]

    // token does not exist
    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'Não esta logado!',
      })
    }

    // Expired Token
    if (isTokenExpired(token)) {
      return res.status(401).json({
        success: false,
        message: 'Token Expirado',
      })
    }

    if (!jwt.verify(token, process.env.SECRET_KEY)) {
      return res.status(401).json({
        success: false,
        message: 'Token inválido',
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
