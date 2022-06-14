const {body} = require("express-validator");

exports.registerUserValidator = [
    body('name')
    .exists().withMessage('Name is Required')
    .notEmpty().withMessage('Name is Required')
    .matches(/^[A-Za-z\s]+$/).withMessage('Name must be alphabetic'),
    body('email')
    .exists().withMessage('Email is Required')
    .notEmpty().withMessage('Email is Required')
    .isEmail().withMessage('Email is Required')
    .isLength({min: 5 ,max : 50}).withMessage('Max length of emails is 50'),
    body('mobileNumber')
        .exists()
        .withMessage('Mobile number is Required')
        .isNumeric().withMessage('Please type only Numbers in Mobile')
        .custom(async value => {

            if (!/^[0-9]{10}$/i.test(value)) {
                return Promise.reject("Invalid mobile number");
            }

        })
]
exports.loginUserValidator = [
    body('email')
    .exists().withMessage('Email is Required')
    .notEmpty().withMessage('Email is Required')
    .isEmail().withMessage('Email is Required')
    .isLength({min: 5 ,max : 50}).withMessage('Max length of emails is 50'),
]   