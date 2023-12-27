const express = require('express');
const router = express.Router();

const userController = require('../app/controller/UserController');

router.get('/login', userController.index);

module.exports = router;