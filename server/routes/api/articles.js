// Import express router
const express = require('express');
const router = express.Router();

// Load article model
const Article = require('../../model/Article')

/**
 * @route POST api/articles/create
 * @desc Create new workshop
 * @access Private (admin only)
 */
router.post('/create', (req, res) => {
    const newArticle = new Article({
        title: req.body.title,
        description: req.body.description,
        author: req.body.author
    });
    newArticle
        .save()
        .then(article => res.json({
            article: article,
            success: true
        }))
        .catch(err => console.log(err));
})

module.exports = router;