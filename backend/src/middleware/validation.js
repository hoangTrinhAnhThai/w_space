const { check } = require('express-validator');
const User = require('../app/models/User');

exports.registerValidation = () => {
  return [
    check('firstName').trim().notEmpty().withMessage('Firstname is required'),
    check('lastName').trim().notEmpty().withMessage('Lastname is required'),
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
  ];
};

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
  ];
};

exports.projectValidation = () => {
  return [
    check('name')
      .isLength({ min: 1 })
      .trim()
      .withMessage('Project name is required'),
    // check('description')
    //   .isLength({ min: 1 })
    //   .trim()
    //   .withMessage('Project description must be specified'),
  ];
};
exports.statusValidation = () => {
  return [
    check('name').isLength({ min: 1 }).withMessage('Status name is required'),
  ];
};

exports.taskValidation = () => {
  return [
    check('name')
      .isLength({ min: 1 })
      .trim()
      .withMessage('Task name must be specified'),
    // check('description')
    //   .isLength({ min: 1 })
    //   .trim()
    //   .withMessage('Task description must be specified'),
  ];
};

// exports.logtimeValidation = () => {
//   return [
//       check('startTime')
//         .isLength({ min: 1 })
//         .trim()
//         .withMessage('Start time must be specified'),
//   ]
// }

exports.emailValidation = () => {
  return [
    check('email')
      .trim()
      .notEmpty()
      .withMessage('Email is required')
      .isEmail()
      .withMessage('Email must be a valid email adrress'),
  ];
};
