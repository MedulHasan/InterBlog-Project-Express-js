const { body } = require('express-validator')

module.exports = [
    body('email')
        .isEmail().withMessage('Please Provide a valid Email')
        .normalizeEmail(),
    body('password')
        .notEmpty().withMessage('Password can not be empty')
]