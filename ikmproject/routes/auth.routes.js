const express = require('express');

const router = express.Router();

const authcontroller = require('../controllers/auth.controllers')


router.post('/',authcontroller.login);


module.exports = router