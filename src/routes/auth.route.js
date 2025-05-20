const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controller')
const userController = require('../controllers/user.controller')
const auth = require('../middleware/auth.js');

router.get('/profile', auth, userController.getUserProfile);
router.post('/login', authController.login);
router.post('/register', authController.register);

module.exports = router;