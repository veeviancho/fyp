// Import express router
const express = require('express');
const router = express.Router();

// Load article model
const Article = require('../../model/Article')

/**
 * @route POST api/articles/create
 * @desc Create new article
 * @access Private (admin only)
 */
router.post('/create', (req, res) => {
    const newArticle = new Article({
        title: req.body.title,
        content: req.body.content,
        author: req.body.author,
        tags: req.body.tags,
        programme: req.body.programme,
        category: req.body.category
    });
    newArticle
        .save()
        .then(article => res.json({
            article: article,
            success: true
        }))
        .catch(err => console.log(err));
})

/**
 * @route GET api/articles/all
 * @desc Return all articles
 * @access Public
 */
router.get('/all', (req, res) => {
    Article.find({})
        .then(article => {
            if (!article) {
                return res.status(404).json({
                    msg: "No article available."
                })
            }
            return res.status(201).json({
                article: article,
                success: true
            })
        })
        .catch(err => {
            console.log(err)
        })
})

/**
 * @route UPDATE api/articles/update-views/:id
 * @desc Update views of article
 * @access Public
 */
router.put('/update-views/:id', (req, res) => {
    Article.findOne({ _id: req.params.id })
    .then(article => {
        article.views += 1
        article.save()
        return res.status(200).json({
            msg: "Updated views",
            success: true
        })
    })
    .catch(err => {
        console.log(err)
    })
})
module.exports = router;