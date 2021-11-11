const { validationResult, check } = require('express-validator')
const apiResponse = require('../utils/apiResponse')
const User = require('../app/models/User')
exports.resultsValidator = (req) => {
    const message = []
    if (!validationResult(req).isEmpty()) {
        const errors = validationResult(req).array()
        for (const i of errors) {
            message.push(i)
        }
    }
    return apiResponse.ErrorResponse(req, message)
}

exports.registerValidation = () => {
    return [
        check('fullName')
            .trim()
            .notEmpty()
            .withMessage('Fullname is required'),
        check('email')
            .trim()
            .isLength({ min: 1 })
            .withMessage('Email is required')
            .isEmail()
            .withMessage('Email must be a valid email adrress')
            .custom((value) => {
                return User.findOne({ email: value }).then((user) => {
                    if (user) {
                        return Promise.reject('Email already in use');
                    }
                });
            }),
        check('password')
            .trim()
            .isLength({ min: 6 })
            .withMessage('Password must be 6 characters or greater'),
    ]
    // const errors =  [
    //     check('fullName')
    //         .trim()
    //         .notEmpty()
    //         .withMessage('Fullname is required'),
    //     check('email')
    //         .trim()
    //         .isLength({ min: 1 })
    //         .withMessage('Email is required')
    //         .isEmail()
    //         .withMessage('Email must be a valid email adrress')
    //         .custom((value) => {
    //             return User.findOne({ email: value }).then((user) => {
    //                 if (user) {
    //                     return Promise.reject('Email already in use');
    //                 }
    //             });
    //         }),
    //     check('password')
    //         .trim()
    //         .isLength({ min: 6 })
    //         .withMessage('Password must be 6 characters or greater'),
    // ]
    // if(errors.length > 0) {
    //     return res.status(400).data(errors)
    // } else {
    //     next()
    // }

}

exports.loginValidation = () => {
    return [
        check('email')
            .trim()
            .notEmpty()
            .withMessage('Email is required')
            .isEmail()
            .withMessage('Email must be a valid email adrress'),
        check('password')
            .trim()
            .isLength({ min: 6 })
            .withMessage('Password must be 6 characters or greater'),

    ]
}
