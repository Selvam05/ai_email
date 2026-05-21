const express = require('express');
const { generateEmailController } = require('../controllers/emailController');

const router = express.Router();

console.log('Setting up /generate-email route'); // Debugging log

router.post('/', generateEmailController);

module.exports = router;
