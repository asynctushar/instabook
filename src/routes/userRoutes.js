const express = require('express');
const { registerUser } = require('../controllers/userController');

const router = express.Router();

router.route('/register').get(registerUser);

module.exports = router;