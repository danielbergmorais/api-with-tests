const controller = require('../controllers/authController')
const authMiddleware = require('../middlewares/auth')
const { Router } = require('express')
const router = Router()

router.post('/signin', controller.signin)

router.get('/protected', authMiddleware, function (req, res) {
  res.status(200).json({
    success: true,
    message: 'Usuário logado e autorizado',
  })
})

module.exports = router
