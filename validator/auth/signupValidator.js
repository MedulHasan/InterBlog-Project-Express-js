const { body } = require('express-validator')
const User = require('../../models/User')

module.exports = [
    body('username')
        .isLength({ min: 2, max: 15 }).withMessage('UserName must be Between 2 to 15 chars')
        .custom(async (username) => {
            let user = await User.findOne({ username })
            if (user) {
                return Promise.reject('UserName Already Used')
            }
        })
        .trim(),
    body('email')
        .isEmail().withMessage('Please provide a valid Email')
        .custom(async (email) => {
            let user = await User.findOne({ email })
            if (user) {
                return Promise.reject('Email Already Used')
            }
        })
        .normalizeEmail(),
    body('password')
        .isLength({ min: 6 }).withMessage('Password Atleast Greater then 6 Chars'),
    body('confirmpassword')
        .isLength({ min: 6 }).withMessage('Password Atleast Greater then 6 Chars')
        .custom((confirmPassword, { req }) => {
            if (confirmPassword !== req.body.password) {
                throw new Error('Password Dose not match')
            }
            return true
        })
]