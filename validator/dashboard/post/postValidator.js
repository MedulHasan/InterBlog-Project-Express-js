const { body } = require('express-validator')
const cheerio = require('cheerio')

module.exports = [
    body('title')
        .not().isEmpty().withMessage('Title can not Be Empty')
        .isLength({ max: 100 }).withMessage('Title Can not Greater then 100 cahrecter')
        .trim()
    ,
    body('body')
        .not().isEmpty().withMessage('Body can not Be Empty')
        .custom(value => {
            let node = cheerio.load(value)
            let text = node.text()

            if (text.length > 5000) {
                throw new Error('Body can not be greater theb 5000 chars')
            }
            return true
        })
]