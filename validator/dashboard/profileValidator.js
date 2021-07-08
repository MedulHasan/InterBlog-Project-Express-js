const { body } = require('express-validator')
const validator = require('validator')

const urlValidator = (value => {
    if (value) {
        if (!validator.isURL(value)) {
            throw new Error('Please Provide Valid Email')
        }
    }
    return true
})

module.exports = [
    body('name')
        .not().isEmpty().withMessage('Name Can not be Empty')
        .trim()
    ,
    body('title')
        .not().isEmpty().withMessage('Title Can not be Empty')
        .isLength({ max: 100 }).withMessage('Title Can not Be More Then 100 Chars')
        .trim()
    ,
    body('bio')
        .not().isEmpty().withMessage('Bio Can not be Empty')
        .isLength({ max: 500 }).withMessage('Bio Can not Be More Then 500 Chars')
        .trim()
    ,
    body('website')
        .custom(urlValidator)
    ,
    body('facebook')
        .custom(urlValidator)
    ,
    body('twitter')
        .custom(urlValidator)
    ,
    body('github')
        .custom(urlValidator)
    ,
]