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
        .catch(err => {
            console.log(err)
            res.status(400).json({
                msg: "Unable to post article. Please try again later."
            })
        });
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
 * @route PUT api/articles/update-views/:id
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

/**
 * @route PUT api/articles/update
 * @desc Update article
 * @access Private (admin)
 */
router.put('/update', (req,res) => {
    Article.findOneAndUpdate({ _id: req.body.id }, { $set: req.body })
        .then(article => {
            if (!article) {
                return res.status(404).json({
                    msg: "Article not found"
                })
            }
            return res.status(200).json({
                success: true,
                msg: "Updated successfully!"
            })
        })
        .catch(err => {
            console.log(err)
            return res.status(400).json({
                msg: "Encountered an error. Unable to update! Please try again later."
            })
        })
})

/**
 * @route DELETE api/articles/delete/:id
 * @desc Delete article
 * @access Private (admin)
 */
router.delete('/delete/:id', (req,res) => {
    Article.findOneAndDelete({ _id: req.params.id })
    .then(article => {
        if (!article) {
            return res.status(404).json({
                msg: "Article not found!"
            })
        }
        return res.status(200).json({
            success: true,
            msg: "Deleted successfully!"
        })
    })
    .catch(err => {
        console.log(err)
        return res.status(400).json({
            msg: "Unable to delete! Please try again later."
        })
    })
})

/**
 * @route PUT api/articles/updateFeatured
 * @desc Delete article
 * @access Private (admin)
 */
router.put('/updateFeatured', (req,res) => {
    Article.updateMany({}, { $set: { 'featured':false } }).then(() => {
        return res.status(200).json({
            success: true
        })
    })
    .catch(err => {
        console.log(err)
        return res.status(400).json({
            msg: "Unable to update."
        })
    })
})

module.exports = router;