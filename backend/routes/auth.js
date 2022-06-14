const express = require('express')
const router = express.Router()
const {wrapper} =  require('../utils/errorWrap')
const {register,login} = require('../controllers/authController');
const {registerUserValidator,loginUserValidator} = require('../validations/userValidation')
const validationError = require('../middleware/validationError')
router.post('/register',registerUserValidator,validationError,wrapper(register));
router.post('/login',loginUserValidator,validationError,wrapper(login));

module.exports = router;