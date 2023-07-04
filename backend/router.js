const express = require('express');
const router = express.Router();
const {signup} = require('./auth');
router.route('/signup').post(signup);

module.exports = router;