const { Router } = require('express')
const router = Router()

const userController = require('../controllers/userController')

// User Routes

router.get('/users/:id', userController.get)
router.get('/users', userController.list)
router.post('/users', userController.create)
router.put('/users', userController.update)
router.delete('/users', userController.remove)

module.exports = router
