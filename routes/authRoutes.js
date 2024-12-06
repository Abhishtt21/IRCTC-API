const express = require('express');
const router = express.Router();
const {signUp, login} = require('../controllers/authController');

router.post('/auth/signup',signUp);
router.post('/auth/login',login);

module.exports = router;