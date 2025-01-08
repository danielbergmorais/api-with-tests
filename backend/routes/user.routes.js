const { Router } = require('express')
const router = Router()

const userController = require('../controllers/userController')

// User Routes

router.post('/users', userController.create)
router.get('/users', userController.list)
router.get('/users/:id', userController.get)
router.put('/users/:id', userController.update)
router.delete('/users/:id?', userController.remove)

module.exports = router
