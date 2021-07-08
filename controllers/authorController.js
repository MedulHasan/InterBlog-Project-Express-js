const Flash = require('../utils/Flash')

const User = require('../models/User')
const Post = require('../models/Post')

exports.authorProfileGetController = async (req, res, next) => {
    let userId = req.params.userId

    try {

        let posts = await Post.find({ author: userId })

        let author = await User.findById(userId)
            .populate({
                path: 'profile',
                populate: {
                    path: 'posts'
                }
            })

        res.render('pages/explorer/author', {
            title: 'Author Page',
            flashMessage: Flash.getMessage(req),
            author,
            posts
        })

    } catch (e) {
        next(e)
    }
}

