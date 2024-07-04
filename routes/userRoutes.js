const express = require('express');
const userController = require('../controllers/userController');

const router = express.Router();

router.post('/upload', userController.uploadCSV);

module.exports = router;