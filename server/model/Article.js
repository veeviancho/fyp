const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ArticleSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
    tags: {
        type: String,
        default: ''
    },
    author: {
        type: String,
        default: ''
    },
    programme: {
        type: String,
        default: ''
    },
    category: {
        type: String,
        default: ''
    },
    views: {
        type: Number,
        default: 0
    },
    featured: {
        type: Boolean,
        default: false
    },
    updatedAt: {
        type: Date
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

module.exports = Article = mongoose.model("articles", ArticleSchema)